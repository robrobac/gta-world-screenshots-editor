import './uploadedImageScale.scss';

export default function UploadedImageScale({image, imageScale, setImageScale, imagePosition, setImagePosition}) {

    const calculateNewImagePosition = (newScale) => {
        // Calculate the current image width and height
        const imageWidth = image.width * imageScale;
        const imageHeight = image.height * imageScale;
        
        // Calculate the current center of the image
        const imageCenterX = imagePosition.x + imageWidth / 2;
        const imageCenterY = imagePosition.y + imageHeight / 2;
    
        // Calculate the new image width and height
        const newImageWidth = image.width * newScale;
        const newImageHeight = image.height * newScale;
    
        // Calculate the new image position to keep the center the same
        const newImageX = imageCenterX - newImageWidth / 2;
        const newImageY = imageCenterY - newImageHeight / 2;
    
        return {
            x: newImageX,
            y: newImageY,
        };
    };

    const handleScaleChange = (e) => {
        const newScale = parseFloat(e.target.value);
        const newPosition = calculateNewImagePosition(newScale);
        setImageScale(newScale);
        setImagePosition(newPosition);
    };

    const handleScaleScroll = (e) => {
        // Define a small step size for finer control
        const scrollSensitivity = 0.0001; // Adjust sensitivity as needed
    
        // Calculate the new scale factor
        const newScale = Math.max(0.01, Math.min(3, imageScale - e.deltaY * scrollSensitivity));
        const newPosition = calculateNewImagePosition(newScale);

        setImageScale(newScale);
        setImagePosition(newPosition);
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
                onChange={(e) => handleScaleChange(e)}
                onWheel={(e) => handleScaleScroll(e)}
            />
            <span>{imageScale.toFixed(2)}</span>
        </div>
    )
}
