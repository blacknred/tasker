import { FormControl, FormErrorMessage, FormLabel, Input, Textarea, useColorModeValue } from '@chakra-ui/react';
import React, { InputHTMLAttributes } from 'react'
import { useField } from 'formik';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string,
  label?: string,
  area?: boolean,
  rows?: number,
  readonly?: boolean
}

const InputField: React.FC<Props> = ({ label, size, area, readonly, ...props }) => {
  const color = useColorModeValue('gray.300', 'gray.600')
  const bg = useColorModeValue('gray.800', 'white')
  props.placeholder = props.placeholder || props.name;
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={field.name} color={color}>{label}</FormLabel>}
      {/* @ts-ignore */}
      {area ? <Textarea isDisabled={readonly} bgColor={bg} color={color} {...field} {...props} id={field.name} />
        : <Input isDisabled={readonly} bgColor={bg} color={color} {...field} {...props} id={field.name} />}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default InputField