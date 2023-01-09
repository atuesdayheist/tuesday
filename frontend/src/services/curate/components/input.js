import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getImageFromSource } from '../actions';
import { setPreview } from '../curateSlice';

import ImagePreviewContainer from './imagePreviews';

const CurateInput = () => {
  const [curateURL, setCurateURL] = useState(
    'https://twitter.com/atuesdayheist/status/1583376021226946562',
  );
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const submitURL = async (e) => {
    e.preventDefault();
    try {
      let previewResponse = await getImageFromSource({
        curateURL: curateURL,
      });
      dispatch(setPreview(previewResponse.data));
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
      <ImagePreviewContainer />
    </div>
  );
};

export default CurateInput;
