import { useEffect, useRef, useState } from "react";
import './screenshotEditor.scss';
import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";

export default function ScreenshotEditor() {
    const [canvasSize, setCanvasSize] = useState({
        width: 1200,
        height: 700
    });

    const [canvasExportSize, setCanvasExportSize] = useState({
        width: 900,
        height: 450,
        x: (canvasSize.width - 900) / 2,
        y: (canvasSize.height - 450) / 2,
    });

    useEffect(() => {
        const { width, height } = canvasExportSize;
        setCanvasExportSize({
            width: width,
            height: height,
            x: (canvasSize.width - width) / 2,
            y: (canvasSize.height - height) / 2,
        });
    }, []);

    const [image, setImage] = useState(null);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [imageScale, setImageScale] = useState(1.00); // New state for scaling

    const handleScaleChange = (e) => {
        setImageScale(parseFloat(e.target.value));
    };

    const handleScaleScroll = (e) => {
        // Define a small step size for finer control
        const scrollSensitivity = 0.0001; // Adjust sensitivity as needed
    
        // Calculate the new scale factor
        const scaleFactor = Math.max(0.01, Math.min(3, imageScale - e.deltaY * scrollSensitivity));
    
        // Calculate the center of the image
        const image = imageRef.current;
        const imageWidth = image.width() * imageScale;
        const imageHeight = image.height() * imageScale;
        const imageCenterX = image.x() + imageWidth / 2;
        const imageCenterY = image.y() + imageHeight / 2;
    
        // Calculate the new image width and height
        const newImageWidth = image.width() * scaleFactor;
        const newImageHeight = image.height() * scaleFactor;
    
        // Calculate the new image position
        const newImageX = imageCenterX - newImageWidth / 2;
        const newImageY = imageCenterY - newImageHeight / 2;
    
        // Update the state
        setImageScale(scaleFactor);
        setImagePosition({
            x: image.x() + (newImageX - image.x()),
            y: image.y() + (newImageY - image.y())
        });
    };

    const stageRef = useRef(null);
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    const handleImageUpload = (e) => {
        if (e.target.files?.[0]) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            const image = new Image();
            image.src = imageUrl;
            setImage(image);
            console.log(image)
        }
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
        document.body.removeChild(link);
    };

    const handleDragMove = (e) => {
        
        const { x, y } = e.target.position();
        console.log(x, y)
        setImagePosition({ x, y });
    };

    return (
        <>
            <div ref={containerRef} className="screenshotEditorContainer">
                <Stage ref={stageRef} width={canvasSize.width} height={canvasSize.height} style={{ backgroundColor: "white" }}>
                    <Layer>
                        {image && (
                            <KonvaImage
                                ref={imageRef}
                                image={image}
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
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={handleExport}>Export Full Canvas</button>

            <div className="slider-container">
                <label htmlFor="image-scale">Image Scale:</label>
                <input
                    id="image-scale"
                    type="range"
                    min="0.01"
                    max="3"
                    step="0.01"
                    value={imageScale}
                    onChange={handleScaleChange}
                    onWheel={handleScaleScroll} // Add scroll event listener
                />
                <span>{imageScale.toFixed(2)}</span>
            </div>
        </>
    );
}
