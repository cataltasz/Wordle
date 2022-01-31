import TagContainer from "./Tags";
import React, { useState } from "react";

export default function SummaryForm() {
  const [tags, setTags] = useState([]);
  const [tagVal, setTagVal] = useState("");

  const addTag = () => {
    if (tagVal.length > 0 && tagVal.length < 14) {
      const updatedArray = [...tags, tagVal];

      setTags(updatedArray);

      setTagVal("");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TagContainer
        tagVal={tagVal}
        setTagVal={setTagVal}
        addTag={addTag}
        tags={tags}
      />
    </form>
  );
}
