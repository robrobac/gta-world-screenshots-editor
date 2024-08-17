import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";

export default function CanvasEditor({image, id, activeId, canvasSize, canvasExportSize}) {

  return (
    <Stage width={canvasSize.width} height={canvasSize.height} className={`${activeId === id ? 'active' : ''} visibleImage`} style={{maxWidth: "100%", overflow: "auto", backgroundColor: "white"}}>
        <Layer>
            {image && (
                <KonvaImage
                    // ref={imageRef}
                    image={image}
                    // scaleX={imageScale}
                    // scaleY={imageScale}
                    // x={imagePosition.x}
                    // y={imagePosition.y}
                    draggable
                    // onDragMove={handleDragMove}
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
  )
}
