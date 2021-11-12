import { Button, Center, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import Input from '../../components/Form/Input';
import Layout from '../../components/Layout';
import mutations from '../../mutations';

function NewWorkspace() {
  const router = useRouter();

  return (
    <Layout variant="sm" slide={false}>
      <Formik
        initialValues={{ name: "", description: "" }}
        onSubmit={(values, actions) => {
          mutations.createUser(values, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              router.push("/workspaces")
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="9">
              <Center><Heading fontSize="3xl">New Workspace</Heading></Center>

              <Input name="name" label="Name" />

              <Button size="lg" colorScheme="messenger" isLoading={isSubmitting} type="submit"
                isFullWidth>Create</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default NewWorkspace;