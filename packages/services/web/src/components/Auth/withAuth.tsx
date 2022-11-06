import router from "next/router";
import { ComponentType, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

function withAuth<T>(Component: ComponentType<T>) {
  return function (props: T) {
    const { session, loading } = useAuth();

    useEffect(() => {
      if (!loading && !session) router.replace("/");
    }, [session, loading]);

    return session ? <Component {...props} /> : null;
  };
}

export default withAuth;