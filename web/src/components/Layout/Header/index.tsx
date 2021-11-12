import { EditIcon, ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Avatar, Flex, Heading, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useColorMode, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import mutations from '../../../mutations';

function Header() {
  const ThemeIcon = useColorModeValue(<SunIcon />, <MoonIcon />)
  const { toggleColorMode } = useColorMode()
  const { session } = useAuth();

  return (
    <Flex py={4} justifyContent="space-between" m="auto">

      <HStack spacing="6">
        <NextLink href="/">
          <Heading fontSize="x-large" cursor="pointer">tasq</Heading>
        </NextLink>
      </HStack>

      <HStack spacing="6">
        <IconButton size="sm" fontSize="lg" aria-label="Theme" onClick={toggleColorMode} icon={ThemeIcon} />
        {session && (
          <Menu>
            <MenuList bgColor="blackAlpha.300" >
              <MenuItem icon={<EditIcon />}>Edit account</MenuItem>
              <MenuDivider />
              <MenuItem icon={<ExternalLinkIcon />} onClick={() => mutations.deleteAuth()}>
                Logout</MenuItem>
            </MenuList>
            <MenuButton
              as={Avatar}
              size="sm"
              name={session.name + ''}
              src={session.image}
              cursor="pointer"
            />
          </Menu>
        )}
      </HStack>
    </Flex>
  );
}

export default Header;