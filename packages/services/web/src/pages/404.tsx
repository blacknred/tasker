import router from "next/router";
import { useEffect } from "react";

function NotFound() {
  useEffect(() => {
    router.replace("/")
  })

  return null;
}

export default NotFound;

