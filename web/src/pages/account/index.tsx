import { Alert, AlertIcon, Button, Center, Heading, HStack, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Input from '../../components/Form/Input';
import Layout from '../../components/Layout';
import { SPOILERS } from '../../config';
import mutations from '../../lib/mutations';

function Authentication() {
  const router = useRouter();
  const notification = SPOILERS[router.asPath.split('#')[1] as keyof typeof SPOILERS]

  return (
    <Layout variant="sm" slide={false}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          mutations.createAuth(values, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              const target = router.query.next || '/workspaces'
              router.push(target as string)
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="9">
              <Center><Heading fontSize="x-large" >Athentication</Heading></Center>

              {notification && <Alert status="success"><AlertIcon />{notification}</Alert>}

              <Stack spacing="4">
                <Input name="email" label="Email" />
                <Input name="password" label="Password" type="password" />
              </Stack>

              <Button size="lg" colorScheme="messenger" isLoading={isSubmitting}
                type="submit" isFullWidth>Login</Button>

              <HStack justifyContent="space-between">
                <NextLink href="/account/confirm?next=new">
                  <Button variant="unstyled">Create account</Button>
                </NextLink>
                <NextLink href="/account/confirm?next=restore">
                  <Button variant="unstyled">Restore access</Button>
                </NextLink>
              </HStack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default Authentication;

