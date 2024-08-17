import { useEffect } from "react";

export default function ImageSelect({backgroundImages, setBackgroundImages, activeBackgroundImage, setActiveBackgroundImage}) {
    const handleBackgroundImageDelete = (id) => {
        const deletingImageIndex = backgroundImages.findIndex((backgroundImage) => backgroundImage.id === id);

        if (backgroundImages.length === 1) {
            setActiveBackgroundImage('');
        } else if (deletingImageIndex == 0 && activeBackgroundImage === id) {
            setActiveBackgroundImage(backgroundImages[1].id);
            
        } else if (activeBackgroundImage === id) {
            setActiveBackgroundImage(backgroundImages[deletingImageIndex - 1].id);
            
        }
        const filteredArray = backgroundImages.filter((backgroundImage) => backgroundImage.id !== id);
        setBackgroundImages([...filteredArray]);
    }

    const handleBackgroundImageSelect = (id) => {
        setActiveBackgroundImage(id);
    }

    return (
        <div>
            {backgroundImages.map((backgroundImage, index) => (
                <div key={index} style={backgroundImage.id === activeBackgroundImage ? {border: '1px solid black'} : {}}>
                    <img src={backgroundImage.image.src} height={100} onClick={() =>handleBackgroundImageSelect(backgroundImage.id)}/>
                    <button onClick={() =>handleBackgroundImageDelete(backgroundImage.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}
