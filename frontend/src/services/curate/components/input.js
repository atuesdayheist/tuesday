import { useState, useEffect } from 'react';
import { getImageFromSource } from '../actions';
import ImagePreviewContainer from './imagePreviews';

import { useDispatch } from 'react-redux';

const CurateInput = () => {
  const [curateURL, setCurateURL] = useState(
    'https://twitter.com/atuesdayheist/status/1583376021226946562',
  );
  const [error, setError] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const onChange = (e) => {
    setCurateURL(e.target.value);
  };

  const submitURL = async (e) => {
    e.preventDefault();
    try {
      let previewResponse = await getImageFromSource({
        curateURL: curateURL,
      });
      setPreviewImages(previewResponse.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <div id="curation_input">
      <form onSubmit={submitURL}>
        <h1>Curation Input Form</h1>
        <input
          onChange={(e) => onChange(e)}
          type="text"
          value={curateURL}
          placeholder="Paste in URL here"
          required
        />
        <button type="submit" className="btn btn-primary">
          Get Stuff
        </button>
      </form>
      <ImagePreviewContainer imgData={previewImages} />
    </div>
  );
};

export default CurateInput;
