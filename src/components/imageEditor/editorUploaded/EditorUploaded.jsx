import { useContext } from 'react';
import { ImageEditorContext } from '../ImageEditor';
import './editorUploaded.scss'

export default function EditorUploaded() {
    const { uploadedImages, setUploadedImages, activeUploadedImage, setActiveUploadedImage } = useContext(ImageEditorContext);

    const handleBackgroundImageDelete = (id) => {
        const deletingImageIndex = uploadedImages.findIndex((uploadedImage) => uploadedImage.id === id);

        if (uploadedImages.length === 1) {
            setActiveUploadedImage('');
        } else if (deletingImageIndex == 0 && activeUploadedImage === id) {
            setActiveUploadedImage(uploadedImages[1].id);
            
        } else if (activeUploadedImage === id) {
            setActiveUploadedImage(uploadedImages[deletingImageIndex - 1].id);
            
        }
        const filteredArray = uploadedImages.filter((uploadedImage) => uploadedImage.id !== id);
        setUploadedImages([...filteredArray]);
    }

    const handleBackgroundImageSelect = (id) => {
        setActiveUploadedImage(id);
    }

  return (
    <div className='editorUploadedSection'>
        {uploadedImages.map((backgroundImage) => (
            <div key={backgroundImage.id} className='uploadedThumbnail'>
                <img
                    className={`thumbnailImage ${backgroundImage.id === activeUploadedImage && "activeThumbnail"}`}
                    src={backgroundImage.image.src}
                    height={100}
                    onClick={() =>handleBackgroundImageSelect(backgroundImage.id)}
                />
                <div className="thumbnailButtons">
                    <button onClick={() =>handleBackgroundImageDelete(backgroundImage.id)}>Delete</button>
                </div>
            </div>
        ))}
    </div>
  )
}
