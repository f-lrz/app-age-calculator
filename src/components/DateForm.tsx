import React from 'react';
import type { SubmitHandler, UseFormRegister, FieldErrors } from 'react-hook-form';

// --- Interfaces e Tipos ---

// Define o formato dos dados do formulário
export interface IFormInput {
  day: number;
  month: number;
  year: number;
}

// Props atualizadas: O componente agora recebe todo o controle do formulário do componente pai
interface DateFormProps {
  handleSubmit: (onSubmit: SubmitHandler<IFormInput>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onFormSubmit: SubmitHandler<IFormInput>;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
}

// --- Componente de Input (interno e reutilizável) ---
interface InputFieldProps {
  label: string;
  placeholder: string;
  name: keyof IFormInput;
  register: any;
  errors: any;
  maxValue?: number;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, name, register, errors, maxValue }) => {
  const hasError = errors[name];
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={name}
        className={`font-bold text-sm tracking-widest uppercase ${hasError ? 'text-red-500' : 'text-gray-500'}`}
      >
        {label}
      </label>
      <input
        id={name}
        type="number"
        placeholder={placeholder}
        {...register(name, {
          required: 'Required field',
          valueAsNumber: true,
          min: { value: 1, message: 'Invalid value' },
          ...(maxValue && { max: { value: maxValue, message: 'Invalid value' } }),
        })}
        className={`mt-2 p-3 border rounded-lg text-2xl font-bold w-full focus:outline-none focus:ring-2 ${
          hasError ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-purple-500'
        }`}
      />
      {errors[name] && <span className="text-red-500 text-xs italic mt-1">{errors[name]?.message as string}</span>}
    </div>
  );
};

// --- Componente Principal do Formulário Reutilizável ---
// Este componente já não tem o seu próprio useForm. Tornou-se um componente puramente de apresentação.
const DateForm: React.FC<DateFormProps> = ({ handleSubmit, onFormSubmit, register, errors }) => {
  return (
    // A função handleSubmit do react-hook-form agora envolve a nossa função de validação/cálculo
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <div className="flex flex-row gap-4 md:gap-8 max-w-lg">
        <InputField label="Day" placeholder="DD" name="day" register={register} errors={errors} maxValue={31} />
        <InputField label="Month" placeholder="MM" name="month" register={register} errors={errors} maxValue={12} />
        <InputField label="Year" placeholder="YYYY" name="year" register={register} errors={errors} />
      </div>

      <div className="flex items-center my-8 md:my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <button
          type="submit"
          aria-label="Calculate"
          className="bg-purple-600 rounded-full p-4 hover:bg-black focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44">
            <g fill="none" stroke="#FFF" strokeWidth="2">
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
            </g>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default DateForm;

