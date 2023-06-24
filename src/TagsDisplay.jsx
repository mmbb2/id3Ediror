import React from "react";
import tags from "./tags.json";

export default function TagsDisplay({ data, isFullname }) {
  const changeNames = () => {
    const newData = {};
    if (isFullname) {
      for (const tag in data) {
        newData[tags[tag].name] = data[tag];
      }
      return newData;
    }
    return data;
  };
  return (
    <div>
      <pre>{JSON.stringify(changeNames(), null, 3)}</pre>
    </div>
  );
}
