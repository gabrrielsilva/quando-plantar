
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { H1 } from '../components/typography/H1';
import CulturaListbox from '../islands/CulturaListbox';

type CalendarioAgricola = { 
  regiao: string, 
  epocaPlantio: string, 
  diasCultivo: string 
};

export default function Home({ culturas }: { culturas: string[] }) {
  const { register, handleSubmit } = useForm();
  const [calendarioAgricola, setCalendarioAgricola] = useState<CalendarioAgricola>(null);

  async function onSubmit({ cultura, cidade }: { cultura: string, cidade: string }) {
    const response = await fetch(`/api/calendario-agricola?cultura=${cultura}&cidade=${cidade}`);
    const calendarioAgricola = await response.json() as CalendarioAgricola;
    setCalendarioAgricola(calendarioAgricola);
  }

  return (
    <div className='w-screen h-screen p-5 bg-green-800'>
      <H1 text='Quando plantar?' extraStyles='text-white pt-5 pb-10' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CulturaListbox culturas={culturas} />
        {/* <input {...register("cultura", { required: true })} type="text" />
        <input {...register("cidade", { required: true })} type="text" />
        <button type='submit'>Submit</button> */}
      </form>
      {/* <p>Região: { calendarioAgricola?.regiao }</p>
      <p>Época de plantio: { calendarioAgricola?.epocaPlantio }</p>
      <p>Dias de cultivo: { calendarioAgricola?.diasCultivo }</p> */}
    </div>
  )
}
 
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/culturas`);
  const culturas = await response.json() as string[];

  return {
    props: {
      culturas
    }
  }
}