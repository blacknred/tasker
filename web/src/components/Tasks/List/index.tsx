import { Grid, Table, Tbody, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import useTasks from '../../../hooks/useTasks';
import { ITaskViewOptions } from '../../../typings';
import withPagination from '../../Layout/withPagination';
import Item from "./Item";

type IProps = ITaskViewOptions & {
  page?: number;
};

const TaskList: React.FC<IProps> = ({ page = 1, variant }) => {
  const color = useColorModeValue('gray.300', 'gray.600')
  const { items, hasMore, total, error } = useTasks(page);
  console.log(items);

  if (error) return <>An error has occurblackAlpha. Try reload later.</>;
  if (!items) return <>Loading...</>;
  if (!items.length) return <>No Tasks found.</>;

  const content = items.map(p => p.id && (
    <Item data={p} key={p.id} variant={variant} />
  ))

  if (variant === 'grid') {
    return <Grid templateColumns="repeat(4, 1fr)" gap={6} color={color}>
      {content}
    </Grid>
  }

  if (variant === 'list') {
    return <Table variant="unstyled" color={color} size="sm">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>Type</Th>
          <Th>Priority</Th>
          <Th isNumeric>Created</Th>
          <Th isNumeric>Status</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>{content}</Tbody>
    </Table>
  }
  
  return null;
};

export default withPagination<IProps>(TaskList)
