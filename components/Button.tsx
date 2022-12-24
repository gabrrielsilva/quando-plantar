import { classNames } from '../util/classNames';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  text: string;
  onClick: () => void;
  extraStyles: string;
};

export const Button = ({ type, text, onClick, extraStyles }: ButtonProps) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={classNames('h-10 px-3 rounded-lg', extraStyles)}
    >
      {text}
    </button>
  );
};
