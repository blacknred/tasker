import { ExternalLinkIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { Button, Heading, HStack, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import AuthLink from '../components/Auth/Link'
import Layout from '../components/Layout'
import Meta from '../components/Meta'

function Index() {
  const color = useColorModeValue("gray.800", "gray.50")

  return (
    <Layout>
      <Meta title="Taskq - task management" />
      <Stack spacing="16" alignItems="flex-start" my="20" mx="20">
        <Stack spacing="6">
          <HStack spacing="6">
            <Heading color={color} bg="Background" px="4" borderRadius="lg" size="3xl">Your</Heading>
            <Heading size="4xl">task management</Heading>
          </HStack>
          <Heading size="4xl">application</Heading>
        </Stack>


        <Stack spacing="4">
          <Heading size="md">Simple and clean</Heading>
          <Heading size="md">Workspaces, agents, sagas and tasks</Heading>
        </Stack>


        <HStack spacing="6">
          <AuthLink href="/workspaces/new">
            <Button leftIcon={<PlusSquareIcon />} size="lg" colorScheme="messenger">
              Start now with new workspace
            </Button>
          </AuthLink>

          <AuthLink href="/workspaces">
            <Button leftIcon={<ExternalLinkIcon />} size="lg" colorScheme="blackAlpha">
              Back to work
            </Button>
          </AuthLink>
        </HStack>
      </Stack>
    </Layout>
  )
}

export default Index;
export async function getStaticProps() {
  return {
    props: {}
  };
}