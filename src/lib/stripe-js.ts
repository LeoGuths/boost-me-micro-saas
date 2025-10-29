import { loadStripe } from '@stripe/stripe-js';

export async function getStripeJs() {
  return await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );
}
