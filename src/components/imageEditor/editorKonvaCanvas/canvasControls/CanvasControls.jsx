import ButtonAccent from '../../../buttonAccent/ButtonAccent'
import './canvasControls.scss'
import TextIcon from '../../../../assets/icons/TextIcon';
import ImageIcon from '../../../../assets/icons/ImageIcon';
import ZoomAndSizeSetting from '../../../zoomAndSizeSetting/ZoomAndSizeSetting';
import AddText from '../addText/AddText';
import { v4 as uuid } from 'uuid';

export default function CanvasControls({handleExport, setChats, canvasExportSize}) {

  const handleCreateChat = () => {
    const chatObj = {
      id: uuid(),
      chatValue: "",
      chatCanvas: null,
      visible: true,
      position: {
        x: canvasExportSize.x,
        y: canvasExportSize.y
    }
    }
    setChats(prev => [...prev, chatObj])
  }
  return (
    <div className='canvasControlsWrap'>
      <div className='controlGroup'>
        <ButtonAccent title="Add Chat" rounded={true} variant="canvasControl" onClick={handleCreateChat}>
            <TextIcon />
        </ButtonAccent>
        <ButtonAccent title="Insert Image" rounded={true} variant="canvasControl">
            <ImageIcon />
        </ButtonAccent>
      </div>
      <div className='controlGroup'>
        <ZoomAndSizeSetting />
        <button onClick={handleExport}>Export Full Canvas</button>
      </div>
    </div>
  )
}
