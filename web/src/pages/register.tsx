import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import React from 'react';
import auth from '../auth';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import Meta from '../components/Meta';
import { errorMap } from '../utils';

function Register() {
  return (
    <Layout variant="sm">
      <Meta title="Registration" />
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values, actions) => {
          auth.register(values)
            .then(res => {
              actions.setErrors(errorMap(res.errors));
              actions.setSubmitting(false)
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="Username" />
            <Box mt={4}>
              <InputField name="email" label="Email" type="email" />
            </Box>
            <Box mt={4}>
              <InputField name="password" label="Password" type="password" />
            </Box>
            <Flex justifyContent="space-between" alignItems="baseline">
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Register
              </Button>
              <NextLink href="/login">
                <Button>Already have an account</Button>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default Register