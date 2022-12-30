import React, { useState } from 'react';
import { getImageFromSource } from '../../api/curate';
import InputImagePreview from './inputImagePreview';

const Curate = () => {
  const [value, setValue] = useState({
    curateURL: '',
  });
  const [error, setError] = useState(false);
  const [imageObjects, setImageObjects] = useState({
    curateImagePreview: [],
  });

  const onChange = (e) => {
    setValue({ curateURL: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let previewConfig = await getImageFromSource(value);
      setImageObjects({
        curateImagePreview: previewConfig.data.success,
      });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
    }
  };

  const imagePreviewContainer = () => {
    if (imageObjects.curateImagePreview.length > 0) {
      return (
        <>
          {imageObjects.curateImagePreview.map((img) => {
            return (
              <InputImagePreview
                key={img.media_key}
                previewImage={img}
              />
            );
          })}
        </>
      );
    }
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
        <h1>Curation Input Form &lt;Testing&gt;</h1>

        <div id="curate-url">
          <label htmlFor="curate-url" className="curate-url">
            Curate URL
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="text"
            value={value.curateURL}
            className="form-control"
            id="curate-url"
            name="curate-url"
            placeholder="Paste in URL here"
            required
          />
        </div>

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

        <button type="submit" className="btn btn-primary">
          Get Stuff
        </button>
      </form>
      {imagePreviewContainer()}
    </>
  );
};

export default Curate;
