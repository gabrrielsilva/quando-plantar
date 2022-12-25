import { Paragraph } from '../components/typography/Paragraph';
import { Strong } from '../components/typography/Strong';
import { CalendarioAgricola as CalendarioAgricolaType } from '../pages/index';

type CalendarioAgricolaProps = {
  calendarioAgricola: CalendarioAgricolaType
}

export const CalendarioAgricola = ({ calendarioAgricola }: CalendarioAgricolaProps) => {
  const { regiao, epocaPlantio, diasCultivo } = calendarioAgricola;

  return (
    <div className='relative flex flex-grow bg-white p-5 rounded-lg'>
      <div className='grid'>
        <section className='flex flex-col'>
          <Strong text={regiao.toLowerCase()} extraStyles='text-green-900' />
          <Paragraph text='região' extraStyles='text-gray-500' />
        </section>
        <section className='flex flex-col'>
          <Strong text={epocaPlantio} extraStyles='text-green-900' />
          <Paragraph text='época de plantio' extraStyles='text-gray-500' />
        </section>
        <section className='flex flex-col'>
          <Strong text={diasCultivo} extraStyles='text-green-900' />
          <Paragraph text='dias de cultivo' extraStyles='text-gray-500' />
        </section>
      </div>
    </div>
  )
}