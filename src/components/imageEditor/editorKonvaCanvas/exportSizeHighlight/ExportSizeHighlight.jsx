import { Layer, Rect } from "react-konva";
import { onSurfaceDark } from "../../../../sass/_variables";

export default function ExportSizeHighlight({canvasExportSize}) {
    return (
        <Layer>
            <Rect
            opacity={1} 
            listening={false} 
            fill={onSurfaceDark} 
            x={canvasExportSize.x} 
            y={canvasExportSize.y} 
            width={canvasExportSize.width} 
            height={canvasExportSize.height}/>
        </Layer>
    )
}
