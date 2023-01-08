import { useState, useEffect } from 'react';

const ImagePreviewContainer = (previewData) => {
  const [previewImages, setPreviewImages] = useState([]);
  useEffect(() => {
    setPreviewImages(previewData.imgData);
  }, [previewData]);

  const removePreview = (url) => {
    const newPreviewImages = previewImages.filter(
      (img) => img.url != url,
    );
    setPreviewImages(newPreviewImages);
  };

  const ImagePreview = () => {
    if (previewImages.length > 0) {
      return (
        <>
          {previewImages.map((previewImage) => {
            return (
              <div key={previewImages.indexOf(previewImage)}>
                Hello
                <button
                  type="submit"
                  onClick={() => removePreview(previewImage.url)}
                >
                  x
                </button>
              </div>
            );
          })}
          <button type="submit">Save Images</button>
        </>
      );
    }
  };

  return <div id="preview_container">{ImagePreview()}</div>;
};

export default ImagePreviewContainer;
