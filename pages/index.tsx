import { Inter } from '@next/font/google';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { classNames } from '../util/classNames';

const inter = Inter();

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [calendarioAgricola, setCalendarioAgricola] = useState<{ regiao: string, epocaPlantio: string, diasCultivo: string }>(null);

  async function onSubmit({ cultura, cidade }: { cultura: string, cidade: string }) {
    const response = await fetch(`/api/calendario-agricola?cultura=${cultura}&cidade=${cidade}`);
    const data = await response.json();
    setCalendarioAgricola(data);
  }

  return (
    <div className='w-screen h-screen bg-[#121212] text-white'>
      <h1 className={classNames('text-5xl font-bold', inter.className)}>Quando plantar?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("cultura", { required: true })} type="text" />
        <input {...register("cidade", { required: true })} type="text" />
        <button type='submit'>Submit</button>
      </form>
      <p>Região: { calendarioAgricola?.regiao }</p>
      <p>Época de plantio: { calendarioAgricola?.epocaPlantio }</p>
      <p>Dias de cultivo: { calendarioAgricola?.diasCultivo }</p>
    </div>
  )
}
