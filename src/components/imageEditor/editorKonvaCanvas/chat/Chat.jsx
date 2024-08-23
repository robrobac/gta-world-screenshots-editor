import { useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Rect, Transformer } from "react-konva";
import { accent, accentTransparent, borderRadiusM } from "../../../../sass/_variables";

export default function Chat({chat, canvasExportSize, stageRef, selectedChatId, setSelectedChatId, hoverChatId, setHoverChatId}) {
    const [position, setPosition] = useState({ x: canvasExportSize.x + 4, y: canvasExportSize.y + 4 });
    const [size, setSize] = useState({
        width: chat.chatCanvas ? chat.chatCanvas.width : 100,
        height: chat.chatCanvas ? chat.chatCanvas.height : 100
    });
    const chatRef = useRef(null);
    const transformerRef = useRef(null);

    useEffect(() => {
        if (chat.chatCanvas) {
            setSize({
                width: chat.chatCanvas.width,
                height: chat.chatCanvas.height
            })
        }
    }, [chat])

    // HANDLING CHAT SELECTION
    const handleSelectChat = (id) => {
        if (selectedChatId === id) {
            setSelectedChatId("")
            return
        }
        setSelectedChatId(id);
    }

    // UPDATING CHAT POSITION WHEN DRAGGING ACROSS THE CANVAS
    const handleDragMoveChat = (e) => {
        const { x, y } = e.target.position();
        setSelectedChatId(chat.id)
        setPosition({ x, y });
    };

    // Function to constrain the drag within boundary
    const getDragBoundFunc = (chatWidth, chatHeight) => {
        return (pos) => {
            const { x, y } = pos;
            const { x: exportX, y: exportY, width, height } = canvasExportSize;
            
            // Calculate boundaries taking into account the size of the element
            const leftBoundary = exportX;
            const rightBoundary = exportX + width - chatWidth;
            const topBoundary = exportY;
            const bottomBoundary = exportY + height - chatHeight;
            
            return {
                x: Math.max(leftBoundary + 4, Math.min(rightBoundary - 4, x + 4)),
                y: Math.max(topBoundary + 4, Math.min(bottomBoundary - 4, y + 4)),
            };
        };
    };

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
    }, [selectedChatId]);

    return (
        <>

            {selectedChatId === chat.id && (
                <Rect
                    x={position.x - 2.5}
                    y={position.y - 2.5}
                    width={size.width + 5}
                    height={size.height + 5}
                    cornerRadius={borderRadiusM}
                    fill={hoverChatId === chat.id ? "rgba(0, 0, 0, 0.3)" : "transparent"}
                    stroke={accent}
                    strokeWidth={3}
                    dash={[5, 5]} // Apply dashed border on hover
                />
            )}
            {hoverChatId === chat.id && selectedChatId !== chat.id && (
                <Rect
                    x={position.x - 2.5}
                    y={position.y - 2.5}
                    width={size.width + 5}
                    height={size.height + 5}
                    cornerRadius={borderRadiusM}
                    fill={hoverChatId === chat.id ? accentTransparent : "transparent"}
                />
            )}
            <KonvaImage
                ref={chatRef}
                width={size.width}
                height={size.height}
                key={chat.id}
                id={`chat-${chat.id}`}
                image={chat.chatCanvas}
                x={position.x}
                y={position.y}
                draggable={selectedChatId === chat.id}
                dragBoundFunc={getDragBoundFunc(size.width, size.height)}
                onDragMove={handleDragMoveChat}
                onClick={() => handleSelectChat(chat.id)}
                
                onMouseEnter={() => setHoverChatId(chat.id)}
                onMouseLeave={() => setHoverChatId("")}
            />
            <Transformer
                borderStroke={"transparent"}
                rotateEnabled={false}
                resizeEnabled={false}
                ref={transformerRef}
                
            />
        </>
    )
}
