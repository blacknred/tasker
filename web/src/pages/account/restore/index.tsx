import { Alert, Button, Center, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Input from '../../../components/Form/Input';
import Layout from '../../../components/Layout';
import { MESSAGES, SPOILERS } from '../../../constants';
import mutations from '../../../mutations';

function Restore() {
  const router = useRouter();

  return (
    <Layout variant="sm" slide={false}>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values, actions) => {
          mutations.createUser(values, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              router.push(`/account#${MESSAGES['restore-account-confirm']}`)
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="9">
              <Center><Heading fontSize="3xl">Restore access</Heading></Center>

              <Alert status="warning">{SPOILERS['restore-account-terms']}</Alert>

              <Input name="email" label="Email" type="email" />

              <Button colorScheme="messenger" isLoading={isSubmitting}
                type="submit" isFullWidth>Confirm email</Button>

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

export default Restore;
