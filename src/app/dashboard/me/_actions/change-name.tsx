'use server';

import { auth } from '@/lib/auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const changeNameSchema = z.object({
  name: z
    .string({ message: 'O username é obrigatório' })
    .min(4, 'O username precisa ter no mínimo 4 caracteres')
    .max(20, 'O username precisa ter no máximo 20 caracteres'),
});

type ChangeNameSchema = z.infer<typeof changeNameSchema>;

export async function changeName(data: ChangeNameSchema) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      data: null,
      error: 'Usuário não autenticado',
    };
  }

  const schema = changeNameSchema.safeParse(data);

  if (!schema.success) {
    return {
      data: null,
      error: schema.error.issues[0].message,
    };
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name: data.name },
    });

    return {
      data: user.name,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: 'Falha ao salvar alterações',
    };
  }
}
