import { Badge, Heading, Stack, Td, Text, Tr, useColorModeValue, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { ITask, ViewOptions } from '../../../typings';
import { timeSince } from '../../../utils';
import EditTaskButton from '../../TaskToolbar/ModalButton';

interface IProps extends ViewOptions {
  data: ITask
}

const Item: FC<IProps> = ({ data, variant }) => {
  const bg = useColorModeValue('gray.800', 'white')

  if (variant === 'grid') {
    return <VStack bg={bg} p="8" justifyContent="space-between" align="start">
      <VStack spacing={3} pb="4" align="flex-start">
        <Heading fontSize="md" size="xs" mb="2">{data.name.slice(0, 200)}</Heading>
        <Stack isInline spacing="2">
          <Badge variant="outline" colorScheme="telegram">{data.type}</Badge>
          <Badge variant="outline" colorScheme="telegram">{data.priority}</Badge>
          <Badge colorScheme="telegram">{data.finishedAt ? 'Finished' : 'In process'}</Badge>
        </Stack>
        <Text fontSize="xs">{timeSince(data.createdAt)}</Text>
        <Text fontSize="sm">{data.description.slice(0, 200)}</Text>
      </VStack>
      <EditTaskButton data={data} />
    </VStack>
  }

  return <Tr>
    <Td>{data.name.slice(0, 200)}</Td>
    <Td>{data.description.slice(0, 200)}</Td>
    <Td><Badge variant="outline" colorScheme="telegram">{data.type}</Badge></Td>
    <Td><Badge variant="outline" colorScheme="telegram">{data.priority}</Badge></Td>
    <Td isNumeric>{timeSince(data.createdAt)}</Td>
    <Td isNumeric><Badge colorScheme="telegram">{data.finishedAt ? 'Finished' : 'In process'}</Badge></Td>
    <Td w="10"><EditTaskButton data={data} /></Td>
  </Tr>
}

export default Item;

