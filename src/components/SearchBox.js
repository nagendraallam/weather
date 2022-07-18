import React, { useState } from "react";

export default function SearchBox(props) {
  const [editCity, setEditCity] = useState("");

  return (
    <div className="absolute ml-[30vw] border-2 drop-shadow-xl flex flex-col bg-cyan-200 p-20">
      <h3 className="mb-2">Enter a place below</h3>
      <input
        className="border-2 border-cyan-500 w-[20vw] p-3 mb-2"
        placeholder="place"
        onChange={(e) => {
          setEditCity(e.target.value);
        }}
      />
      <button
        className="border-2 border-cyan-400 p-3 hover:border-cyan-800"
        onClick={() => props.findCity(editCity)}
      >
        Get weather
      </button>
      <button
        className="border-2 border-cyan-400 p-3 mt-2 hover:border-cyan-800"
        onClick={props.close}
      >
        close
      </button>
    </div>
  );
}
