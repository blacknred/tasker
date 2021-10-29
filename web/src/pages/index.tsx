import { PlusSquareIcon } from '@chakra-ui/icons'
import { Button, Center, Flex, Heading, Square, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import AuthLink from '../components/Auth/Link'
import Layout from '../components/Layout'
import Meta from '../components/Meta'
import useAuth from '../hooks/useAuth'

function Index() {
  const color = useColorModeValue('gray.300', 'gray.600')
  const { session } = useAuth();

  return (
    <Layout>
      <Meta title="TaskQ" />
      <Square flexDirection="column" justifyContent="center" py="80px">
        <Center mb="60px" >
          <Heading color={color} fontSize="xxx-large">Task management application</Heading>
        </Center>

        {session ? (
          <NextLink href="/dashboard">
            <Button variant="link" color={color} size="md">Return to dashboard</Button>
          </NextLink>
        ) : (
          <Flex>
            <NextLink href="/register">
              <Button variant="outline" colorScheme="telegram" color="telegram.600" size="md" mr={3}>Join now</Button>
            </NextLink>
            <NextLink href="/login">
              <Button variant="solid" colorScheme="telegram" size="md">Already have account</Button>
            </NextLink>
          </Flex>
        )}

        <AuthLink href="/workspace">
          <Button isFullWidth leftIcon={<PlusSquareIcon />} size="lg" variant="outline" colorScheme="telegram" mr={8}>
            Create a workspace
          </Button>
        </AuthLink>
      </Square>
    </Layout>
  )
}

export default Index;
export async function getStaticProps() {
  return {
    props: {}
  };
}