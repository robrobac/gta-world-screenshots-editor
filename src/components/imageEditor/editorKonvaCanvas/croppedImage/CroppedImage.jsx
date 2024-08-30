import { useEffect, useRef, useState } from "react";
import { Circle, Group, Image as KonvaImage, Line, Rect, Transformer } from "react-konva";
import { accent, accentTransparent, borderRadiusM, surface } from "../../../../sass/_variables";

const rotationSnaps = Array.from({ length: 360 / 15 }, (_, i) => i * 15);

export default function CroppedImage({image, insertedImages, setInsertedImages, stageRef, selectedImageId, setSelectedImageId, canvasExportSize, hoverImageId, setHoverImageId}) {
    const [position, setPosition] = useState({
        x: canvasExportSize.x + canvasExportSize.width - (image.canvas.width / 2) - 20,
        y: canvasExportSize.y + 52
    });
    const [size, setSize] = useState({
        width: image.canvas ? image.canvas.width : 10,
        height: image.canvas ? image.canvas.height : 10
    });
    const [scale, setScale] = useState({ x: 1, y: 1 });

    const imageRef = useRef(null);
    const transformerRef = useRef(null);

    // Setting the size of the image based on the image canvas
    useEffect(() => {
        if (image.canvas) {
            setSize({
                width: image.canvas.width / 2,
                height: image.canvas.height / 2
            })
        }
    }, [image])

    // Selecting the cropped image
    const handleSelectImage = (id) => {
        if (selectedImageId === id) {
            setSelectedImageId("")
            return
        }
        setSelectedImageId(id);
    }

    // Updating image position when dragging across the canvas
    const handleDragMoveImage = (e) => {
        const { x, y } = e.target.position();
        setSelectedImageId(image.id)
        setPosition({ x, y });
    };

    const handleDeleteImage = (id) => {
        const filteredArray = insertedImages.filter((image) => image.id !== id);
        setSelectedImageId("")
        setInsertedImages([...filteredArray]);
    }

    // Attach transformer to the selected image, image is draggable and resizeable after you select it
    useEffect(() => {
        if (transformerRef.current) {
            if (selectedImageId) {
                const selectedNode = stageRef.current.findOne(`#croppedImage-${selectedImageId}`);
                transformerRef.current.nodes([selectedNode]);
                transformerRef.current.getLayer().batchDraw();
            } else {
                transformerRef.current.nodes([]);
            }
        }
    }, [selectedImageId]);
    
    return (
        <>

            {/* Highlight the hovered chat, only when not selected */}
            {hoverImageId === image.id && selectedImageId !== image.id && (
                <Rect
                    x={position.x - 7.5}
                    y={position.y - 7.5}
                    width={(size.width * scale.x) + 15}
                    height={(size.height * scale.y) + 15}
                    cornerRadius={borderRadiusM}
                    fill={hoverImageId === image.id ? accentTransparent : "transparent"}
                />
            )}

            <KonvaImage
                ref={imageRef}
                id={`croppedImage-${image.id}`}
                image={image.canvas}
                width={size.width}
                height={size.height}
                x={position.x}
                y={position.y}
                onClick={() => handleSelectImage(image.id)}
                draggable={selectedImageId === image.id}
                onDragMove={handleDragMoveImage}
                onMouseEnter={() => setHoverImageId(image.id)}
                onMouseLeave={() => setHoverImageId("")}
            />
            
            {/* Transformer handles resizing and rotating */}
            <Transformer
                visible={selectedImageId === image.id}
                ref={transformerRef}
                onTransform={() => {
                    setScale({ x: imageRef.current.scaleX(), y: imageRef.current.scaleY() })
                }}
                padding={5}
                borderDash={[4, 4]}
                borderStrokeWidth={1}
                borderStroke={accent}

                anchorStroke={accent}
                anchorStrokeWidth={1}
                anchorFill={surface}

                rotateAnchorOffset={30}
                rotationSnaps={rotationSnaps}
            >
                <Group
                    visible={selectedImageId === image.id}
                    x={(size.width * scale.x - 20)}
                    y={20}
                    onClick={() => handleDeleteImage(image.id)}
                    onMouseEnter={() => document.getElementById('htmlElement').style = "pointer"}
                >
                    <Circle
                        radius={10}
                        fill={surface}
                        stroke={accent}
                        strokeWidth={1}
                        shadowColor={surface}
                        shadowBlur={10}
                    />
                    <Group>
                        <Line points={[0, 0, 12, 0]} stroke={accent} strokeWidth={2} rotation={-45} x={-4} y={4}/>
                        <Line points={[0, 0, 12, 0]} stroke={accent} strokeWidth={2} rotation={45} x={-4} y={-4}/>
                    </Group>
                </Group>
            </Transformer>
        </>
    )
}
