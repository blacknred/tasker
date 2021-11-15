import { Button, Center, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MESSAGES } from '../../constants';
import Input from '../../components/Form/Input';
import Layout from '../../components/Layout';
import mutations from '../../mutations';

function CreateAccount() {
  const router = useRouter();

  return (
    <Layout variant="sm" slide={false}>
      <Formik
        initialValues={{ name: "", password: "", token: router.query.token }}
        onSubmit={(values, actions) => {
          mutations.createUser(values, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              router.push(`/account#${MESSAGES['create-account-done']}`)
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="9">
              <Center><Heading fontSize="x-large">New account</Heading></Center>

              <Stack spacing="4">
                <Input name="token" hidden />
                <Input name="name" label="Name" />
                <Input name="password" label="Password" type="password" />
              </Stack>

              <Button size="lg" colorScheme="messenger" isLoading={isSubmitting}
                type="submit" isFullWidth>Save</Button>

              <NextLink href="/account">
                <Button variant="unstyled">Back to authentication</Button>
              </NextLink>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default CreateAccount;