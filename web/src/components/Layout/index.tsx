import { Box, SlideFade, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Width } from '../../typings';
import Header from './Header';

interface IProps {
  variant?: 'lg' | 'md' | 'sm',
  slide?: boolean
}

const Layout: FC<IProps> = ({ children, variant = 'lg', slide = true }) => {
  const bg = useColorModeValue("gray.800", "gray.50")

  return (
    <Box bgColor={bg} minH="100vh" px={35} pb={50}>
      {/* header */}
      <Header />

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