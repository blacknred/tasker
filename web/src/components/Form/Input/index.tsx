import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import React, { InputHTMLAttributes, LegacyRef } from 'react';
import { useField } from 'formik';

const InputField = ({ label, size, area, innerRef, style, ...props }: InputFieldProps): JSX.Element => {
  props.placeholder = props.placeholder || props.name;
  const [field, { error }] = useField(props);

  return (
    <FormControl style={style} isInvalid={!!error} flexDirection="column">
      {label && <FormLabel htmlFor={field.name} opacity="0.5" >{label}</FormLabel>}
      {/* @ts-ignore */}
      {area ? <Textarea bg="blackAlpha.50" size="lg" {...field} {...props} />
        : <Input bg="blackAlpha.50" size="lg" {...field} {...props} ref={innerRef} />}
      <FormErrorMessage justifyContent="inherit">{error}</FormErrorMessage>
    </FormControl>
  );
}

export default InputField;
export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string,
  label?: string,
  area?: boolean,
  rows?: number,
  isDisabled?: boolean
  innerRef?: LegacyRef<HTMLInputElement>;
};
