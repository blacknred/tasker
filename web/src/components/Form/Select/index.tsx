import { FormControl, FormErrorMessage, FormLabel, Select, useColorModeValue } from '@chakra-ui/react';
import React, { SelectHTMLAttributes } from 'react'
import { useField } from 'formik';

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string,
  label?: string,
  readonly?: boolean,
  options: (string | number)[]
}

const SelectField: React.FC<Props> = ({ label, size, options, readonly, ...props }) => {
  const color = useColorModeValue('gray.300', 'gray.600')
  const bg = useColorModeValue('gray.800', 'white')
  props.placeholder = props.placeholder || props.name;
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={field.name} color={color}>{label}</FormLabel>}
      {/* @ts-ignore */}
      <Select isDisabled={readonly} bgColor={bg} color={color} {...field} {...props} id={field.name}>
        {options.map(value => <option value={value}>{value}</option>)}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default SelectField


