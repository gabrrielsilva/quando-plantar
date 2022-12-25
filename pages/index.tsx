
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from '../components/Button';
import { H1 } from '../components/typography/H1';
import { Paragraph } from '../components/typography/Paragraph';
import { CulturaListbox } from '../islands/CulturaListbox';
import { EstadoListbox } from '../islands/EstadoListbox';
import { CalendarioAgricola } from '../layout/CalendarioAgricola';

export type CalendarioAgricola = { 
  regiao: string, 
  epocaPlantio: string, 
  diasCultivo: string 
};

export default function Home({ culturas, estados }: { culturas: string[], estados: string[] }) {
  const { control, handleSubmit } = useForm();
  const [calendarioAgricola, setCalendarioAgricola] = useState<CalendarioAgricola>({ regiao: '', diasCultivo: '', epocaPlantio: '' });

  async function onSubmit({ cultura, estado }: { cultura: string, estado: string }) {
    if (!cultura || !estado) throw new Error('Missing Params');
       
    const regiaoResponse = await fetch(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/regioes-imediatas?view=nivelado`);
    const regiaoData = await regiaoResponse.json();    
    const regiao = regiaoData[0]['regiao-nome'];
    
    const calendarioAgricolaResponse = await fetch('/api/calendario-agricola?' + new URLSearchParams({ cultura, regiao }));
    const calendarioAgricola = await calendarioAgricolaResponse.json() as CalendarioAgricola;
    setCalendarioAgricola(calendarioAgricola);
  }

  return (
    <div className='flex flex-col w-screen h-screen p-5 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-emerald-700 via-[#553417] to-green-500'>
      <H1 text='Quando plantar?' extraStyles='text-white pt-5 pb-10' />
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 mb-6'>
        <Paragraph text='Quero plantar:' extraStyles='text-white' />
        <CulturaListbox control={control} name='cultura' defaultValue={culturas[0]} culturas={culturas} />
        <Paragraph text='No estado:' extraStyles='text-white' />
        <EstadoListbox control={control} name='estado' defaultValue={estados[0]} estados={estados} />
        <Button type='submit' text='Ver calendário' Icon={CalendarDaysIcon} extraStyles='bg-[#6bd968] mt-2 font-bold text-lg' />
      </form>
      <CalendarioAgricola calendarioAgricola={calendarioAgricola} />
    </div>
  )
}
 
export const getServerSideProps: GetServerSideProps = async () => {
  const culturasResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/culturas`);
  const culturas = await culturasResponse.json() as string[];

  const estadosResponse = await fetch('http://servicodados.ibge.gov.br/api/v1/localidades/estados?view=nivelado');
  const estadosData = await estadosResponse.json() as { 'UF-sigla': string }[];
  const estados = estadosData.map(estado => estado['UF-sigla']);

  return {
    props: {
      culturas,
      estados
    }
  }
}