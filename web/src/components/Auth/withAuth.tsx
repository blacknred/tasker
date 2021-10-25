import router from "next/router";
import { FC, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

function withAuth(Component: FC) {
  return function () {
    const { session } = useAuth();

    useEffect(() => {
      if (!session) router.replace("/");
    }, [session]);

    return session ? <Component /> : null;
  };
}

export default withAuth;