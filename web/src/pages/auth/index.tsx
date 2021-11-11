import { Alert, Button, Center, Heading, HStack, Stack, useColorModeValue } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Input from '../../components/Form/Input';
import Layout from '../../components/Layout';
import Meta from '../../components/Meta';
import api from '../../mutations';
import { MESSAGES } from '../../utils';

function Auth() {
  const router = useRouter();
  const color = useColorModeValue('gray.500', 'gray.500')
  const notification = MESSAGES[router.asPath.split('#')[1]]

  return (
    <Layout variant="sm" slide={false}>
      <Meta title="Login" />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          api.createAuth(values, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              const target = router.query.next || '/workspace'
              router.push(target as string)
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="9">
              <Center>
                <Heading color={color} fontSize="xx-large">Athentication</Heading>
              </Center>

              {notification && <Alert status="success">{notification}</Alert>}

              <Stack spacing="4">
                <Input name="email" label="Email" />
                <Input name="password" label="Password" type="password" />
              </Stack>

              <Button colorScheme="green" isLoading={isSubmitting} type="submit" isFullWidth>Login</Button>

              <HStack justifyContent="space-between">
                <NextLink href="/auth/new">
                  <Button variant="link" color={color}>Create account</Button>
                </NextLink>
                <NextLink href="/auth/restore">
                  <Button variant="link" color={color}>Restore access</Button>
                </NextLink>
              </HStack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default Auth;

