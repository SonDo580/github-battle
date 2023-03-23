import React from "react";
import { useSearchParams } from "react-router-dom";

export default function withSearchParams(Component) {
  return function (props) {
    const [searchParams, setSearchParams] = useSearchParams();

    return <Component {...props} router={{ searchParams }} />;
  };
}
