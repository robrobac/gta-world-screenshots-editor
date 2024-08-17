import { v4 as uuid } from 'uuid';

export default function UploadImages({setBackgroundImages, setActiveBackgroundImage}) {
    // const handleImageUpload = (e) => {
    //     if (e.target.files?.[0]) {
    //         const imageUrl = URL.createObjectURL(e.target.files[0]);
    //         const image = new Image();
    //         image.src = imageUrl;
    //         setImage(image);
    //     }
    // };

    const handleUploadBackgroundImages = (e) => {
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
                setBackgroundImages(prev => [...prev, backgroundImageObject]);
            })
        }
    }

    const handleDeleteAllImages = () => {
        setBackgroundImages([])
        setActiveBackgroundImage('')
    }

    return (
        <>
            <input multiple type="file" accept="image/*" onChange={handleUploadBackgroundImages} />
            <button onClick={handleDeleteAllImages}>Delete all images</button>
        </>
    )
}
