import { FormControl, FormErrorMessage, FormLabel, Input, Textarea, useColorModeValue } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

const InputField = ({ label, size, area, readonly, ...props }: InputFieldProps): JSX.Element => {
  const color = useColorModeValue("gray.600", "blackAlpha.400")
  props.placeholder = props.placeholder || props.name;
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error} flexDirection="column">
      {label && <FormLabel htmlFor={field.name} opacity="0.5" >{label}</FormLabel>}
      {/* @ts-ignore */}
      {area ? <Textarea borderColor={color} isDisabled={readonly} {...field} {...props} id={field.name} />
        : <Input borderColor={color} isDisabled={readonly}  {...field} {...props} id={field.name} />}
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
