import { Button, Center, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import withAuth from '../../components/Auth/withAuth';
import Input from '../../components/Form/Input';
import Layout from '../../components/Layout';
import { MESSAGES } from '../../constants';
import mutations from '../../mutations';

function ChangePassword() {
  const router = useRouter();

  return (
    <Layout variant="sm" slide={false}>
      <Formik
        initialValues={{ password: "", password2: "" }}
        onSubmit={({ password, password2 }, actions) => {
          if (password2 !== password) {
            actions.setErrors({ password2: 'Passwords differ' });
            actions.setSubmitting(false);
            return;
          }

          mutations.updateUser({ password }, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              mutations.deleteAuth(undefined, () => {
                router.push(`/account#${MESSAGES['update-password-done']}`)
              });
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="9">
              <Center><Heading fontSize="x-large">New password</Heading></Center>

              <Stack spacing="4">
                <Input name="password" label="Password" type="password" />
                <Input name="password2" label="Repeat password" type="password" placeholder="password" />
              </Stack>

              <Button size="lg" colorScheme="messenger" isLoading={isSubmitting}
                type="submit" isFullWidth>Save</Button>

              <Button variant="unstyled" onClick={router.back}>Go back</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default withAuth(ChangePassword);
