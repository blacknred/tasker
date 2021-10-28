import { PlusSquareIcon } from '@chakra-ui/icons';
import { Grid, Select, useColorModeValue } from '@chakra-ui/react';
import React, { Children, cloneElement, FC, isValidElement, ReactNode, useState } from 'react';
import { ITaskViewOptions } from '../../../typings';
import { ModalTaskForm } from '../Form';

const TaskToolbar: FC = ({ children }) => {
  const bg = useColorModeValue('gray.800', 'white')
  const color = useColorModeValue('gray.300', 'gray.600')
  const btnProps = { leftIcon: <PlusSquareIcon />, children: 'Create a task', w: '250px' };
  const [options, setOptions] = useState<ITaskViewOptions>({
    'sort.field': 'createdAt',
    'sort.order': 'DESC',
    variant: 'list',
    limit: 10
  })

  return (
    <>
      <Grid gap={6} mb="16" templateColumns="repeat(7, 1fr)">
        <ModalTaskForm btnProps={btnProps} />

        <Select value={options.variant} bgColor={bg} color={color} onChange={(ev) => {
          const variant = ev.target.value as ITaskViewOptions['variant']
          setOptions((prev) => ({ ...prev, variant }))
        }}>
          <option value="list">Show as list</option>
          <option value="grid">Show as grid</option>
        </Select>

        <Select value={options.limit} bgColor={bg} color={color} onChange={(ev) => {
          const limit = +ev.target.value as ITaskViewOptions['limit'];
          setOptions((prev) => ({ ...prev, limit }))
        }}>
          <option value="10">Show 10 items</option>
          <option value="50">Show 50 items</option>
          <option value="100">Show 100 items</option>
        </Select>

        <Select value={options['sort.field']} bgColor={bg} color={color} w="200px" onChange={(ev) => {
          const field = ev.target.value as ITaskViewOptions['sort.field'];
          setOptions((prev) => ({ ...prev, "sort.field": field }))
        }}>
          <option value="createdAt">Order by creation</option>
          <option value="type">Order by type</option>
          <option value="priority">Order by priority</option>
          <option value="name">Order by name</option>
        </Select>

        <Select value={options['sort.order']} bgColor={bg} color={color} onChange={(ev) => {
          const order = ev.target.value as ITaskViewOptions['sort.order'];
          setOptions((prev) => ({ ...prev, "sort.order": order }))
        }}>
          <option value="DESC">Order by desc</option>
          <option value="ASC">Order by asc</option>
        </Select>
      </Grid>

      {Children.map<ReactNode, ReactNode>(children, child => {
        if (!isValidElement(child)) return null;
        return cloneElement(child, options)
      })}
    </>
  );
};

export default TaskToolbar;
