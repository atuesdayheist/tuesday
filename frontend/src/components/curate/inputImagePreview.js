import { useState } from 'react';

const InputImagePreview = (imgData) => {
  const [tags, setTags] = useState(imgData.previewImage.tags || []);
  const [newTag, setNewTag] = useState('');

  const onNewTagInput = (e) => {
    if (e.target.value !== ',') {
      setNewTag(e.target.value);
    }
  };

  const onTagKeyPress = (e) => {
    if (e.key == ',' || e.key == 'Enter') {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  // const test = (e) => {
  //   e.preventDefault();
  //   console.log(tags);
  // };

  const tagPreview = tags.map((tag) => {
    return <div key={tag}>{tag}</div>;
  });

  return (
    <div>
      {/* <button onClick={(e) => test(e)}>Tags</button> */}
      <h1>{imgData.previewImage.url}</h1>
      {tagPreview}
      <input
        type="text"
        onChange={(e) => onNewTagInput(e)}
        onKeyPress={(e) => onTagKeyPress(e)}
        value={newTag}
      />
    </div>
  );
};

export default InputImagePreview;
