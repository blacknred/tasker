import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

const InputField = ({ label, size, area, readonly, ...props }: InputFieldProps): JSX.Element => {
  props.placeholder = props.placeholder || props.name;
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error} flexDirection="column">
      {label && <FormLabel htmlFor={field.name} opacity="0.5" >{label}</FormLabel>}
      {/* @ts-ignore */}
      {area ? <Textarea bg="blackAlpha.50" size="lg" isDisabled={readonly} {...field} {...props} id={field.name} />
        : <Input bg="blackAlpha.50" size="lg" isDisabled={readonly} {...field} {...props} id={field.name} />}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default InputField;
export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string,
  label?: string,
  area?: boolean,
  rows?: number,
  readonly?: boolean
};
