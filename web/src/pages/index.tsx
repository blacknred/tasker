import { CheckCircleIcon, CheckIcon, ExternalLinkIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { Button, Heading, HStack, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import AuthLink from '../components/Auth/Link'
import Layout from '../components/Layout'

function Index() {
  const color = useColorModeValue("gray.800", "gray.50")

  return (
    <Layout>
      <Stack spacing="16" alignItems="flex-start" my="20" mx="20">
        <Stack spacing="6">
          <HStack spacing="6">
            <Heading color={color} bg="Background" px="4" py="2" borderRadius="lg" size="3xl">Your</Heading>
            <Heading size="4xl">task management</Heading>
          </HStack>
          <Heading size="4xl">application</Heading>
        </Stack>

        <Stack spacing="5" opacity="0.7">
          <Heading as="mark" w="max-content" size="md" bgColor="messenger.100" px="2"> Simple and clean</Heading>
          <Heading as="mark" w="max-content" size="md" bgColor="messenger.100" px="2"> Microservice architecture</Heading>
          <Heading as="mark" w="max-content" size="md" bgColor="messenger.100" p="1"> Email based authentication with confirmation and invitation links</Heading>
          <Heading as="mark" w="max-content" size="md" bgColor="messenger.100" px="1"> Work within workspaces with agents, sagas and tasks</Heading>
          {/* <HStack><CheckCircleIcon color="Background" fontSize="lg" />
            <Heading size="md"> Email based authentication with confirmation and invitation links</Heading></HStack>
          <HStack><CheckCircleIcon color="Background" fontSize="lg" />
            <Heading size="md"> Work within workspaces with agents, sagas and tasks</Heading></HStack> */}
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