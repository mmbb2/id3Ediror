import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import tags from "./tags.json";
import StringField from "./StringField";
import StringArrayField from "./StringArrayField";
import Typography from "@mui/material/Typography";

export default function Editor({ musicTags, setMusicTags }) {
  const [selectedTag, setSelectedTag] = useState("TPE1");

  const handleChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const createItems = () => {
    const items = [];
    for (const tag in tags) {
      if (tags[tag].type !== "object") {
        items.push(
          <MenuItem value={tag} key={tag}>
            {tag}
          </MenuItem>
        );
      }
    }
    return items;
  };
  return (
    <>
      <Select value={selectedTag} onChange={handleChange}>
        {createItems()}
      </Select>
      <Typography variant="body1" gutterBottom></Typography>
      {tags[selectedTag].type == "integer" || tags[selectedTag].type == "string" ? (
        <StringField musicTags={musicTags} setMusicTags={setMusicTags} tag={selectedTag} isInt={tags[selectedTag].type === "integer"} />
      ) : (
        <StringArrayField musicTags={musicTags} setMusicTags={setMusicTags} tag={selectedTag} />
      )}
    </>
  );
}
