import { Avatar, Button, Center, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import withAuth from '../../components/Auth/withAuth';
import Input from '../../components/Form/Input';
import Layout from '../../components/Layout';
import { MAX_FILE_SIZE, MB } from '../../constants';
import useAuth from '../../hooks/useAuth';
import mutations from '../../mutations';
import { fileToBase64 } from '../../utils';

function EditAccount() {
  const router = useRouter();
  const { session } = useAuth();
  const fileRef = useRef<HTMLInputElement | null>(null)

  // @ts-ignore
  fileRef.current?.onChange?.((e: any) => {
    console.log(768897, e);
  })
  return (
    <Layout variant="sm" slide={false}>
      <Formik
        initialValues={{ name: session?.name, thumb: session?.image, file: '' }}
        onSubmit={({ file, name }, actions) => {
          // TODO: save file in cdn and get an image url
          mutations.updateUser({ name }, (err) => {
            if (err) {
              actions.setErrors(err);
              actions.setSubmitting(false)
            } else {
              router.back();
            }
          });
        }}
      >
        {({ isSubmitting, values, setFieldValue, setFieldError }) => (
          <Form>
            <Stack spacing="9">
              <Center><Heading fontSize="x-large" mb="5">Edit account</Heading></Center>

              <Center>
                <Avatar _hover={{ opacity: 0.7 }} border={session?.isAdmin ? "4px solid red" : ""} cursor="pointer"
                  size="2xl" name={session?.name} src={values.thumb} onClick={() => fileRef.current?.click()} />
              </Center>

              <Input style={{ justifyContent: 'center', marginTop: -20 }} name="file" hidden type="file"
                innerRef={fileRef} accept={'image/*'} onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (!file) return;

                  if (file.size > MAX_FILE_SIZE) {
                    setFieldError('file', `File have to be up to ${MAX_FILE_SIZE / MB} mb`);
                    return;
                  }

                  fileToBase64(file, (data) => setFieldValue("thumb", data));
                }} />

              <Input name="name" label="Name" />

              <Stack spacing="4">
                <Button size="lg" colorScheme="messenger" isLoading={isSubmitting}
                  type="submit" isFullWidth>Save</Button>
                <NextLink href="/account/confirm?next=change-email">
                  <Button colorScheme="blackAlpha" >Change email</Button>
                </NextLink>
                <NextLink href="/account/change-password">
                  <Button colorScheme="blackAlpha">Change password</Button>
                </NextLink>
              </Stack>

              <Button variant="unstyled" onClick={router.back}>Go back</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default withAuth(EditAccount);