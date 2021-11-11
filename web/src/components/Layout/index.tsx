import { Box, SlideFade, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { Width } from '../../typings';
import Header from './Header';
import WorkspaceHeader from './Header/Workspace'

const Layout: FC<ILayoutProps> = ({ children, variant = 'lg', slide = true }) => {
  const bg = useColorModeValue("gray.800", "gray.50")
  const color = useColorModeValue('gray.500', 'gray.600')
  const { query } = useRouter();

  return (
    <Box bgColor={bg} minH="100vh" px={35} pb={50} color={color}>
      {/* header */}
      {query.wid ? <WorkspaceHeader /> : <Header />}

      {/* body */}
      <SlideFade in offsetY={slide ? "-30px" : 0}>
        <Box mt={variant === 'sm' ? 20 : 10} mx="auto" w="100%" maxW={Width[variant]}>
          {children}
        </Box>
      </SlideFade>
    </Box>
  );
}

export default Layout
export interface ILayoutProps {
  variant?: 'lg' | 'md' | 'sm',
  slide?: boolean
}
