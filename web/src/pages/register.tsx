import { Box, Button, Flex } from '@chakra-ui/react';
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
  
  return (
    <Layout variant="sm">
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
            <InputField name="name" label="Name" />
            <Box mt={4}>
              <InputField name="email" label="Email" type="email" />
            </Box>
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
                Register
              </Button>
              <NextLink href="/login">
                <Button  variant="link">Already have an account</Button>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default Register