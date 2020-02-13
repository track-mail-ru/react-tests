import React from "react";

export default function Dummy(props) {
  if (props.one) {
    return <h1>Dummy, {props.one}!</h1>;
  } else {
    return <span>Dummy, you</span>;
  }
}
