import { ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { logout } from '../../api';
import useAuth from '../../hooks/useAuth';

interface IProps {
  variant?: 'lg' | 'sm',
}

const Layout: FC<IProps> = ({ children, variant = 'lg' }) => {
  const { user } = useAuth();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode()

  const width = variant === 'lg' ? 1050 : 400;
  const bg = useColorModeValue("gray.900", "gray.50")
  const color = useColorModeValue('gray.300', 'gray.600')

  return (
    <Box bgColor={bg} minH="100vh" pt={variant === 'sm' ? '50' : 0}>
      <Flex py={4} justifyContent="space-between" maxW={width} m="auto">
        <NextLink href="/">
          <Heading color={color} cursor="pointer" fontSize="xx-large">Tasker</Heading>
        </NextLink>
        {variant === 'lg' && (
          <Box>
            {user && (
              <>
                <Button variant="link" color={color} size="md">{user?.username}</Button>
                <IconButton
                  ml={4}
                  size="sm"
                  fontSize="lg"
                  aria-label="Logout"
                  icon={<ExternalLinkIcon />}
                  onClick={() => logout(() => router.replace("/"))}
                />
              </>
            )}
            <IconButton
              ml={4}
              size="sm"
              fontSize="lg"
              aria-label="Call Sage"
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
            />
          </Box>
        )}
      </Flex >
      <Box mt={8} mx="auto" w="100%" maxW={width}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout