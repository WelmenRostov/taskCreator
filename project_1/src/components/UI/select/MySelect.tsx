import clsx from 'clsx';
import React from 'react';

interface Options {
  value: string;
  name: string;
}

interface MySelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: Options[];
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
  small?: boolean;
}

const MySelect: React.FC<MySelectProps> = ({ options, defaultValue, value, onChange, className, small }) => {
  const buttonClasses = clsx(
    'rounded-lg p-2 transition-all dark:!bg-grey-950',
    {
      'm-1': small,
    },
    className
  );

  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`${buttonClasses} border-indigo-600 bg-indigo-800 select w-[200px] h-[40px]`}
    >
      <option className="bg-indigo-500" disabled value="">
        {defaultValue}
      </option>

      {options.map((options) => (
        <option key={options.name} value={options.value} className="bg-indigo-500">
          {options.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
