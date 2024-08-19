import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import './editorKonvaCanvas.scss';
import CanvasControls from "./canvasControls/CanvasControls";
import UploadedImageScale from "./uploadedImageScale/UploadedImageScale";
import { useContext, useRef } from "react";
import { ImageEditorContext } from "../ImageEditor";

export default function EditorKonvaCanvas({image, id, activeId, canvasSize, canvasExportSize, uploadedImage}) {
    const { setUploadedImages } = useContext(ImageEditorContext);
    const stageRef = useRef(null)
    console.log(uploadedImage)

    const handleDragMove = (e, id) => {
        const { x, y } = e.target.position();

        setUploadedImages((prevState) =>
            prevState.map((image) => 
                image.id === id
                ? {...image, imagePosition: { x: x, y: y }}
                : image
            )
        )
    };

    const handleExport = () => {
        const dataUrl = stageRef.current?.toDataURL({
            x: canvasExportSize.x,
            y: canvasExportSize.y,
            width: canvasExportSize.width,
            height: canvasExportSize.height,
            pixelRatio: 1,
        });
        downloadUrl(dataUrl, "screenshot.png");
    };

    const downloadUrl = (url, name) => {
        const link = document.createElement("a");
        link.download = name;
        link.href = url || "";
        document.body.appendChild(link);
        link.click();
        console.log(url)
        document.body.removeChild(link);
    };

    return (
        <div className={`konvaCanvasWrap ${activeId === id ? 'konvaCanvasActive' : ''}`}>
            <CanvasControls handleExport={handleExport}/>
            <UploadedImageScale imageScale={uploadedImage.imageScale} id={id}/>
            <Stage
                ref={stageRef}
                width={canvasSize.width}
                height={canvasSize.height}
                style={{maxWidth: "100%", backgroundColor: "white"}}
            >
                <Layer>
                    {image && (
                        <KonvaImage
                            // ref={imageRef}
                            image={image}
                            scaleX={uploadedImage.imageScale}
                            scaleY={uploadedImage.imageScale}
                            x={uploadedImage.imagePosition.x}
                            y={uploadedImage.imagePosition.y}
                            draggable
                            onDragMove={(e) => handleDragMove(e, id)}
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
