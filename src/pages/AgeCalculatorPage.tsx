import React, { useState, useCallback } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import DateForm, { type IFormInput } from '../components/DateForm';

interface Age {
  years: number | null;
  months: number | null;
  days: number | null;
}

const AgeCalculatorPage = () => {
  const [age, setAge] = useState<Age>({ years: null, months: null, days: null });
  
  // O hook useForm agora vive aqui e controla todo o estado do formulário.
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IFormInput>();

  const calculateAge = useCallback((birthDate: Date): Age => {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
  }, []);

  // Esta função agora contém TODA a lógica de validação.
  const handleCalculateAge: SubmitHandler<IFormInput> = (data) => {
    clearErrors();
    const { day, month, year } = data;
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let isValid = true;

    // Validação 1: Data inválida (ex: 31/06/2022)
    if (birthDate.getFullYear() !== year || birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) {
      setError('day', { type: 'manual', message: 'Invalid date' });
      setError('month', { type: 'manual', message: '' });
      setError('year', { type: 'manual', message: '' });
      isValid = false;
    }

    // Validação 2: Data no futuro
    if (birthDate > today) {
      setError('year', { type: 'manual', message: 'It must be in the past' });
      isValid = false;
    }
    
    // Se a data for inválida, limpa os resultados e pára a execução.
    if (!isValid) {
      setAge({ years: null, months: null, days: null });
      return;
    }

    const calculatedAge = calculateAge(birthDate);
    setAge(calculatedAge);
  };

  return (
    <div className="bg-white rounded-3xl rounded-br-[100px] md:rounded-br-[150px] p-8 shadow-lg max-w-2xl w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Age Calculator</h2>
      {/* Passamos todas as funções e estados do formulário para o componente DateForm */}
      <DateForm
        handleSubmit={handleSubmit}
        onFormSubmit={handleCalculateAge}
        register={register}
        errors={errors}
      />

      <div className="text-5xl md:text-8xl font-extrabold italic">
        <h1>
          <span className="text-purple-600">{age.years ?? '--'}</span> years
        </h1>
        <h1>
          <span className="text-purple-600">{age.months ?? '--'}</span> months
        </h1>
        <h1>
          <span className="text-purple-600">{age.days ?? '--'}</span> days
        </h1>
      </div>
    </div>
  );
};

export default AgeCalculatorPage;

