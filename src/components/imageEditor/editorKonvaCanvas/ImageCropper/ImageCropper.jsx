import { useRef, useState } from 'react';
import ButtonAccent from '../../../buttonAccent/ButtonAccent';
import './imageCropper.scss';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/src/ReactCrop.scss'
import { v4 as uuid } from 'uuid';
import PlusIcon from '../../../../assets/icons/PlusIcon';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 50;

export default function ImageCropper({setImageCropperVisible, setInsertedImages, setSelectedImageId}) {
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");

    const imgRef = useRef(null);
    const uploadInputRef = useRef(null);
    const previewCanvasRef = useRef(null);

    // Handles image upload and loading it, after the image is loaded onImageLoad function triggers
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;

        imageElement.addEventListener("load", (e) => {
            if (error) setError("");
            const { naturalWidth, naturalHeight } = e.currentTarget;
            if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
            setError(`Image must be at least ${MIN_DIMENSION} x ${MIN_DIMENSION} pixels.`);
            return setImgSrc("");
            }
        });
        setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };


    // Handle the action after the image loads
    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
        {
            unit: "%",
            width: cropWidthInPercent,
        },
        ASPECT_RATIO,
        width,
        height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    // On submit creates a canvas and inserts it in the Konva stage
    const handleCreateAndInsertCanvas = (
        image, // HTMLImageElement
        canvas, // HTMLCanvasElement
        crop // PixelCrop
      ) => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("No 2d context");
        }
      
        // devicePixelRatio slightly increases sharpness on retina devices
        // at the expense of slightly slower render times and needing to
        // size the image back down if you want to download/upload and be
        // true to the images natural size.
        const pixelRatio = 2;
        // console.log(window.devicePixelRatio)
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
      
        canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
      
        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = "high";
        ctx.save();
      
        const cropX = crop.x * scaleX;
        const cropY = crop.y * scaleY;
      
        // Move the crop origin to the canvas origin (0,0)
        ctx.translate(-cropX, -cropY);
        ctx.drawImage(
          image,
          0,
          0,
          image.naturalWidth,
          image.naturalHeight,
          0,
          0,
          image.naturalWidth,
          image.naturalHeight
        );
      
        ctx.restore();
      };



    return (
        <div className='imageCropperWrap'>
            <div className="imageCropperContainer">
                <ButtonAccent
                    title="Upload Image"
                    fullWidth={true} onClick={() => uploadInputRef.current.click()}
                >
                    <PlusIcon/>
                </ButtonAccent>

                {imgSrc && 
                    <div className="croppingImageWrap">
                        <ReactCrop
                            crop={crop}
                            onChange={(percentCrop) => setCrop(percentCrop)}
                            // onComplete={(e) => console.log(e)}
                            aspect={ASPECT_RATIO}
                            minWidth={MIN_DIMENSION}
                        >
                            <img ref={imgRef} src={imgSrc} onLoad={onImageLoad}/>
                        </ReactCrop>
                        {crop && ( <canvas ref={previewCanvasRef} style={{display: "none",}}/> )}
                    </div>
                }

                {/* Hidden input so I can use custom button for uploading files */}
                <input
                    ref={uploadInputRef}
                    style={{position: 'absolute', top: "-100%", left: "-100%"}}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                <div className="bottomControls">
                    <ButtonAccent
                        disabled={!imgSrc}
                        title="Crop and Insert"
                        onClick={() => {
                            handleCreateAndInsertCanvas(
                                imgRef.current, // HTMLImageElement
                                previewCanvasRef.current, // HTMLCanvasElement
                                convertToPixelCrop(
                                    crop,
                                    imgRef.current.width,
                                    imgRef.current.height
                                )
                            );
                            const dataUrl = previewCanvasRef.current.toDataURL();

                            const croppedImageObj = {
                                url: dataUrl,
                                id: uuid(),
                                canvas: previewCanvasRef.current
                            }

                            setInsertedImages(prev => [...prev, croppedImageObj])
                            setSelectedImageId(croppedImageObj.id)
                            setImageCropperVisible(false)
                        }}
                    />
                    <ButtonAccent
                        title="Cancel"
                        outlined={true}
                        onClick={() => setImageCropperVisible(false)}
                        rounded={true}
                    />
                </div>
            </div>
        </div>
    )
}
