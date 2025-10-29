'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const getInfoUserSchema = z.object({
  username: z.string({ message: 'O username é obrigatório' }),
});

type GetInfoUserSchema = z.infer<typeof getInfoUserSchema>;

export async function getInfoUser(data: GetInfoUserSchema) {
  const schema = getInfoUserSchema.safeParse(data);

  if (!schema.success) {
    return null;
  }

  try {
    return await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
  } catch (err) {
    return null;
  }
}
