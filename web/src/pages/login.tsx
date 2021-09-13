import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import auth from '../auth';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import Meta from '../components/Meta';
import { errorMap } from '../utils';

function Login() {
  return (
    <Layout variant="sm">
      <Meta title="Login" />
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={(values, actions) => {
          auth.login(values)
            .then(res => {
              actions.setErrors(errorMap(res.errors));
              actions.setSubmitting(false)
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