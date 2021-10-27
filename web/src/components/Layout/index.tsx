import { ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, IconButton, useColorMode, useColorModeValue, SlideFade } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { FC } from 'react';
import mutations from '../../mutations';
import useAuth from '../../hooks/useAuth';
import { Width } from '../../typings';
import { getRandColor } from '../../utils';

interface IProps {
  variant?: 'lg' | 'md' | 'sm',
  slide?: boolean
}

const Layout: FC<IProps> = ({ children, variant = 'lg', slide = true }) => {
  const bg = useColorModeValue("gray.900", "gray.50")
  const color = useColorModeValue('gray.400', 'gray.500')
  const saturation = useColorModeValue(500, 200)
  const Icon = useColorModeValue(<SunIcon />, <MoonIcon />)
  const { toggleColorMode } = useColorMode()
  const { session } = useAuth();

  return (
    <Box bgColor={bg} minH="100vh" px={30} pb={50}>
      {/* header */}
      <Flex py={4} justifyContent="space-between" m="auto">
        <NextLink href="/">
          <Heading color={color} cursor="pointer" fontSize="x-large">Tasker</Heading>
        </NextLink>
        <Box>
          {session && (
            <>
              <Button variant="link" color={getRandColor(saturation)} size="md">{session.name}</Button>
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
            aria-label="Theme"
            onClick={toggleColorMode}
            color={color}
            colorScheme={color}
            icon={Icon}
          />
        </Box>
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