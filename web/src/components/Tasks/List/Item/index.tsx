import { EditIcon } from '@chakra-ui/icons';
import { Badge, Heading, Stack, Td, Text, Tr, useColorModeValue, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { ITask, ITaskViewOptions } from '../../../../types';
import { timeSince } from '../../../../utils';
import { ModalTaskForm } from '../../Form';

interface IProps extends ITaskViewOptions {
  data: ITask
}

const TaskItem: FC<IProps> = ({ data, variant }) => {
  const bg = useColorModeValue('blackAlpha.300', 'white')
  const btnProps = { size: 'sm', leftIcon: <EditIcon />, children: 'Edit', variant: 'outline' };

  if (variant === 'grid') {
    return <VStack bg={bg} p="8" justifyContent="space-between" align="start">
      <VStack spacing={3} pb="4" align="flex-start">
        <Heading fontSize="md" size="xs" mb="2">{data.name.slice(0, 200)}</Heading>
        <Stack isInline spacing="2">
          <Badge variant="outline" colorScheme="blackAlpha">{data.type}</Badge>
          <Badge variant="outline" colorScheme="blackAlpha">{data.priority}</Badge>
          <Badge colorScheme="blackAlpha">{data.finishedAt ? 'Finished' : 'In process'}</Badge>
        </Stack>
        <Text fontSize="xs">{timeSince(data.createdAt)}</Text>
        <Text fontSize="sm">{data.description.slice(0, 200)}</Text>
      </VStack>
      <ModalTaskForm btnProps={btnProps} data={data} />
    </VStack>
  }

  return <Tr>
    <Td>{data.name.slice(0, 200)}</Td>
    <Td>{data.description.slice(0, 200)}</Td>
    <Td><Badge variant="outline" colorScheme="blackAlpha">{data.type}</Badge></Td>
    <Td><Badge variant="outline" colorScheme="blackAlpha">{data.priority}</Badge></Td>
    <Td isNumeric whiteSpace="nowrap">{timeSince(data.createdAt)}</Td>
    <Td isNumeric><Badge colorScheme="blackAlpha">{data.finishedAt ? 'Finished' : 'In process'}</Badge></Td>
    <Td w="10"><ModalTaskForm btnProps={btnProps} data={data} /></Td>
  </Tr>
}

export default TaskItem;

