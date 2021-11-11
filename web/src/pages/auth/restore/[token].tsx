import { Box, Button, Center, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Input from '../../components/Form/Input';
import Layout from '../../components/Layout';
import Meta from '../../components/Meta';
import mutations from '../../mutations';

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
          mutations.createUser(values, (err) => {
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
            <Input name="name" label="Name" />
            <Box mt={4}>
              <Input name="email" label="Email" type="email" />
            </Box>
            <Box mt={4}>
              <Input name="password" label="Password" type="password" />
            </Box>
            <Flex justifyContent="space-between" alignItems="end" mt={8}>
              <Button
                colorScheme="blackAlpha"
                isLoading={isSubmitting}
                type="submit"
              >
                Register
              </Button>
              <NextLink href="/login">
                <Button variant="link" color="blackAlpha.300">Already have an account</Button>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout >
  );
}

export default Register