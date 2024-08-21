import { Image as KonvaImage, Layer, Rect, Stage, Transformer } from "react-konva";
import './editorKonvaCanvas.scss';
import CanvasControls from "./canvasControls/CanvasControls";
import UploadedImageScale from "./uploadedImageScale/UploadedImageScale";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ImageEditorContext } from "../ImageEditor";
import { useWindowSize } from "../../../hooks/useWindowSize";
import ChatEditor from "./chatEditor/ChatEditor";
import { accent, background, onSurfaceDark, surface } from "../../../sass/_variables";

export const KonvaCanvasContext = createContext();

console.log(background)


export default function EditorKonvaCanvas({file}) {
    const { activeFileId } = useContext(ImageEditorContext);
    const { windowWidth, windowHeight } = useWindowSize();

    const stageRef = useRef(null)
    const transformerRef = useRef(null);

    const [image, setImage] = useState(null);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [imageScale, setImageScale] = useState(1.00);

    const [chats, setChats] = useState([])
    const [selectedChatId, setSelectedChatId] = useState("")

    const contentSection = document.querySelector('.editorContentWrap');

    // CREATING IMAGE IN THE CANVAS FROM THE GIVEN FILE
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
    // Also if there's chats, calculate new chat position on canvasSize change
    useEffect(() => {
        const { width, height } = canvasExportSize;

        const prevCanvasExportX = canvasExportSize.x
        const prevCanvasExportY = canvasExportSize.y

        const newCanvasExportX = (canvasSize.width - width) / 2
        const newCanvasExportY = (canvasSize.height - height) / 2

        setCanvasExportSize({
            width: width,
            height: height,
            x: newCanvasExportX,
            y: newCanvasExportY,
        });

        if (chats.length > 0) {
            setChats(prevChats => prevChats.map((chat) => {
                const prevChatX = chat.position.x
                const prevChatY = chat.position.y

                const offsetX = prevChatX - prevCanvasExportX
                const offsetY = prevChatY - prevCanvasExportY
    
                const newPosition = {
                    x: newCanvasExportX + offsetX,
                    y: newCanvasExportY + offsetY,
                }
    
                return {
                    ...chat,
                    position: newPosition
                }
            }))
        }

        // const contentSection = document.querySelector('.editorContentWrap');
        // contentSection.style = `min-width: ${width + 50}px; min-height: ${height + 50}px;`;
    }, [canvasSize]);

    // UPDATING IMAGE POSITION WHEN DRAGGING ACROSS THE CANVAS
    const handleDragMoveImage = (e) => {
        const { x, y } = e.target.position();
        setImagePosition({ x, y });
    };
    // UPDATING CHAT POSITION WHEN DRAGGING ACROSS THE CANVAS
    const handleDragMoveChat = (e, id) => {
        const { x, y } = e.target.position();

        setChats(prevChats => prevChats.map(chat => 
            chat.id === id ? { ...chat, position: { x, y }, size: {width: e.target.width(), height: e.target.height()} } : chat
        ))
    };
    // Function to constrain the drag within boundary
    const getDragBoundFunc = (chatSize) => {
        return (pos) => {
            const { x, y } = pos;
            const { x: exportX, y: exportY, width, height } = canvasExportSize;
            
            // Calculate boundaries taking into account the size of the element
            const leftBoundary = exportX;
            const rightBoundary = exportX + width - chatSize.width;
            const topBoundary = exportY;
            const bottomBoundary = exportY + height - chatSize.height;
            
            return {
                x: Math.max(leftBoundary, Math.min(rightBoundary, x)),
                y: Math.max(topBoundary, Math.min(bottomBoundary, y)),
            };
        };
    };

    // EXPORTING THE IMAGE
    const handleExport = () => {
        setSelectedChatId("")
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

    // HANDLING CHAT SELECTION
    const handleSelectChat = (id) => {
        if (selectedChatId === id) {
            setSelectedChatId("")
            return
        }
        setSelectedChatId(id);
    }

    // Attach transformer to the selected chat
    useEffect(() => {
        if (transformerRef.current) {
            if (selectedChatId) {
                const selectedNode = stageRef.current.findOne(`#chat-${selectedChatId}`);
                transformerRef.current.nodes([selectedNode]);
                transformerRef.current.getLayer().batchDraw();
            } else {
                transformerRef.current.nodes([]);
            }
        }
    }, [selectedChatId, chats]);

    return (
        <div className={`konvaCanvasWrap ${activeFileId === image?.id ? 'konvaCanvasActive' : ''}`}>
            {chats.map((chat) => (
                <ChatEditor key={chat.id} id={chat.id} setChats={setChats} canvasExportSize={canvasExportSize} canvasSize={canvasSize} selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId}/>
            ))}
            <CanvasControls handleExport={handleExport} setChats={setChats} canvasExportSize={canvasExportSize} setCanvasExportSize={setCanvasExportSize} canvasSize={canvasSize} setCanvasSize={setCanvasSize} id={file.id} setSelectedChatId={setSelectedChatId}/>
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
                <Layer>
                    <Rect opacity={1} listening={false} fill={onSurfaceDark} x={canvasExportSize.x} y={canvasExportSize.y} width={canvasExportSize.width} height={canvasExportSize.height} />
                </Layer>
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
                    {chats?.map((chat) => (
                        <KonvaImage 
                            key={chat.id}
                            id={`chat-${chat.id}`}
                            image={chat.chatCanvas}
                            x={chat.position.x}
                            y={chat.position.y}
                            draggable={selectedChatId === chat.id}
                            dragBoundFunc={getDragBoundFunc(chat.size)}
                            onDragMove={(e) => handleDragMoveChat(e, chat.id)}
                            onClick={() => handleSelectChat(chat.id)}
                        />
                    ))}
                    {selectedChatId && (
                        <Transformer borderDash={[4, 4]} borderStroke={accent} borderStrokeWidth={3} rotateEnabled={false} resizeEnabled={false} ref={transformerRef} />
                    )}
                    
                </Layer>
                <Layer>
                    <Rect opacity={0.9} listening={false} fill={surface} x={0} y={0} width={canvasExportSize.x} height={canvasSize.height} />
                    <Rect opacity={0.9} listening={false} fill={surface} x={canvasSize.width - canvasExportSize.x} y={0} width={canvasExportSize.x} height={canvasSize.height} />
                    <Rect opacity={0.9} listening={false} fill={surface} x={canvasExportSize.x} y={0} width={canvasExportSize.width} height={canvasExportSize.y} />
                    <Rect opacity={0.9} listening={false} fill={surface} x={canvasExportSize.x} y={canvasSize.height - canvasExportSize.y} width={canvasExportSize.width} height={canvasExportSize.y} />
                </Layer>
            </Stage>
        </div>
    )
}
