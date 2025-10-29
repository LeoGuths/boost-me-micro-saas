import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event: Stripe.Event;

  try {
    const payload = await req.text();
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return new NextResponse('Webhook Error', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentIntentId = session.payment_intent as string;

      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId);

      const donationId = paymentIntent.metadata.donationId;

      try {
        await prisma.donation.update({
          where: {
            id: donationId,
          },
          data: {
            status: 'PAID',
          },
        });
      } catch (err) {}
      break;
  }

  return NextResponse.json({ ok: true });
}
