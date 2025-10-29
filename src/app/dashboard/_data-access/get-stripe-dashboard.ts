'use server';

import { stripe } from '@/lib/stripe';

export async function getStripeDashboard(accountId: string | undefined) {
  if (!accountId) {
    return null;
  }

  try {
    return (await stripe.accounts.createLoginLink(accountId)).url;
  } catch (err) {
    return null;
  }
}
