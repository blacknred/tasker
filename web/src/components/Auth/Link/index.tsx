
import Link from 'next/link';
import React from 'react';
import useAuth from '../../../hooks/useAuth';

const AuthLink: React.FC<IAuthLinkProps> = ({ children, href }) => {
  const { session } = useAuth();

  return <Link href={session ? href : `/account?next=${href}`}>{children}</Link>;
}

export default AuthLink
export interface IAuthLinkProps {
  href: string
}