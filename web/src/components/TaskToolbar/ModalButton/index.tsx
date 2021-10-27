import { EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Button, Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { FC } from "react";
import { ITask } from '../../../typings';
import Task from '../Task';

interface IProps {
  data?: ITask
}

const ModalButton: FC<IProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        colorScheme="telegram"
        onClick={onOpen}
        size={data ? "sm" : "md"}
        variant={data ? "outline" : "solid"}
        leftIcon={data ? <EditIcon /> : <PlusSquareIcon />}
      >
        {data ? 'Edit' : 'Create a task'}
      </Button>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={'outside'}
      >
        <ModalOverlay />
        <Task data={data} onSaved={onClose} />
      </Modal>
    </>
  )
}

export default ModalButton;