import React from "react";

export default function TagsDisplay({ data }) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 3)}</pre>
    </div>
  );
}
