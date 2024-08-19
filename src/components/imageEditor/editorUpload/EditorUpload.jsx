import { useContext, useRef } from 'react';
import PlusIcon from '../../../assets/icons/PlusIcon';
import ButtonAccent from '../../buttonAccent/ButtonAccent';
import { v4 as uuid } from 'uuid';
import './editorUpload.scss';
import { ImageEditorContext } from '../ImageEditor';

export default function EditorUpload() {
  const { setUploadedImages } = useContext(ImageEditorContext);
  const uploadInputRef = useRef(null);

  const handleUploadImages = (e) => {
    if (e.target.files.length > 0) {
        Array.from(e.target.files).forEach((imageFile) => {
            const imageUrl = URL.createObjectURL(imageFile)
            const image = new Image()
            image.src = imageUrl
            console.log(image)
            const backgroundImageObject = {
                id: uuid(),
                image,
                imagePosition: {
                    x: 0,
                    y: 0,
                },
                imageScale: 1.0,
            }
            setUploadedImages(prev => [...prev, backgroundImageObject]);
        })
    }
  }

  const handleUploadClick = () => {
      uploadInputRef.current.click();
  }

  return (
    <section className='editorUploadSection'>
      <ButtonAccent title="Upload Image(s)" rounded={true} fullWidth={true} onClick={handleUploadClick}>
        <PlusIcon />
      </ButtonAccent>
      <input ref={uploadInputRef} style={{position: 'absolute', top: "-100%", left: "-100%"}} multiple type="file" accept="image/*" onChange={handleUploadImages} />
    </section>
  )
}
