import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SQUARE_ACCESS_TOKEN = Deno.env.get('SQUARE_ACCESS_TOKEN')!
const SQUARE_LOCATION_ID = Deno.env.get('SQUARE_LOCATION_ID')!
const SQUARE_ENV = Deno.env.get('SQUARE_ENVIRONMENT') ?? 'production'
const SQUARE_BASE = SQUARE_ENV === 'sandbox'
  ? 'https://connect.squareupsandbox.com'
  : 'https://connect.squareup.com'
const SQUARE_VERSION = '2024-01-18'
const DEPOSIT_CENTS = 50000 // $500.00

const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID')!
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET')!
const GOOGLE_REFRESH_TOKEN = Deno.env.get('GOOGLE_REFRESH_TOKEN')!
const CALENDAR_ID = 'info@cellar54salem.com'

const ALLOWED_ORIGINS = ['https://cellar54salem.com', 'https://www.cellar54salem.com']

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }
}

function squareHeaders() {
  return {
    'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'Square-Version': SQUARE_VERSION,
  }
}

function validateInput(data: Record<string, unknown>): string | null {
  const { token, firstName, lastName, email, eventType, guests, date } = data
  if (!token || typeof token !== 'string' || token.trim().length === 0)
    return 'Missing payment token.'
  if (!firstName || typeof firstName !== 'string' || firstName.trim().length === 0)
    return 'First name is required.'
  if (!lastName || typeof lastName !== 'string' || lastName.trim().length === 0)
    return 'Last name is required.'
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return 'A valid email address is required.'
  if (!eventType || typeof eventType !== 'string' || eventType.trim().length === 0)
    return 'Event type is required.'
  if (!guests || typeof guests !== 'string' || guests.trim().length === 0)
    return 'Estimated guests is required.'
  if (!date || typeof date !== 'string' || date.trim().length === 0)
    return 'Preferred date is required.'
  if (typeof firstName === 'string' && firstName.length > 100) return 'First name is too long.'
  if (typeof lastName === 'string' && lastName.length > 100) return 'Last name is too long.'
  if (typeof email === 'string' && email.length > 254) return 'Email address is too long.'
  if (typeof guests === 'string' && guests.length > 50) return 'Guest count is too long.'
  if (typeof date === 'string' && date.length > 100) return 'Date is too long.'
  if (typeof eventType === 'string' && eventType.length > 100) return 'Event type is too long.'
  return null
}

async function getGoogleAccessToken(): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error_description ?? 'Failed to get Google access token')
  return data.access_token
}

async function createCalendarEvent(accessToken: string, booking: {
  firstName: string; lastName: string; email: string
  eventType: string; guests: string; date: string; paymentId: string
}) {
  const { firstName, lastName, email, eventType, guests, date, paymentId } = booking
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
    {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        summary: `${eventType} — ${firstName} ${lastName}`,
        description: [
          `Client: ${firstName} ${lastName}`,
          `Email: ${email}`,
          `Event Type: ${eventType}`,
          `Estimated Guests: ${guests || 'Not specified'}`,
          `Deposit Paid: $500`,
          `Square Payment ID: ${paymentId}`,
        ].join('\n'),
        start: { date },
        end: { date: new Date(new Date(date).getTime() + 86400000).toISOString().split('T')[0] },
      }),
    }
  )
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message ?? 'Failed to create calendar event')
  return data.id
}

async function sendConfirmationEmail(accessToken: string, booking: {
  firstName: string; lastName: string; email: string
  eventType: string; guests: string; date: string; paymentId: string
}) {
  const { firstName, lastName, email, eventType, guests, date, paymentId } = booking

  const subject = 'Booking Confirmed — Cellar 54'
  const body = [
    `Hi ${firstName},`,
    ``,
    `Your booking at Cellar 54 has been confirmed and your $500 deposit has been processed.`,
    ``,
    `Booking Details:`,
    `  Event Type: ${eventType}`,
    `  Estimated Guests: ${guests || 'Not specified'}`,
    `  Preferred Date: ${date}`,
    `  Payment ID: ${paymentId}`,
    ``,
    `We'll be in touch within 24 hours to confirm the details and discuss next steps.`,
    ``,
    `Thank you for choosing Cellar 54. We look forward to hosting your event.`,
    ``,
    `Cellar 54`,
    `Lower Level, 285 Liberty St NE · Salem, OR 97301`,
    `info@cellar54salem.com`,
  ].join('\n')

  const safeName = `${firstName} ${lastName}`.replace(/[\r\n]/g, ' ')
  const raw = [
    `To: ${safeName} <${email}>`,
    `From: Cellar 54 <info@cellar54salem.com>`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset=utf-8`,
    ``,
    body,
  ].join('\n')

  const encoded = btoa(unescape(encodeURIComponent(raw)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ raw: encoded }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message ?? 'Failed to send confirmation email')
  return data.id
}

serve(async (req) => {
  const origin = req.headers.get('Origin')
  const headers = corsHeaders(origin)

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers })
  }

  try {
    const body = await req.json()
    const validationError = validateInput(body)
    if (validationError) {
      return new Response(
        JSON.stringify({ success: false, error: validationError }),
        { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } },
      )
    }

    const { token, firstName, lastName, email, eventType, guests, date } = body

    const paymentRes = await fetch(`${SQUARE_BASE}/v2/payments`, {
      method: 'POST',
      headers: squareHeaders(),
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        source_id: token,
        location_id: SQUARE_LOCATION_ID,
        amount_money: { amount: DEPOSIT_CENTS, currency: 'USD' },
        buyer_email_address: email.trim().toLowerCase(),
        note: `Cellar 54 deposit — ${eventType} — ${firstName.trim()} ${lastName.trim()}`,
      }),
    })
    const paymentData = await paymentRes.json()
    if (!paymentRes.ok) throw new Error(paymentData.errors?.[0]?.detail ?? 'Payment failed')
    const paymentId = paymentData.payment.id

    const accessToken = await getGoogleAccessToken()
    const calendarEventId = await createCalendarEvent(accessToken, {
      firstName: firstName.trim(), lastName: lastName.trim(),
      email: email.trim().toLowerCase(), eventType, guests, date, paymentId,
    })

    await sendConfirmationEmail(accessToken, {
      firstName: firstName.trim(), lastName: lastName.trim(),
      email: email.trim().toLowerCase(), eventType, guests, date, paymentId,
    })
    await sendConfirmationEmail(accessToken, {
      firstName: firstName.trim(), lastName: lastName.trim(),
      email: 'info@cellar54salem.com', eventType, guests, date, paymentId,
    })

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )
    const { error: dbError } = await supabase.from('bookings').insert({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim().toLowerCase(),
      event_type: eventType,
      guests,
      event_date: date,
      square_payment_id: paymentId,
      deposit_paid: DEPOSIT_CENTS,
      status: 'deposit_paid',
    })
    if (dbError) throw new Error(dbError.message)

    return new Response(
      JSON.stringify({ success: true, paymentId, calendarEventId }),
      { headers: { ...headers, 'Content-Type': 'application/json' } },
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error'
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...headers, 'Content-Type': 'application/json' } },
    )
  }
})
