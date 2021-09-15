import { Grid, Table, TableCaption, Thead, Tr, Th, Tbody } from '@chakra-ui/react';
import { useState } from 'react';
import { ITask, ListOptions } from '../../typings';
import Item from "./Item";
import Toolbar from "./Toolbar";

interface IProps {
  items: ITask[]
}

const TaskList: React.FC<IProps> = ({ items }) => {
  const [options, setOptions] = useState<ListOptions>({
    variant: 'list'
  })

  const content = items.map(p => p.id && (
    <Item data={p} key={p.id} variant={options.variant} />
  ))

  return (
    <>
      <Toolbar onChange={setOptions} />

      {options.variant === 'list' && (
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {content}
        </Grid>
      )}

      {options.variant === 'grid' && (
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Tasks</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Type</Th>
              <Th>Priority</Th>
              <Th isNumeric>Created</Th>
              <Th isNumeric>Finished</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>{content}</Tbody>
        </Table>
      )}
    </>
  )
};

export default TaskList