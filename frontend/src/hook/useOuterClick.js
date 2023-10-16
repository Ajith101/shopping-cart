import { useEffect } from "react";

const useOuterClick = (ref, callback) => {
  useEffect(() => {
    const close = (event) => {
      if (ref?.current && !ref?.current?.contains(event.target)) {
        callback(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);
};

export default useOuterClick;
