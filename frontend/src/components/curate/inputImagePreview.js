import React from 'react';

class InputImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_id: this.props.media_key,
      url: this.props.url,
      tags: [],
    };
  }

  render() {
    return <h1>{JSON.stringify(this.props.previewImage)}</h1>;
  }
}

export default InputImagePreview;
