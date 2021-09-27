import { Button, Center, Flex, Heading, SlideFade, Square, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import Meta from '../components/Meta'
import useAuth from '../hooks/useAuth'

export default function Index() {
  // const bg = useColorModeValue("gray.900", "gray.50")
  const color = useColorModeValue('gray.300', 'gray.600')
  const { user } = useAuth();

  return (
    <Layout>
      <Meta title="Tasker" />
      <Square size="70%" flexDirection="column" mr="6">
        <Center mt="100">
          <Heading color={color} fontSize="xx-large">Tasker</Heading>
        </Center>
        <SlideFade in offsetY="-100px">
          {user ? (
            <NextLink href="/dashboard">
              <Button variant="link" color={color} size="md" mr={2}>Return to dashboard</Button>
            </NextLink>
          ) : (
            <Flex>
              <NextLink href="/register">
                <Button variant="link" color={color} size="md" mr={2}>Join now</Button>
              </NextLink>
              <NextLink href="/login">
                <Button variant="link" color={color} size="md" mr={2}>Already have account</Button>
              </NextLink>
            </Flex>
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