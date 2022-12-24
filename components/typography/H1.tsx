import { Inter } from '@next/font/google';
import { classNames } from '../../util/classNames';

const inter = Inter();

type H1Props = {
  text: string,
  extraStyles?: string
}

export const H1 = ({ text, extraStyles }: H1Props) => {
  return <h1 className={classNames('text-[4.5vh] sm:text-5xl font-bold', inter.className, extraStyles)}>{ text }</h1>
}