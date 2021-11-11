import { Box, Button, Center, Flex, Heading, HStack, Stack, useColorModeValue } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Input from '../../components/Form/Input';
import Layout from '../../components/Layout';
import Meta from '../../components/Meta';
import api from '../../mutations';

function NewAccount() {
  const router = useRouter();
  const color = useColorModeValue('gray.500', 'gray.500')

  return (
    <Layout variant="sm" slide={false}>
      <Meta title="Registration" />
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values, actions) => {
          api.createUser(values, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              router.push("/login")
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="9">
              <Center>
                <Heading color={color} fontSize="xx-large">New account</Heading>
              </Center>

              <Stack spacing="4">
                <Input name="name" label="Name" />
                <Input name="email" label="Email" type="email" />
                <Input name="password" label="Password" type="password" />
              </Stack>

              <Button colorScheme="green" isLoading={isSubmitting} type="submit" isFullWidth>Register</Button>

              <NextLink href="/auth">
                <Button variant="link" color={color}>Already have an account</Button>
              </NextLink>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default NewAccount;