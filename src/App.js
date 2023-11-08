import "./styles.css";
import { useState } from "react";
import fs from "fs";
import { AwesomeButton } from "react-awesome-button";
export default function App() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  function handleFileUpload(event) {
    let file = event.target.files[0];
    setImage(file);
    console.log("here");
  }

  async function handleButtonClick(event) {
    if (image) {
      // apiObject = { image: fs.createReadStream(image) };
      const url = "https://api.quotable.io/quotes/random?maxLength=25";
      await fetch(url, {
        method: "GET"
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setCaption(data[0].content);
        });
    }
  }
  function copyText() {
    navigator.clipboard.writeText(caption);
  }
  return (
    <div className="main">
      <div className="heading"></div>
      <div className="image-display border-style">
        {image ? (
          <img src={URL.createObjectURL(image)} className="image" />
        ) : (
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileUpload}
          />
        )}
      </div>
      <div className="captions-display border-style">
        <button className="copy" onClick={copyText}>
          copy
        </button>
        <p className="caption-text">"{caption}"</p>
        <button onClick={handleButtonClick}> GO !</button>
      </div>
    </div>
  );
}
