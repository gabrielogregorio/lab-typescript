import React from 'react';
import { ReactElement } from 'react';
import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';

export enum GenericTypeEnum {
  Text = 'text',
  Email = 'email',
}

interface IGenericInput<T extends FieldValues> {
  type: GenericTypeEnum;
  name: Path<T>;
  control: Control<T, Path<T>>;
  defaultValue?: PathValue<T, Path<T>>;
}

export const GenericInput = <T extends FieldValues>({
  type,
  name,
  control,
  defaultValue,
}: IGenericInput<T>): ReactElement => {
  const {
    field: { ref },
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <div>
      <input
        type={type}
        id={name}
        name={name}
        required={false}
        autoComplete=""
        placeholder="placeholder"
        title="title on over mouse"
        value="123"
        maxLength={123}
        aria-label="abc"
        onClick={() => console.log('on click event')}
        onChange={() => console.log('onChange input')}
        onBlur={() => console.log('blur')}
        ref={ref}
      />
    </div>
  );
};

GenericInput.defaultProps = {
  defaultValue: '',
};
