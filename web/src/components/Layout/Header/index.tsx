import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Avatar, Flex, Heading, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useColorMode, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import mutations from '../../../lib/mutations';

function Header() {
  const ThemeIcon = useColorModeValue(<SunIcon />, <MoonIcon />)
  const { toggleColorMode } = useColorMode()
  const { session } = useAuth();

  return (
    <Flex py={4} justifyContent="space-between" m="auto">

      <HStack spacing="6">
        <NextLink href="/">
          <Heading fontSize="x-large" cursor="pointer">taskapp</Heading>
        </NextLink>
      </HStack>

      <HStack spacing="6">
        <IconButton size="sm" fontSize="lg" aria-label="Theme" onClick={toggleColorMode} icon={ThemeIcon} />

        {session && (
          <Menu>
            <MenuButton><Avatar name={session.name} src={session.image} size="sm" /></MenuButton>
            <MenuList bgColor="whiteAlpha.100" shadow="md">
              <MenuItem textAlign="right" justifyContent="end"><NextLink
                href="/account/edit">Edit profile</NextLink></MenuItem>
              <MenuDivider />
              <MenuItem justifyContent="end" onClick={() => mutations.deleteAuth()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
    </Flex>
  );
}

export default Header;