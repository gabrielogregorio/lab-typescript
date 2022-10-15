import React from 'react';
import { ReactElement } from 'react';
import { GenericInput, GenericTypeEnum } from './genericInput';
import { IGtaPersonFields, useRegisterGtaPerson } from './useFormExample';

export const GtaForm = (): ReactElement => {
  const { control } = useRegisterGtaPerson();

  return (
    <form method="POST">
      <GenericInput<IGtaPersonFields> type={GenericTypeEnum.Text} name="name" control={control} />
      <GenericInput<IGtaPersonFields> type={GenericTypeEnum.Text} name="gta" control={control} />
      <GenericInput<IGtaPersonFields>
        type={GenericTypeEnum.Text}
        name="notExists"
        control={control}
      />
    </form>
  );
};
