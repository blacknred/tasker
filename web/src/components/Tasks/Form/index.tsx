import { Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useColorModeValue, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from "react";
import api from '../../../mutations';
import { ITask, TaskPriority, TaskType } from '../../../typings';
import InputField from '../../Form/Input';
import SelectField from '../../Form/Select';
import withModal from '../../Layout/withModal';

interface IProps {
  data?: ITask;
  onSaved?: () => void;
}

const TaskForm: FC<IProps> = ({ data, onSaved }) => {
  const bg = useColorModeValue('gray.700', 'gray.100')
  const color = useColorModeValue('gray.500', 'gray.400')

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
        fn(values, (err) => {
          if (err) {
            actions.setErrors(err);
            actions.setSubmitting(false)
          } else {
            onSaved?.()
          }
        }, data?.id);
      }}
    >
      {({ isSubmitting }) => (
        <ModalContent bgColor={bg} p="4" minW="xl">
          <ModalCloseButton color={color} />
          <ModalHeader fontSize="x-large" color={color}>{data?.name || 'Create new task'}</ModalHeader>
          <Form>
            <ModalBody my="16px">
              <VStack spacing={4}>
                <InputField name="name" label="Task name" />
                <InputField name="description" label="Task description" area rows={3} />
                <SelectField readonly={!!data} name="type" label="Task type" options={Object.keys(TaskType)} />
                <SelectField readonly={!!data} name="priority" label="Task priority" options={Object.keys(TaskPriority)} />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="telegram" mr={3} isLoading={isSubmitting} type="submit">Save</Button>
              <Button onClick={onSaved}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      )}
    </Formik>
  )
}

export default TaskForm;
export const ModalTaskForm = withModal(TaskForm);