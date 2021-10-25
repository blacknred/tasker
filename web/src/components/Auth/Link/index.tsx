
import Link from 'next/link';
import React from 'react';
import useAuth from '../../../hooks/useAuth';

interface IProps {
  href: string
}

const AuthLink: React.FC<IProps> = ({ children, href }) => {
  const { session } = useAuth();

  return <Link href={session ? href : `/login?next=${href}`}>{children}</Link>;
}

export default AuthLink