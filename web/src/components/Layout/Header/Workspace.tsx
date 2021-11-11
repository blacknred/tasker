import { ChevronDownIcon, CopyIcon, EditIcon, ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Avatar, Button, Flex, Heading, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Skeleton, useColorMode, useColorModeValue, useWhyDidYouUpdate } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useWorkspace from '../../../hooks/useWorkspace';
import api from '../../../mutations';

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
            <MenuList bgColor="blackAlpha.300">
              <MenuItem icon={<EditIcon />}>Edit profile</MenuItem>
              <MenuDivider />
              <MenuItem icon={<ExternalLinkIcon />} onClick={() => api.deleteAuth()}>
                Logout</MenuItem>
            </MenuList>
            <MenuButton
              as={Avatar}
              size="sm"
              name={workspace?.agent?.name}
              src={workspace?.agent?.image}
              cursor="pointer"
            />
          </Menu>
        </HStack>
      </Flex >
    </Skeleton>
  );
}

export default WorkspaceHeader