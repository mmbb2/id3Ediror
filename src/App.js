import React, { useState } from "react";
import { ID3Writer } from "browser-id3-writer";
import { saveAs } from "file-saver";
import tags from "./tags.json";
import * as MP3Tag from "mp3tag.js";
import TagsDisplay from "./TagsDisplay";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Editor from "./Editor";

function App() {
  const [musicTags, setMusicTags] = useState({});
  const [arrayBuffer, setArrayBuffer] = useState();
  const [fileName, setFileName] = useState();

  const handleChande = (e) => {
    const reader = new FileReader();
    reader.onload = function () {
      setArrayBuffer(reader.result);
      const mp3tag = new MP3Tag(reader.result);
      mp3tag.read();
      console.log(mp3tag.tags.v2);

      //const writer = new ID3Writer(arrayBuffer);

      for (const tag in mp3tag.tags.v2) {
        console.log(tag);
        if (tags[tag].type == "array;") {
          setMusicTags((prevState) => {
            const currentState = { ...prevState };
            currentState[tag] = mp3tag.tags.v2[tag].split(";");
            return currentState;
          });
        } else if (tags[tag].type == "array/") {
          setMusicTags((prevState) => {
            const currentState = { ...prevState };
            currentState[tag] = mp3tag.tags.v2[tag].split("\\\\");
            return currentState;
          });
        } else if (tags[tag].type == "object") {
          continue;
        } else {
          setMusicTags((prevState) => {
            const currentState = { ...prevState };
            currentState[tag] = mp3tag.tags.v2[tag];
            return currentState;
          });
        }
      }

      //writer.addTag();
      //saveAs(writer.getBlob(), "song with tags.mp3");
    };
    reader.readAsArrayBuffer(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSave = () => {
    if (arrayBuffer) {
      const writer = new ID3Writer(arrayBuffer);

      for (const tag in musicTags) {
        writer.setFrame(tag, musicTags[tag]);
      }

      writer.addTag();
      saveAs(writer.getBlob(), fileName);
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <input type="file" id="raised-button-file" style={{ display: "none" }} accept="audio/mpeg" onChange={handleChande} />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Open file
        </Button>
      </label>
      {Object.keys(musicTags).length > 0 && (
        <>
          <Button variant="contained" onClick={handleSave}>
            Save file
          </Button>
          <TagsDisplay data={musicTags} />
          <Editor musicTags={musicTags} setMusicTags={setMusicTags} />
        </>
      )}
    </div>
  );
}

export default App;
