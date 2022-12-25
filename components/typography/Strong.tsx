import { Inter } from '@next/font/google';
import { classNames } from '../../util/classNames';

const inter = Inter();

type StrongProps = {
  text: string,
  extraStyles: string
}

export const Strong = ({ text, extraStyles }: StrongProps) => {
  return (
    <strong className={classNames('text-2xl font-bold', inter.className, extraStyles)}>
      { text }
    </strong>
  )
}