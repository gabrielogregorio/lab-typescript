import { Control, DeepRequired, FieldErrorsImpl, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { gtaPersonsSchema } from './schema';

export interface IGtaPersonFields extends FieldValues {
  name: string;
  gta: string;
}

type useRegisterGtaPersonResponseType = {
  onSubmit: () => void;
  control: Control<IGtaPersonFields>;
  errors: FieldErrorsImpl<DeepRequired<IGtaPersonFields>>;
};

export const useRegisterGtaPerson = (): useRegisterGtaPersonResponseType => {
  const { handleSubmit, control, formState } = useForm<IGtaPersonFields>({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(gtaPersonsSchema),
  });

  const onSubmit = async (formValues: IGtaPersonFields): Promise<void> => {
    console.log(formValues);
  };

  return {
    control,
    errors: formState.errors,
    onSubmit: handleSubmit(onSubmit),
  };
};
