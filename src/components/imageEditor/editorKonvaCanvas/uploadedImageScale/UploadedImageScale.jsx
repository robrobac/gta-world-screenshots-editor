import { useContext } from 'react';
import { ImageEditorContext } from '../../ImageEditor';
import './uploadedImageScale.scss';

export default function UploadedImageScale({imageScale, id}) {
    const { setUploadedImages } = useContext(ImageEditorContext);

    const calculateNewImagePosition = (image, newScale) => {
        // Calculate the current image width and height
        const imageWidth = image.image.width * image.imageScale;
        const imageHeight = image.image.height * image.imageScale;
        
        // Calculate the current center of the image
        const imageCenterX = image.imagePosition.x + imageWidth / 2;
        const imageCenterY = image.imagePosition.y + imageHeight / 2;
    
        // Calculate the new image width and height
        const newImageWidth = image.image.width * newScale;
        const newImageHeight = image.image.height * newScale;
    
        // Calculate the new image position to keep the center the same
        const newImageX = imageCenterX - newImageWidth / 2;
        const newImageY = imageCenterY - newImageHeight / 2;
    
        return {
            x: newImageX,
            y: newImageY,
        };
    };

    const handleScaleChange = (id, e) => {
        const newScale = parseFloat(e.target.value);
    
        setUploadedImages((prevState) =>
            prevState.map((image) => {
                if (image.id === id) {
                    const newPosition = calculateNewImagePosition(image, newScale);
                    return {
                        ...image,
                        imageScale: newScale,
                        imagePosition: newPosition,
                    };
                }
                return image;
            })
        );
    };

    const handleScaleScroll = (id, e) => {
        // Define a small step size for finer control
        const scrollSensitivity = 0.0001; // Adjust sensitivity as needed
    
        // Calculate the new scale factor
        const newScale = Math.max(0.01, Math.min(3, imageScale - e.deltaY * scrollSensitivity));
    
        setUploadedImages((prevState) =>
            prevState.map((image) => {
                if (image.id === id) {
                    const newPosition = calculateNewImagePosition(image, newScale);
                    return {
                        ...image,
                        imageScale: newScale,
                        imagePosition: newPosition,
                    };
                }
                return image;
            })
        );
    };

    return (
        <div className="uploadedImageScaleWrap">
            <input
                id="uploadedImageScale"
                type="range"
                min="0.01"
                max="3"
                step="0.01"
                value={imageScale}
                onChange={(e) => handleScaleChange(id, e)}
                onWheel={(e) => handleScaleScroll(id, e)}
            />
            <span>{imageScale.toFixed(2)}</span>
        </div>
    )
}
