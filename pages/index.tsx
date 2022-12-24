
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from '../components/Button';
import { H1 } from '../components/typography/H1';
import CidadeCombobox from '../islands/CidadeCombobox';
import CulturaListbox from '../islands/CulturaListbox';

type CalendarioAgricola = { 
  regiao: string, 
  epocaPlantio: string, 
  diasCultivo: string 
};

export default function Home({ culturas, cidades }: { culturas: string[], cidades: string[] }) {
  const { register, handleSubmit } = useForm();
  const [calendarioAgricola, setCalendarioAgricola] = useState<CalendarioAgricola>(null);

  async function onSubmit({ cultura, cidade }: { cultura: string, cidade: string }) {
    const response = await fetch(`/api/calendario-agricola?cultura=${cultura}&cidade=${cidade}`);
    const calendarioAgricola = await response.json() as CalendarioAgricola;
    setCalendarioAgricola(calendarioAgricola);
  }

  return (
    <div className='w-screen h-screen p-5 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-emerald-700 via-[#553417] to-green-500'>
      <H1 text='Quando plantar?' extraStyles='text-white pt-5 pb-10' />
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <CulturaListbox culturas={culturas} />
        <CidadeCombobox cidades={cidades} />
        <Button type='button' text='Buscar' onClick={() => {}} extraStyles='bg-yellow-500' />
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
  const culturasResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/culturas`);
  const culturas = await culturasResponse.json() as string[];

  const cidadesResponse = await fetch('http://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado');
  const cidadesData = await cidadesResponse.json() as { 'municipio-nome': string }[];
  const cidadesNome = cidadesData.map(cidade => cidade['municipio-nome']);
  const cidades = Array.from(new Set(cidadesNome));

  return {
    props: {
      culturas,
      cidades
    }
  }
}