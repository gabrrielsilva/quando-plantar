import { Inter } from '@next/font/google';
import { classNames } from '../../util/classNames';

const inter = Inter();

type ParagraphProps = {
  text: string,
  extraStyles?: string
}

export const Paragraph = ({ text, extraStyles }: ParagraphProps) => {
  return (
    <p className={classNames('text-[16px] text-white', inter.className)}>
      { text }
    </p>
  )
}