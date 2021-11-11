import { Button, Center, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Input from '../../components/Form/Input';
import Layout from '../../components/Layout';
import mutations from '../../mutations';

function NewAccount() {
  const router = useRouter();

  return (
    <Layout variant="sm" slide={false}>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values, actions) => {
          mutations.createUser(values, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              router.push("/account")
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="9">
              <Center><Heading fontSize="3xl">New account</Heading></Center>

              <Stack spacing="4">
                <Input name="name" label="Name" />
                <Input name="email" label="Email" type="email" />
                <Input name="password" label="Password" type="password" />
              </Stack>

              <Button colorScheme="messenger" isLoading={isSubmitting} type="submit" isFullWidth>Register</Button>

              <NextLink href="/account">
                <Button variant="unstyled">Already have an account</Button>
              </NextLink>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default NewAccount;