import { PlusSquareIcon } from '@chakra-ui/icons';
import { Grid, Select, useColorModeValue } from '@chakra-ui/react';
import React, { Children, cloneElement, FC, isValidElement, ReactNode, useState } from 'react';
import { ViewOptions } from '../../../typings';
import { ModalTaskForm } from '../Form';

const TaskToolbar: FC = ({ children }) => {
  const bg = useColorModeValue('gray.800', 'white')
  const color = useColorModeValue('gray.300', 'gray.600')
  const [options, setOptions] = useState<ViewOptions>({
    variant: 'list'
  })

  return (
    <>
      <Grid gap={6} mb="12" templateColumns="repeat(5, 1fr)">
        <ModalTaskForm btnProps={{ leftIcon: <PlusSquareIcon />, children: 'Create a task' }} />
        <Select value={options.variant} bgColor={bg} color={color} w="auto" onChange={(ev) => {
          const variant = ev.target.value as ViewOptions['variant']
          setOptions((prev) => ({ ...prev, variant }))
        }}>
          <option value="list">List</option>
          <option value="grid">Grid</option>
        </Select>
      </Grid>

      {Children.map<ReactNode, ReactNode>(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child, { ...options })
        }
      })}
    </>
  );
};

export default TaskToolbar;
