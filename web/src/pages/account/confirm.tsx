import { Button, Center, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Input from '../../components/Form/Input';
import Layout from '../../components/Layout';
import { MESSAGES } from '../../constants';
import mutations from '../../mutations';

function ConfirmAccount() {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.next) router.replace("/account");
  }, [router.query.next]);

  return (
    <Layout variant="sm" slide={false}>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values, actions) => {
          const nextpath = router.query.next;
          const target = `${window.location.hostname}/${nextpath}`;
          const params = { ...values, target, exist: nextpath !== 'new' };
          mutations.createEmailToken(params, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              router.push(`/account#${MESSAGES['confirmation-link-sent']}`)
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing="9">
              <Center><Heading fontSize="x-large">Enter email</Heading></Center>

              <Input name="email" label="Email" type="email" />

              <Button size="lg" colorScheme="messenger" isLoading={isSubmitting}
                type="submit" isFullWidth>Confirm email</Button>

              <NextLink href="/account">
                <Button variant="unstyled">Back to authentication</Button>
              </NextLink>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default ConfirmAccount;
