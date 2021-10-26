import { Box, Button, Center, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import api from '../mutations';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import Meta from '../components/Meta';

function Register() {
  const router = useRouter();
  const color = useColorModeValue('gray.500', 'gray.400')

  return (
    <Layout variant="sm" slide={false}>
      <Meta title="Registration" />
      <Center mb="70px" >
        <Heading color={color} fontSize="xx-large">Athentication</Heading>
      </Center>

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
            <InputField name="name" label="Name" />
            <Box mt={4}>
              <InputField name="email" label="Email" type="email" />
            </Box>
            <Box mt={4}>
              <InputField name="password" label="Password" type="password" />
            </Box>
            <Flex justifyContent="space-between" alignItems="end" mt={8}>
              <Button
                colorScheme="telegram"
                isLoading={isSubmitting}
                type="submit"
              >
                Register
              </Button>
              <NextLink href="/login">
                <Button variant="link" color="telegram.300">Already have an account</Button>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default Register