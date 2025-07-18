import React, { useState } from "react";
import axios from "axios";
import './URLShortner.css'


export default function URLShortener() {
  const [inputURL, setInputURL] = useState("");
  const [outputURL, setOutputURL] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  
  const handleURLShortener=async()=>{
    if (!inputURL.startsWith("http://") && !inputURL.startsWith("https://")) {
      setError("URL must start with http:// or https://");
      return;
    }
    setOutputURL("");
    setLoader(true);
    setError("");

    
    try{
        const response = await axios.post("http://localhost:5000/shorten", {
        url: inputURL,
      });
        setOutputURL(response.data.shortUrl);
    }catch(err){
        setError("FAILED!");
    }
    setLoader(false);
  }
  return (
    <div className="inputDiv">
      <h2>URL SHORTENER</h2>
      <input
       className="inputField"
        placeholder="Enter your URL"
        value={inputURL}
        onChange={(event) => setInputURL(event.target.value)}
        type="text"
      />
      <br/><br/><br/>
      <button  className="btn" type="submit" onClick={handleURLShortener}>{loader ? "Please wait while Shortening":"Get shortened URL"}</button>
       {outputURL && (
        <p className="para">
          Shortened URL:{" "}
          <a href={outputURL} target="_blank" rel="noopener noreferrer">
            {outputURL}
          </a>
        </p>
      )}
       {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}


