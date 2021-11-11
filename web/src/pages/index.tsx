import { ExternalLinkIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { Button, Heading, HStack, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import AuthLink from '../components/Auth/Link'
import Layout from '../components/Layout'
import Meta from '../components/Meta'

function Index() {
  const color = useColorModeValue('gray.400', 'blackAlpha.600')
  const bg = useColorModeValue("gray.800", "gray.50")

  return (
    <Layout>
      <Meta title="Taskq - task management" />
      <Stack spacing="20" alignItems="flex-start" my="20" mx="20">
        <Stack spacing="3">
          <HStack spacing="6">
            <Heading color={bg} bg={color} px="4" borderRadius="lg" fontSize="6xl">Your</Heading>
            <Heading color={color} fontSize="7xl">task management</Heading>
          </HStack>
          <Heading color={color} fontSize="7xl">application</Heading>
        </Stack>

        <Heading color={color} fontSize="lg">Base task management functionality</Heading>

        <HStack spacing="6">
          <AuthLink href="/workspace">
            <Button leftIcon={<PlusSquareIcon />} size="lg" colorScheme="green">
              Start now with new workspace
            </Button>
          </AuthLink>

          <AuthLink href="/">
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