import Image from 'next/image';
import { getInfoUser } from '@/app/creator/[username]/_data-access/get-info-user';
import { notFound } from 'next/navigation';
import { FormDonate } from '@/app/creator/[username]/_components/form';
import CoverSection from '@/app/creator/[username]/_components/cover-section';
import AboutSection from '@/app/creator/[username]/_components/about-section';

export default async function Boost({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await getInfoUser({ username });

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <CoverSection
        coverImage={user?.image ?? ''}
        profileImage={user?.image ?? ''}
        name={user?.name ?? ''}
      />

      <main className="container mx-auto max-w-6xl p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 -mt-8 md:-mt-16 relative z-10">
          <div className="order-2 md:order-1">
            <AboutSection
              name={user?.name ?? ''}
              description={user?.bio ?? ''}
            />
          </div>
          <div className="order-1 md:order-2">
            <FormDonate
              slug={user.username!}
              creatorId={user.connectedStripeAccountId ?? ''}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
