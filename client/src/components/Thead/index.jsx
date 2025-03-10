import React from "react";

export default function Thead({ text }) {
  return (
    <thead>
      <tr>
        {text.map((text, index) => {
          return <th key={index}>{text}</th>;
        })}
      </tr>
    </thead>
  );
}
