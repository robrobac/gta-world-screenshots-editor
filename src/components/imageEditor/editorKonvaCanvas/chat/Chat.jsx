import { useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
import { accent } from "../../../../sass/_variables";

export default function Chat({chat, canvasExportSize, stageRef, selectedChatId, setSelectedChatId}) {
    const [position, setPosition] = useState({ x: canvasExportSize.x, y: canvasExportSize.y });
    const [size, setSize] = useState({
        width: chat.chatCanvas ? chat.chatCanvas.width : 100,
        height: chat.chatCanvas ? chat.chatCanvas.height : 100
    });
    const transformerRef = useRef(null);

    useEffect(() => {
        console.log(chat)
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
                x: Math.max(leftBoundary, Math.min(rightBoundary, x)),
                y: Math.max(topBoundary, Math.min(bottomBoundary, y)),
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
        <KonvaImage
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
        />
        <Transformer borderDash={[4, 4]} borderStroke={accent} borderStrokeWidth={3} rotateEnabled={false} resizeEnabled={false} ref={transformerRef} />
        </>
    )
}
