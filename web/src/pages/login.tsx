import { Box, Button, Center, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Input from '../components/Form/Input';
import Layout from '../components/Layout';
import Meta from '../components/Meta';
import api from '../mutations';

const MESSAGES: Record<string, string> = {
  'new-password-sent': 'The confirmation link was sent to the email address.',
  'new-password-done': 'Password was successfully changed.',
};

function Login() {
  const router = useRouter();
  const color = useColorModeValue('gray.500', 'gray.400')
  const notification = MESSAGES[router.asPath.split('#')[1]]

  return (
    <Layout variant="sm" slide={false}>
      <Meta title="Login" />
      <Center mb="70px" >
        <Heading color={color} fontSize="xx-large">Athentication</Heading>
      </Center>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          api.createAuth(values, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              const target = router.query.next || '/dashboard'
              router.push(target as string)
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {notification && <Box mb={5} p="4" bgColor="teal.50" color="green">{notification}</Box>}
            <Input name="email" label="Email" />
            <Box mt={4}>
              <Input name="password" label="Password" type="password" />
            </Box>
            <Flex justifyContent="space-between" alignItems="end" mt={8}>
              <Button
                colorScheme="telegram"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
              <NextLink href="/forgot-password">
                <Button variant="link" color="telegram.300">Forgot password</Button>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default Login;

