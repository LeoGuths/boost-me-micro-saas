'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export function CreateAccountButton() {
  const [loading, setLoading] = useState(false);

  async function handleCreateStripeAccount() {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/stripe/create-account`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.ok) {
        toast.error('Falha ao criar conta de pagamento');
        setLoading(false);
      }

      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      setLoading(false);
    }
  }

  return (
    <div className="mb-5">
      <Button
        className="cursor-pointer"
        onClick={handleCreateStripeAccount}
        disabled={loading}
      >
        {loading ? 'Criando conta...' : 'Ativar conta de pagamentos'}
      </Button>
    </div>
  );
}
