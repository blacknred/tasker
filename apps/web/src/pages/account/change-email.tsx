import { Button, Center, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import withAuth from '../../components/Auth/withAuth';
import Input from '../../components/Form/Input';
import Layout from '../../components/Layout';
import { MESSAGES } from '../../config';
import mutations from '../../lib/mutations';

function ChangeEmail() {
  const router = useRouter();
  const formRef = useRef<FormikProps<FormikValues> | null>(null)

  return (
    <Layout variant="sm" slide={false}>
      <Formik
        initialValues={{ token: router.query.token, email: router.query.email }}
        innerRef={formRef}
        onSubmit={({ token }, actions) => {
          mutations.updateUser({ token }, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              mutations.deleteAuth(undefined, () => {
                router.push(`/account#${MESSAGES['update-email-done']}`)
              });
            }
          });
        }}
      >
        {({ errors }) => (
          <Form>
            <Stack spacing="9">
              <Center><Heading fontSize="x-large">New email</Heading></Center>

              <Stack spacing="4">
                <Input name="token" hidden />
                <Input name="email" label="Email" isDisabled />
              </Stack>

              {!errors.token && <Button size="lg" colorScheme="messenger" isLoading
                type="submit" isFullWidth>Save</Button>}

              <Button variant="unstyled" onClick={router.back}>Go back</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default withAuth(ChangeEmail);
