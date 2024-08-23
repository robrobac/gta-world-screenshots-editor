import { Layer, Rect } from 'react-konva'
import { surface } from '../../../../sass/_variables'

export default function BoundsOverlay({canvasSize, canvasExportSize}) {
    return (
        <Layer> 
            <Rect opacity={0.9} listening={false} fill={surface} x={0} y={0} width={canvasExportSize.x} height={canvasSize.height} />
            <Rect opacity={0.9} listening={false} fill={surface} x={canvasSize.width - canvasExportSize.x} y={0} width={canvasExportSize.x} height={canvasSize.height} />
            <Rect opacity={0.9} listening={false} fill={surface} x={canvasExportSize.x} y={0} width={canvasExportSize.width} height={canvasExportSize.y} />
            <Rect opacity={0.9} listening={false} fill={surface} x={canvasExportSize.x} y={canvasSize.height - canvasExportSize.y} width={canvasExportSize.width} height={canvasExportSize.y} />
        </Layer>
    )
}
