import { PlusSquareIcon } from '@chakra-ui/icons';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from "react";
import api from '../../api';
import { ITask, TaskPriority, TaskType } from '../../typings';
import InputField from '../InputField';

interface IProps {
  data?: ITask
}

const TaskForm: FC<IProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Formik
      initialValues={{
        name: data?.name || "",
        description: data?.description || "",
        type: data?.type || TaskType.SHORT,
        priority: data?.priority || TaskPriority.LOW
      }}
      onSubmit={(values, actions) => {
        const fn = data ? api.updateTask : api.createTask;
        fn(values, data?.id, (err) => {
          if (err) {
            actions.setErrors(err);
            actions.setSubmitting(false)
          } else {
            onClose()
          }
        });
      }}
    >
      {({ isSubmitting }) => (
        <ModalContent>
          <ModalHeader>{data?.name || 'Create new task'}</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Form>
              <VStack spacing={4}>
                <InputField name="name" label="Task name" />
                <InputField name="description" label="Task description" area rows={2} />

                <Select variant="outline" color="teal" placeholder="Task type">
                  <option value={TaskType.SHORT}>{TaskType.SHORT} process</option>
                  <option value={TaskType.SHORT}>{TaskType.MEDIUM} process</option>
                  <option value={TaskType.SHORT}>{TaskType.LONG} process</option>
                </Select>

                <Select variant="outline" color="teal" placeholder="Task priority">
                  <option value={TaskPriority.LOW}>{TaskPriority.LOW} priority</option>
                  <option value={TaskPriority.MODERATE}>{TaskPriority.MODERATE} priority</option>
                  <option value={TaskPriority.MAJOR}>{TaskPriority.MAJOR} priority</option>
                  <option value={TaskPriority.CRITICAL}>{TaskPriority.CRITICAL} priority</option>
                </Select>
              </VStack>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} isLoading={isSubmitting} type="submit">Create</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Formik>
  )
}

export default TaskForm;