import { classNames } from '../util/classNames';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  text: string;
  Icon?: any;
  onClick?: () => void;
  extraStyles: string;
};

export const Button = ({ type, text, Icon, onClick, extraStyles }: ButtonProps) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={classNames('h-10 px-3 rounded-lg flex items-center justify-center gap-2', extraStyles)}
    >
      {Icon ? <Icon className='w-5 h-5' /> : ''}
      {text}
    </button>
  );
};
