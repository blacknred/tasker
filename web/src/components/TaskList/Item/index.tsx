import { ChatIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box, Button, Tr, Td, Center, Divider, Flex, Heading, Stack, Text, useColorModeValue
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';
import { ListOptions, ITask } from '../../../typings';
import { getRandBgColor, timeSince } from '../../../utils';

interface IProps {
  data: ITask,
  variant: ListOptions['variant']
}

const Item: FC<IProps> = ({ data, variant }) => {
  const bg = useColorModeValue('gray.800', 'white')
  const color = useColorModeValue('gray.300', 'blackAlpha')
  const saturation = useColorModeValue(500, 200)

  const content = (
    <Box px="7" pb="3" cursor={isFull ? "initial" : "pointer"}>
      <Heading color={color} fontSize="xl">{data.title}</Heading>
      <Text mt={4} color={color} fontFamily="mono">{data.textSnippet || data.text || ''}</Text>
    </Box>
  );

  if (variant === 'grid') {
    return (
      <Box bg={getRandBgColor(saturation)} h={300}>

      </Box>
    )
  }

  if (variant === 'list') {
    return (
      <Tr>
        <Td>{data.name}</Td>
        <Td>{data.description}</Td>
        <Td>{data.type}</Td>
        <Td>{data.priority}</Td>
        <Td isNumeric>{timeSince(data.createdAt)}</Td>
        <Td isNumeric>{data.finishedAt ? timeSince(data.finishedAt) : 'In process'}</Td>
      </Tr>
    )
  }
  return (
    <Flex alignItems="flex-start" grow={1}>
      <Stack bgColor={Math.random() > 0.2 ? bg : getRandBgColor(saturation)} flex="1" borderColor="red">
        <Flex px="7" py="5" alignItems="center">
          <Avatar size="xs" mr="2" name={data.creator.username} />
          <Heading size="xs" color={color} mr="3">{data.creator.username}</Heading>
          <Text fontSize="xs" color={color}>{timeSince(data.createdAt)}</Text>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default Item;

