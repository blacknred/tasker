import { ChevronDownIcon, CopyIcon, EditIcon, ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, Heading, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, SlideFade, useColorMode, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { FC } from 'react';
import useAuth from '../../hooks/useAuth';
import mutations from '../../mutations';
import { Width } from '../../typings';

interface IProps {
  variant?: 'lg' | 'md' | 'sm',
  slide?: boolean
}

const Layout: FC<IProps> = ({ children, variant = 'lg', slide = true }) => {
  const bg = useColorModeValue("gray.800", "gray.50")
  const color = useColorModeValue('gray.400', 'gray.700')
  const ThemeIcon = useColorModeValue(<SunIcon />, <MoonIcon />)
  const { toggleColorMode } = useColorMode()
  let { session } = useAuth();
  // session = {}

  const workspace = 'J Balvin Group Inc'

  return (
    <Box bgColor={bg} minH="100vh" px={35} pb={50}>
      {/* header */}
      <Flex py={4} justifyContent="space-between" m="auto">
        <HStack spacing="6">
          <NextLink href="/">
            <Heading color={color} fontSize="x-large" cursor="pointer">
              {session ? <CopyIcon /> : 'taskq'}
            </Heading>
          </NextLink>
          {session && (
            <>
              <Heading color={color} fontSize="x-large" isTruncated maxW="600px">{workspace}</Heading>
              <Menu>
                <MenuButton as={Button} size="md" colorScheme="blackAlpha" rightIcon={<ChevronDownIcon />}>
                  Create
                </MenuButton>
                <MenuList>
                  <MenuItem><NextLink href="workspace/task">Task</NextLink></MenuItem>
                  <MenuItem><NextLink href="workspace/saga">Saga</NextLink></MenuItem>
                  <MenuItem><NextLink href="workspace/agent">Agent</NextLink></MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </HStack>

        <HStack spacing="6">
          <IconButton
            size="sm"
            fontSize="lg"
            aria-label="Theme"
            onClick={toggleColorMode}
            color={color}
            colorScheme={color}
            icon={ThemeIcon}
          />
          {session && (
            <Menu>
              <MenuList bgColor="blackAlpha.300" color={color}>
                <MenuItem icon={<EditIcon />}>Edit profile</MenuItem>
                <MenuItem icon={<EditIcon />}>Edit account</MenuItem>
                <MenuDivider />
                <MenuItem icon={<ExternalLinkIcon />} onClick={() => mutations.deleteAuth()}>
                  Logout</MenuItem>
              </MenuList>
              <MenuButton
                as={Avatar}
                size="sm"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                cursor="pointer"
              />
            </Menu>
          )}

        </HStack>
      </Flex >

      {/* body */}
      <SlideFade in offsetY={slide ? "-30px" : 0}>
        <Box mt={10} mx="auto" w="100%" maxW={Width[variant]}>
          {children}
        </Box>
      </SlideFade>
    </Box>
  );
}

export default Layout