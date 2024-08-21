import { useContext, useRef } from 'react';
import PlusIcon from '../../../assets/icons/PlusIcon';
import ButtonAccent from '../../buttonAccent/ButtonAccent';
import './editorUpload.scss';
import { ImageEditorContext } from '../ImageEditor';

export default function EditorUpload() {
  const { handleUploadFiles } = useContext(ImageEditorContext);
  const uploadInputRef = useRef(null);

  return (
    <section className='editorUploadSection'>
      <ButtonAccent title="Add Image(s)" fullWidth={true} onClick={() => uploadInputRef.current.click()}>
        <PlusIcon />
      </ButtonAccent>
      <input ref={uploadInputRef} style={{position: 'absolute', top: "-100%", left: "-100%"}} multiple type="file" accept="image/*" onChange={handleUploadFiles} />
    </section>
  )
}
