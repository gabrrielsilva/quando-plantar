
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from '../components/Button';
import { H1 } from '../components/typography/H1';
import { Paragraph } from '../components/typography/Paragraph';
import CulturaListbox from '../islands/CulturaListbox';
import EstadoCombobox from '../islands/EstadoCombobox';

type CalendarioAgricola = { 
  regiao: string, 
  epocaPlantio: string, 
  diasCultivo: string 
};

export default function Home({ culturas, estados }: { culturas: string[], estados: string[] }) {
  const { register, handleSubmit } = useForm();
  const [calendarioAgricola, setCalendarioAgricola] = useState<CalendarioAgricola>(null);

  async function onSubmit({ cultura, estado }: { cultura: string, estado: string }) { 
    console.log(cultura, estado);
       
    const regiaoResponse = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/regioes-imediatas?view=nivelado`);
    const regiaoData = await regiaoResponse.json();
    const regiao = regiaoData[0]['regiao-nome'];

    const calendarioAgricolaResponse = await fetch(`/api/calendario-agricola?cultura=${cultura}&regiao=${regiao}`);
    const calendarioAgricola = await calendarioAgricolaResponse.json() as CalendarioAgricola;
    setCalendarioAgricola(calendarioAgricola);
  }

  return (
    <div className='w-screen h-screen p-5 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-emerald-700 via-[#553417] to-green-500'>
      <H1 text='Quando plantar?' extraStyles='text-white pt-5 pb-10' />
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <Paragraph text='Quero plantar:' />
        <CulturaListbox register={register} culturas={culturas} />
        <Paragraph text='Em:' />
        <EstadoCombobox register={register} estados={estados} />
        <Button type='submit' text='Buscar' extraStyles='bg-yellow-500' />
      </form>
      <p>Região: { calendarioAgricola?.regiao }</p>
      <p>Época de plantio: { calendarioAgricola?.epocaPlantio }</p>
      <p>Dias de cultivo: { calendarioAgricola?.diasCultivo }</p>
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