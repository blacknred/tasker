import { ChevronDownIcon, CopyIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Avatar, Button, Flex, Heading, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Skeleton, useColorMode, useColorModeValue, useWhyDidYouUpdate } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useWorkspace from '../../../hooks/useWorkspace';
import mutations from '../../../lib/mutations';

function WorkspaceHeader() {
  const router = useRouter();
  const { workspace, loading } = useWorkspace(router.query.wid as string);
  const ThemeIcon = useColorModeValue(<SunIcon />, <MoonIcon />)
  const { toggleColorMode } = useColorMode()
  useWhyDidYouUpdate('workspace', { workspace });

  return (
    <Skeleton isLoaded={!loading}>
      <Flex py={4} justifyContent="space-between" m="auto">
        <HStack spacing="6">
          <NextLink href="/workspaces">
            <CopyIcon fontSize="x-large" cursor="pointer" />
          </NextLink>
          <>
            <Heading fontSize="x-large" isTruncated maxW="600px">{workspace?.name}</Heading>
            <Menu>
              <MenuButton as={Button} size="md" colorScheme="blackAlpha" rightIcon={<ChevronDownIcon />}>
                Create
              </MenuButton>
              <MenuList>
                <MenuItem><NextLink href="workspaces/task">Task</NextLink></MenuItem>
                <MenuItem><NextLink href="workspaces/sagas/new">Saga</NextLink></MenuItem>
                <MenuItem><NextLink href="workspaces/agents/new">Agent</NextLink></MenuItem>
              </MenuList>
            </Menu>
          </>
        </HStack>

        <HStack spacing="6">
          <IconButton size="sm" fontSize="lg" aria-label="Theme" onClick={toggleColorMode} icon={ThemeIcon} />
          <Menu>
            <MenuButton><Avatar name={workspace?.agent?.name} src={workspace?.agent?.image} size="sm" /></MenuButton>
            <MenuList bgColor="whiteAlpha.100" shadow="md">
              <MenuItem textAlign="right" justifyContent="end"><NextLink
                href="/account/edit">Edit workspace profile</NextLink></MenuItem>

              <MenuDivider />
              <MenuItem textAlign="right" justifyContent="end"><NextLink
                href="/account/edit">Edit profile</NextLink></MenuItem>
              <MenuItem justifyContent="end" onClick={() => mutations.deleteAuth()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex >
    </Skeleton>
  );
}

export default WorkspaceHeader