import { useSelector } from 'react-redux';

const ImagePreviewContainer = (previewData) => {
  const previewImages = useSelector(
    (state) => state.curate.previewImages,
  );

  // const removePreview = (url) => {
  //   const newPreviewImages = previewImages.filter(
  //     (img) => img.url != url,
  //   );
  //   setPreviewImages(newPreviewImages);
  // };

  // const ImageTags = (props) => {
  //   const previewImage = props.img;
  //   const previewTags = previewImage.tags;

  //   const updateTags = (url, tags) => {
  //     const selfImage = previewImages.filter(
  //       (img) => img.url == url,
  //     )[0];
  //     const otherImages = previewImages.filter(
  //       (img) => img.url !== url,
  //     );
  //     if (selfImage) {
  //       selfImage.tags = tags;
  //     }
  //     otherImages.push(selfImage);
  //     setPreviewImages(selfImage);
  //     console.log(previewImages);
  //   };

  //   const removeTag = (removingTag) => {
  //     const newTags = previewTags.filter(
  //       (tag) => tag !== removingTag,
  //     );
  //     // console.log(newTags);
  //     updateTags(previewImage.url, newTags);
  //   };

  //   return previewTags.map((tag) => {
  //     return (
  //       <div key={tag}>
  //         {tag}
  //         <button type="submit" onClick={() => removeTag(tag)}>
  //           x
  //         </button>
  //       </div>
  //     );
  //   });
  // };

  const ImagePreview = () => {
    if (previewImages.length > 0) {
      return (
        <>
          {previewImages.map((previewImage) => {
            return (
              <div key={previewImages.indexOf(previewImage)}>
                <h1>{previewImage.url}</h1>

                {/* <ImageTags
                  key={previewImage.url}
                  img={previewImage}
                />

                <button
                  type="submit"
                  // onClick={() => removePreview(previewImage.url)}
                >
                  x
                </button> */}
              </div>
            );
          })}
          <button type="submit">Save Images</button>
        </>
      );
    }
  };

  // return <div id="preview_container">Yo</div>;
  return <div id="preview_container">{ImagePreview()}</div>;
};

export default ImagePreviewContainer;
