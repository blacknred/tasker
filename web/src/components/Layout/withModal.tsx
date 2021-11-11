import { Button, ButtonProps, Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React, { FC } from "react";
import { ITask } from '../../typings';

interface IProps {
  btnProps?: ButtonProps,
  data?: ITask,
}

function withModal<T extends IProps>(Content: FC<IProps>) {
  return function ({ btnProps, ...rest }: T) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Button colorScheme="red" onClick={onOpen} children={'Modal'} {...btnProps} />
        <Modal
          isCentered
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior={'outside'}
        >
          <ModalOverlay />
          <Content {...rest} onSaved={onClose} />
        </Modal>
      </>
    )
  };
}

export default withModal;
