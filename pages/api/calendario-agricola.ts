import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../config/prisma';

type Input = {
  cultura: string,
  cidade: string
}

type Output = {
  regiao: string,
  epocaPlantio: string,
  diasCultivo: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Output>
) {
  const { cultura, cidade } = req.query as Input;

  if (!cultura || !cidade) throw new Error('Missing params');

  const calendarioAgricola = await prisma.calendarioAgricola.findFirst({
    where: {
      AND: [
        {
          cultura_id: cultura
        },
        {
          regiao_id: cidade
        }
      ]
    },
    include: {
      cultura: {
        select: {
          dias_cultivo: true
        }
      }
    }
  })

  if (!calendarioAgricola) throw new Error('Culture not registered in the database');

  res.status(200).json({ 
    regiao: calendarioAgricola.regiao_id, 
    epocaPlantio: calendarioAgricola.epoca_plantio, 
    diasCultivo: calendarioAgricola.cultura.dias_cultivo 
  });
}
