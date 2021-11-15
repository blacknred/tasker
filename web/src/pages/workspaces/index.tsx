import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import Link from 'next/link';
import React from "react";
import withAuth from "../../components/Auth/withAuth";
import Layout from "../../components/Layout";
import useWorkspaces from "../../hooks/useWorkspaces";

function Workspaces() {
  const { items } = useWorkspaces(1);

  return (
    <Layout variant="sm">
      <Stack spacing="9">
        <Center><Heading fontSize="x-large">Select workspace</Heading></Center>

        <Stack spacing="4">
          {items?.length ? items.map(item => (
            <Button size="lg" h="20" colorScheme="blackAlpha">
              <Link href={`workspaces/${item.id}`}>
                <Text isTruncated p="3">{item.name}</Text>
              </Link>
            </Button>
          )) : (
            <Center>
              <Text isTruncated p="3">No available workspaces</Text>
            </Center>
          )}
        </Stack>

        <Link href="/workspaces/new">
          <Button variant="solid" leftIcon={<PlusSquareIcon />} size="lg">
            Add new workspace
          </Button>
        </Link>
      </Stack>
    </Layout>
  );
}

export default withAuth(Workspaces);

