import CurateInput from './components/input';
import CurateSearch from './components/search';
import CurateGallery from './components/gallery';

const CurateIndex = () => {
  return (
    <div id="curate_input">
      <CurateInput />
      <CurateSearch />
      <CurateGallery />
    </div>
  );
};

export default CurateIndex;
