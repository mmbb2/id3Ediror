import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

export default function StringField({ musicTags, setMusicTags, tag, isInt }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(musicTags[tag]);
  }, [tag]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value) {
      setMusicTags((prevState) => {
        const currentState = { ...prevState };
        currentState[tag] = e.target.value;
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

  return (
    <TextField sx={{ width: 500 }} value={value} type={isInt ? "number" : "string"} InputProps={isInt ? { inputProps: { min: 0 } } : { inputProps: {} }} onChange={handleChange} variant="outlined" />
  );
}
