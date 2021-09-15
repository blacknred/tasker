import { PlusSquareIcon } from '@chakra-ui/icons';
import { Button, Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { FC } from "react";
import { ITask } from '../../typings';
import TaskForm from './TaskForm';

interface IProps {
  data?: ITask
}

const TaskModal: FC<IProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<PlusSquareIcon />}
        colorScheme="teal"
        variant="outline"
        size="lg"
        mr={8}
      >
        Create a task
      </Button>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={'outside'}
      >
        <ModalOverlay />
        
        <TaskForm data={data} />
      </Modal>
    </>
  )
}

export default TaskModal;