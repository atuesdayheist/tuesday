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

  const tagPreview = tags.map((tag) => {
    return <div key={tag}>{tag}</div>;
  });

  return (
    <div>
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


import { useState, useEffect } from 'react';

const ImagePreview = (props) => {
  // const [selfImage, setSelfImage] = useState(props.previewImage);

  //   const [tags, setTags] = useState(imgData.previewImage.tags || []);
  //   const [newTag, setNewTag] = useState('');
  //   const [nsfw, setNSFW] = useState(true);
  //   const [privateImage, setPrivateImage] = useState(false);

  //   const onNewTagInput = (e) => {
  //     if (e.target.value !== ',') {
  //       setNewTag(e.target.value);
  //     }
  //   };

  //   const onTagKeyPress = (e) => {
  //     if (e.key == ',' || e.key == 'Enter') {
  //       setTags([...tags, newTag]);
  //       setNewTag('');
  //     }
  //   };

  //   // Returns a filtered array of preview images and
  //   // removes itself to turn off this component's own display

  //   const removeTag = (tagBeingRemoved) => {
  //     const newTags = tags.filter((tag) => tag != tagBeingRemoved);
  //     setTags(newTags);
  //   };

  //   const tagPreview = tags.map((tag) => {
  //     return (
  //       <div key={tag}>
  //         {tag}
  //         <button onClick={() => removeTag(tag)}>x</button>
  //       </div>
  //     );
  //   });

  //   const handlePrivacy = () => {
  //     setPrivateImage(!privateImage);
  //   };

  //   const handleNSFW = () => {
  //     setNSFW(!nsfw);
  //   };

  return (
    <div className="previewImageContainer">
      Hi
      <button onClick={props.removeContainer(props.previewImage)}>
        x
      </button>
    </div>
  );
};

export default ImagePreview;
