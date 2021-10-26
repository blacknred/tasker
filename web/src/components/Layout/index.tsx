import { ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, IconButton, useColorMode, useColorModeValue, SlideFade } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { FC } from 'react';
import mutations from '../../mutations';
import useAuth from '../../hooks/useAuth';
import { Width } from '../../typings';

interface IProps {
  variant?: 'lg' | 'md' | 'sm',
  slide?: boolean
}

const Layout: FC<IProps> = ({ children, variant = 'lg', slide = true }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { session } = useAuth();

  const bg = useColorModeValue("gray.900", "gray.50")
  const color = useColorModeValue('gray.400', 'gray.500')

  return (
    <Box bgColor={bg} minH="100vh">
      {/* header */}
      <Flex py={4} justifyContent="space-between" px={30} m="auto">
        <NextLink href="/">
          <Heading color={color} cursor="pointer" fontSize="x-large">Tasker</Heading>
        </NextLink>
        <Box>
          {session && (
            <>
              <Button variant="link" color={color} size="md">{session.name}</Button>
              <IconButton
                ml={4}
                size="sm"
                fontSize="lg"
                aria-label="Logout"
                color={color}
                colorScheme={color}
                icon={<ExternalLinkIcon />}
                onClick={() => mutations.deleteAuth()}
              />
            </>
          )}
          <IconButton
            ml={4}
            size="sm"
            fontSize="lg"
            aria-label="Call Sage"
            onClick={toggleColorMode}
            color={color}
            colorScheme={color}
            icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
          />
        </Box>
      </Flex >
      {/* body */}
      <SlideFade in offsetY={slide ? "100px" : 0}>
        <Box mt={20} mx="auto" w="100%" maxW={Width[variant]}>
          {children}
        </Box>
      </SlideFade>
    </Box>
  );
}

export default Layout