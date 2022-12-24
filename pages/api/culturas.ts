import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../config/prisma';

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const nomesCulturas = await prisma.cultura.findMany({
    select: {
      nome: true
    }
  });
  const culturas = nomesCulturas.map(cultura => cultura.nome);

  res.status(200).json(culturas);
}
