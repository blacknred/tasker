import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import api from '../api';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import Meta from '../components/Meta';

function Login() {
  const router = useRouter();

  return (
    <Layout variant="sm">
      <Meta title="Login" />
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={(values, actions) => {
          api.login(values, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              router.push("/dashboard")
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="usernameOrEmail" label="Username or email" />
            <Box mt={4}>
              <InputField name="password" label="Password" type="password" />
            </Box>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default Login;