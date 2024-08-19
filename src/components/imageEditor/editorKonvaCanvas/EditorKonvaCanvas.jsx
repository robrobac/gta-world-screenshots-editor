import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import './editorKonvaCanvas.scss';
import CanvasControls from "./canvasControls/CanvasControls";
import UploadedImageScale from "./uploadedImageScale/UploadedImageScale";
import { useContext, useEffect, useRef, useState } from "react";
import { ImageEditorContext } from "../ImageEditor";
import { useWindowSize } from "../../../hooks/useWindowSize";

export default function EditorKonvaCanvas({file}) {
    const { activeFileId } = useContext(ImageEditorContext);
    const { windowWidth, windowHeight } = useWindowSize();

    const stageRef = useRef(null)

    const [image, setImage] = useState(null);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [imageScale, setImageScale] = useState(1.00);

    console.log(image)

    useEffect(() => {
        const imageUrl = URL.createObjectURL(file.file)
        const image = new Image()
        image.src = imageUrl

        const imageObj = {
            id: file.id,
            image,
        }

        setImage(imageObj)
    }, [])

    // VISIBLE CANVAS SIZE
    const [canvasSize, setCanvasSize] = useState({
        width: 1200,
        height: 700
    });

    // EXPORT AREA
    const [canvasExportSize, setCanvasExportSize] = useState({
        width: 900,
        height: 450,
        x: (canvasSize.width - 900) / 2,
        y: (canvasSize.height - 450) / 2,
    });

    // Calculating the visible canvas size depending on the container size
    useEffect(() => {
        const contentSection = document.querySelector('.editorContentWrap');
        setCanvasSize({
            width: contentSection.offsetWidth,
            height: contentSection.offsetHeight
        })
    }, [windowWidth, windowHeight])

    // Calculating the export area size and the position depending on the visible canvas size
    useEffect(() => {
        const { width, height } = canvasExportSize;
        setCanvasExportSize({
            width: width,
            height: height,
            x: (canvasSize.width - width) / 2,
            y: (canvasSize.height - height) / 2,
        });
    }, [canvasSize]);

    // UPDATING IMAGE POSITION WHEN DRAGGING ACROSS THE CANVAS
    const handleDragMove = (e) => {
        const { x, y } = e.target.position();
        setImagePosition({ x, y });
    };

    // EXPORTING THE IMAGE
    const handleExport = () => {
        const dataUrl = stageRef.current?.toDataURL({
            x: canvasExportSize.x,
            y: canvasExportSize.y,
            width: canvasExportSize.width,
            height: canvasExportSize.height,
            pixelRatio: 1,
            quality: 1,

        });
        downloadUrl(dataUrl, "screenshot.png");
    };

    // CREATING A LINK TO DOWNLOAD IMAGE
    const downloadUrl = (url, name) => {
        const link = document.createElement("a");
        link.download = name;
        link.href = url || "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`konvaCanvasWrap ${activeFileId === image?.id ? 'konvaCanvasActive' : ''}`}>
            <CanvasControls handleExport={handleExport}/>
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
                style={{maxWidth: "100%", backgroundColor: "white"}}
            >
                <Layer imageSmoothingEnabled={false}>
                    {image && (
                        <KonvaImage
                            image={image.image}
                            scaleX={imageScale}
                            scaleY={imageScale}
                            x={imagePosition.x}
                            y={imagePosition.y}
                            draggable
                            onDragMove={handleDragMove}
                        />
                    )}
                </Layer>
                <Layer>
                    <Rect opacity={0.5} listening={false} fill="gray" x={0} y={0} width={canvasExportSize.x} height={canvasSize.height} />
                    <Rect opacity={0.5} listening={false} fill="gray" x={canvasSize.width - canvasExportSize.x} y={0} width={canvasExportSize.x} height={canvasSize.height} />
                    <Rect opacity={0.5} listening={false} fill="gray" x={canvasExportSize.x} y={0} width={canvasExportSize.width} height={canvasExportSize.y} />
                    <Rect opacity={0.5} listening={false} fill="gray" x={canvasExportSize.x} y={canvasSize.height - canvasExportSize.y} width={canvasExportSize.width} height={canvasExportSize.y} />
                </Layer>
            </Stage>
        </div>
    )
}
