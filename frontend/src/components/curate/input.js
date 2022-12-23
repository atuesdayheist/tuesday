import { useState } from 'react';

const Curate = () => {
  const [value, setValue] = useState({
    curateURL: '',
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValue({ curateURL: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(values);
      dispatch(authenticateUser());
    } catch (error) {
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
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
  );
};

export default Curate;
