import { Box, Flex, Select, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import React, { Dispatch, FC, LegacyRef, SetStateAction, useRef } from 'react';
import useOnViewport from '../../../hooks/useOnViewport';
import { ListOptions } from '../../../typings';
import TaskModal from '../../TaskModal';

interface IProps {
  onChange: Dispatch<SetStateAction<ListOptions>>
}

const Toolbar: FC<IProps> = ({ onChange: update }) => {
  const fixedRef = useRef<HTMLDivElement>(null);
  const bg = useColorModeValue('gray.800', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ref] = useOnViewport((isVisible) => {
    if (!fixedRef.current) return;
    fixedRef.current.style.position = isVisible ? 'initial' : 'fixed';
    fixedRef.current.style.top = isVisible ? 'auto' : '0px';
    fixedRef.current.style.width = isVisible ? 'initial' : '290px';
  });

  return (
    <>
      <Flex spacing="6" h={100} ref={ref as LegacyRef<HTMLDivElement> | undefined}>
        <Box bg={bg} p="4">
          <Select variant="outline" color="teal" onChange={(ev) => {
            const variant = ev.target.value as ListOptions['variant']
            update((prev) => ({ ...prev, variant }))
          }}>
            <option value="list" defaultChecked>List</option>
            <option value="grid">Grid</option>
          </Select>
        </Box>

        <Box bg={bg} p="4">
          <TaskModal />
        </Box>
      </Flex>

      <Box ref={fixedRef} bg={bg} h={200} mt="6"></Box>
    </>
  );
};

export default Toolbar;
