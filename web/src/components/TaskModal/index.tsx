import { PlusSquareIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Modal, IconButton, ModalOverlay, useDisclosure } from '@chakra-ui/react';
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
      {data ? (
        <IconButton
          ml={4}
          size="sm"
          fontSize="md"
          onClick={onOpen}
          aria-label="Edit"
          icon={<EditIcon />}
        />
      ) : (
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
      )}

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={'outside'}
      >
        <ModalOverlay />

        <TaskForm data={data} onSaved={onClose} />
      </Modal>
    </>
  )
}

export default TaskModal;