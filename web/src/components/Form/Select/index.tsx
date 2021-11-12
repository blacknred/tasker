import { FormControl, FormErrorMessage, FormLabel, Select, useColorModeValue } from '@chakra-ui/react';
import React, { SelectHTMLAttributes } from 'react'
import { useField } from 'formik';

const SelectField = ({ label, size, options, readonly, ...props }: SelectFieldProps): JSX.Element => {
  const bg = useColorModeValue('gray.800', 'white')
  props.placeholder = props.placeholder || props.name;
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={field.name} opacity="0.5">{label}</FormLabel>}
      {/* @ts-ignore */}
      <Select size="lg" isDisabled={readonly} bgColor={bg} {...field} {...props} id={field.name}>
        {options.map(value => <option value={value}>{value}</option>)}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default SelectField
export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string,
  label?: string,
  readonly?: boolean,
  options: (string | number)[]
}


