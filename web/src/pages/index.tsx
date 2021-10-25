import { Button, Center, Heading, SlideFade, Square, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import Meta from '../components/Meta'
import useAuth from '../hooks/useAuth'

export default function Index() {
  const bg = useColorModeValue("whiteAlpha.50", "teal.50")
  const color = useColorModeValue('gray.300', 'gray.600')
  const { session } = useAuth();

  return (
    <Layout>
      <Meta title="Tasker" />
      <Square flexDirection="column" justifyContent="center" py="90px" bgColor={bg}>
        <Center mb="60px" >
          <Heading color={color} fontSize="xxx-large">Task management application</Heading>
        </Center>
        <SlideFade in offsetY="100px">
          {session?.o ? (
            <NextLink href="/dashboard">
              <Button variant="link" colorScheme={color} size="md">Return to dashboard</Button>
            </NextLink>
          ) : (
            <>
              <NextLink href="/register">
                <Button variant="outline" colorScheme="telegram" color="telegram.600" size="md" mr={3}>Join now</Button>
              </NextLink>
              <NextLink href="/login">
                <Button variant="solid" colorScheme="telegram" size="md">Already have account</Button>
              </NextLink>
            </>
          )}
        </SlideFade>
      </Square>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  };
}