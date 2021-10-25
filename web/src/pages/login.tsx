import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import api from '../mutations';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import Meta from '../components/Meta';

const MESSAGES: Record<string, string> = {
  'new-password-sent': 'The confirmation link was sent to the email address.',
  'new-password-done': 'Password was successfully changed.',
};

function Login() {
  const router = useRouter();
  const notification = MESSAGES[router.asPath.split('#')[1]]

  return (
    <Layout variant="sm">
      <Meta title="Login" />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          api.createAuth(values, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              const target = typeof router.query.next || '/dashboard'
              router.push(target)
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {notification && <Box mb={5} p="4" bgColor="teal.50" color="green">{notification}</Box>}
            <InputField name="email" label="Email" />
            <Box mt={4}>
              <InputField name="password" label="Password" type="password" />
            </Box>

            <Flex justifyContent="space-between" alignItems="end">
              <Button
                mt={4}
                colorScheme="telegram"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
              <NextLink href="/forgot-password">
                <Button variant="link">Forgot password</Button>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default Login;

