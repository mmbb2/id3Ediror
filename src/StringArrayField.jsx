import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

export default function StringArrayField({ musicTags, setMusicTags, tag }) {
  const [value, setValue] = useState([]);

  useEffect(() => {
    setValue(musicTags[tag]);
  }, [tag]);

  const handleChange = (e) => {
    setValue(e.target.value.split("\n"));
    if (e.target.value) {
      setMusicTags((prevState) => {
        const currentState = { ...prevState };
        currentState[tag] = e.target.value.split("\n");
        return currentState;
      });
    } else {
      setMusicTags((prevState) => {
        const currentState = { ...prevState };
        delete currentState[tag];
        return currentState;
      });
    }
  };

  return <TextField sx={{ width: 500 }} multiline rows={4} value={value?.join("\n")} onChange={handleChange} variant="outlined" />;
}
