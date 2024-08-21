import ButtonAccent from '../../../buttonAccent/ButtonAccent'
import './canvasControls.scss'
import TextIcon from '../../../../assets/icons/TextIcon';
import ImageIcon from '../../../../assets/icons/ImageIcon';
import { v4 as uuid } from 'uuid';
import DownloadIcon from '../../../../assets/icons/DownloadIcon';
import { useContext } from 'react';
import { ImageEditorContext } from '../../ImageEditor';
import DeleteIcon from '../../../../assets/icons/DeleteIcon';
import ZoomAndSizeSetting from '../../zoomAndSizeSetting/ZoomAndSizeSetting';

export default function CanvasControls({handleExport, setChats, canvasExportSize, id, setSelectedChatId}) {
  const { handleFileDelete } = useContext(ImageEditorContext);

  const handleCreateChat = () => {
    const newId = uuid();
    const chatObj = {
      id: newId,
      chatValue: "",
      chatCanvas: null,
      visible: true,
      position: {
        x: canvasExportSize.x,
        y: canvasExportSize.y
      }
    }
    setSelectedChatId(newId)
    setChats(prev => [...prev, chatObj])
  }
  return (
    <div className='canvasControlsWrap'>
      <div className='controlGroup'>
        <ButtonAccent title="Download Edited" variant="canvasControl" onClick={handleExport}>
            <DownloadIcon />
        </ButtonAccent>
        <ButtonAccent outlined={true} variant="canvasControl" iconOnly={true} onClick={() => handleFileDelete(id)}>
            <DeleteIcon />
        </ButtonAccent>
      </div>
      <div className="controlGroup">
          <ZoomAndSizeSetting />
      </div>
      <div className='controlGroup'>
        <ButtonAccent title="Add Chat" outlined={true} rounded={true} variant="canvasControl" onClick={handleCreateChat}>
            <TextIcon />
        </ButtonAccent>
        <ButtonAccent title="Add Image" disabled={true} rounded={true} variant="canvasControl">
            <ImageIcon />
        </ButtonAccent>
        <ButtonAccent title="Blur" disabled={true} rounded={true} variant="canvasControl">
            {/* <ImageIcon /> */}
        </ButtonAccent>
      </div>
    </div>
  )
}
