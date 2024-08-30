import { Image as KonvaImage, Layer, Stage } from "react-konva";
import './editorKonvaCanvas.scss';
import CanvasControls from "./canvasControls/CanvasControls";
import UploadedImageScale from "./uploadedImageScale/UploadedImageScale";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ImageEditorContext } from "../ImageEditor";
import { useWindowSize } from "../../../hooks/useWindowSize";
import ChatEditor from "./chatEditor/ChatEditor";
import { surface } from "../../../sass/_variables";
import Chat from "./chat/Chat";
import BoundsOverlay from "./boundsOverlay/BoundsOverlay";
import ExportSizeHighlight from "./exportSizeHighlight/ExportSizeHighlight";
import supabase from '../../../config/supabaseClient';
import ImageCropper from "./ImageCropper/ImageCropper";
import CroppedImage from "./croppedImage/CroppedImage";

export const KonvaCanvasContext = createContext();

export default function EditorKonvaCanvas({file}) {
    // TODO - feedback form
    const { activeFileId, setFeedbackFormVisible } = useContext(ImageEditorContext);
    const { windowWidth, windowHeight } = useWindowSize();

    // Background Image(uploaded file) states
    const [image, setImage] = useState(null);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [imageScale, setImageScale] = useState(1.00);

    // Created Chats states
    const [chats, setChats] = useState([])
    const [selectedChatId, setSelectedChatId] = useState("")
    const [hoverChatId, setHoverChatId] = useState("")

    // Inserted Images States
    const [insertedImages, setInsertedImages] = useState([])
    const [selectedImageId, setSelectedImageId] = useState("")
    const [hoverImageId, setHoverImageId] = useState("")
    const [imageCropperVisible, setImageCropperVisible] = useState(false)

    const stageRef = useRef(null)

    // Creating background image from the uploaded file
    useEffect(() => {
        const imageUrl = file.imageUrl
        const image = new Image()
        image.src = imageUrl

        const imageObj = {
            id: file.id,
            image,
        }

        setImage(imageObj)
    }, [file])

    // Canvas Size, visible area
    const [canvasSize, setCanvasSize] = useState({
        width: 1200,
        height: 700
    });

    // Canvas Export Size, exportable area
    const [canvasExportSize, setCanvasExportSize] = useState({
        width: 900,
        height: 450,
        x: (canvasSize.width - 900) / 2,
        y: (canvasSize.height - 450) / 2,
    });

    // Calculating the visible canvas size depending on the container size when the window is resized
    useEffect(() => {
        const contentSection = document.querySelector('.editorContentWrap');

        setCanvasSize({
            width: contentSection.offsetWidth,
            height: contentSection.offsetHeight
        })

    }, [windowWidth, windowHeight])

    // Calculating the export area size and the position depending on the visible canvas size,
    // always positioned in the middle of the canvas size
    useEffect(() => {
        const { width, height } = canvasExportSize;

        const newCanvasExportX = (canvasSize.width - width) / 2
        const newCanvasExportY = (canvasSize.height - height) / 2

        setCanvasExportSize({
            width: width,
            height: height,
            x: newCanvasExportX,
            y: newCanvasExportY,
        });

    }, [canvasSize]);

    // Calculating the image position when dragging it across the canvas
    const handleDragMoveImage = (e) => {
        const { x, y } = e.target.position();
        setImagePosition({ x, y });
    };

    // Handling the image export click
    const handleExport = async () => {
        setSelectedChatId("")
        setHoverChatId("")
        setSelectedImageId("")
        setHoverImageId("")
        
        // Wait 500ms so the selectedChatId and hoverChatId are fully updated
        setTimeout(() => {
            const dataUrl = stageRef.current?.toDataURL({
                x: canvasExportSize.x,
                y: canvasExportSize.y,
                width: canvasExportSize.width,
                height: canvasExportSize.height,
                pixelRatio: 1,
                quality: 1,
            });

            // Download the image
            downloadUrl(dataUrl, "edited-screenshot.png");
        }, 500);

        await registerExport()
    };

    // Creating a download link, clicking it and removing it
    const downloadUrl = (url, name) => {
        const link = document.createElement("a");
        link.download = name;
        link.href = url || "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // TODO Feedback form logic with local storage won't stay after the testing phase
        if (localStorage.getItem("feedbackSubmittedAndBlocked")) {
            return
        } else if (Number(localStorage.getItem("exportCount")) >= 5) {
            localStorage.setItem("exportCount", 1);
        } else {
            localStorage.setItem("exportCount", Number(localStorage.getItem("exportCount")) + 1);
        }

        if (localStorage.getItem("exportCount") <= 1) {
            setTimeout(() => {
                setFeedbackFormVisible(true)
            }, 2000);
        }
    };

    // TODO
    const registerExport = async () => {
        const {data, error} = await supabase
            .from('exportCount')
            .insert([{}])

            if (error) {
                console.log(error)
            }
            if (data) {
                console.log(data)
            }
    }

    return (
        <div className={`konvaCanvasWrap ${activeFileId === image?.id ? 'konvaCanvasActive' : ''}`}>

            {imageCropperVisible &&
                <ImageCropper setImageCropperVisible={setImageCropperVisible} setInsertedImages={setInsertedImages} setSelectedImageId={setSelectedImageId}/>
            }
            
            {chats?.map((chat) => (
                // Render chat editor, a rich text editor, for each chat in the file
                <ChatEditor
                    key={chat.id}
                    currentChat={chat}
                    setChats={setChats}
                    selectedChatId={selectedChatId}
                    setSelectedChatId={setSelectedChatId}
                    hoverChatId={hoverChatId}
                    setHoverChatId={setHoverChatId}
                    canvasSize={canvasSize}
                />
            ))}
            {/* Canvas control buttons: Download edited image, delete current image/file,
                change canvas export size, add chat, add image, add blur etc... */}
            <CanvasControls 
                handleExport={handleExport}
                setChats={setChats} 
                id={file.id}
                setSelectedChatId={setSelectedChatId}
                canvasSize={canvasSize} setCanvasSize={setCanvasSize} 
                canvasExportSize={canvasExportSize} 
                setCanvasExportSize={setCanvasExportSize}
                setImageCropperVisible={setImageCropperVisible}
            />
            {/* Background image/file size scale, controled with range input */}
            <UploadedImageScale
                image={image?.image}
                imageScale={imageScale}
                setImageScale={setImageScale}
                imagePosition={imagePosition}
                setImagePosition={setImagePosition}
            />
            <Stage
                ref={stageRef}
                width={canvasSize.width}
                height={canvasSize.height}
                style={{maxWidth: "100%", backgroundColor: surface}}
            >
                {/* Highlight that indicates the export size boundaries */}
                <ExportSizeHighlight canvasExportSize={canvasExportSize} />

                {/* Background image/file */}
                <Layer>
                    {image && (
                        <KonvaImage
                            image={image.image}
                            scaleX={imageScale}
                            scaleY={imageScale}
                            x={imagePosition.x}
                            y={imagePosition.y}
                            draggable
                            onDragMove={handleDragMoveImage}
                        />
                    )}
                </Layer>

                <Layer>
                    {insertedImages?.map((insertedImage) => (
                        // For each inserted image render the image
                        <CroppedImage
                            key={insertedImage.id}
                            image={insertedImage}
                            insertedImages={insertedImages}
                            setInsertedImages={setInsertedImages}
                            stageRef={stageRef}
                            selectedImageId={selectedImageId}
                            setSelectedImageId={setSelectedImageId}
                            canvasExportSize={canvasExportSize}
                            hoverImageId={hoverImageId}
                            setHoverImageId={setHoverImageId}
                        />
                    ))}
                </Layer>
                
                <Layer>
                    {chats?.map((chat) => (
                        // For each Chat render its chat canvas
                        <Chat
                            key={chat.id}
                            chat={chat}
                            stageRef={stageRef}
                            selectedChatId={selectedChatId}
                            setSelectedChatId={setSelectedChatId}
                            hoverChatId={hoverChatId}
                            setHoverChatId={setHoverChatId}
                            canvasExportSize={canvasExportSize}
                        />
                    ))}
                </Layer>

                {/* Canvas export area border */}
                <BoundsOverlay canvasSize={canvasSize} canvasExportSize={canvasExportSize} />

            </Stage>

        </div>
    )
}
