import { Button, Center, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import withAuth from '../../components/Auth/withAuth';
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
          mutations.createWorkspace(values, (err, data) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              router.push(`/workspaces/${data?.id}`)
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="9">
              <Center><Heading fontSize="x-large">New workspace</Heading></Center>

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

export default withAuth(NewWorkspace);