import { PlusSquareIcon } from '@chakra-ui/icons';
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from "react";
import InputField from '../InputField';

interface IProps { }

const TaskForm: FC<IProps> = () => {
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
        <Formik
          initialValues={{ name: "", description: "", type: "", priority: ""  }}
          onSubmit={(values, actions) => {
            auth.login(values)
              .then(res => {
                actions.setErrors(errorMap(res.errors));
                actions.setSubmitting(false)
              });
          }}
        >
          {({ isSubmitting }) => (
            <ModalContent>
              <ModalHeader>Create new task</ModalHeader>
              <ModalCloseButton />

              <ModalBody pb={6}>
                <Form>
                  <VStack spacing={4}>
                    <InputField name="name" label="Task name" />
                    <InputField name="description" label="Task description" area rows={2} />
                    
                    <Select variant="outline" color="teal" onChange={(ev) => {
                      const variant = ev.target.value as ListOptions['variant']
                      update((prev) => ({ ...prev, variant }))
                    }}>
                      <option value="list" defaultChecked>List</option>
                      <option value="grid">Grid</option>
                    </Select>


                    <Select variant="outline" color="teal" onChange={(ev) => {
                      const variant = ev.target.value as ListOptions['variant']
                      update((prev) => ({ ...prev, variant }))
                    }}>
                      <option value="list" defaultChecked>List</option>
                      <option value="grid">Grid</option>
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
    </Modal>
    </>
  )
}

export default TaskForm;