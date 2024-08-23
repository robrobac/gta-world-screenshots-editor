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

export default function CanvasControls({handleExport, setChats, id, setSelectedChatId, canvasSize, setCanvasSize, setCanvasExportSize }) {
  const { handleFileDelete } = useContext(ImageEditorContext);

  // Create a new chat with sample text
  // For each chat there will be rendered a chat editor and a chat canvas
  const handleCreateChat = () => {
    const newId = uuid();

    const chatObj = {
      id: newId,
      chatValue: "<p>Sample Text says: Hello I am a sample text.</p><p>Another Text says: No shit Sherlock.</p>",
      chatCanvas: null,
    }

    setChats(prev => [...prev, chatObj])
    setSelectedChatId(newId)
  }

  return (
    <div className='canvasControlsWrap'>

      <div className='controlGroup'>
        {/* Download Button */}
        <ButtonAccent title="Download Edited" variant="canvasControl" onClick={handleExport}>
            <DownloadIcon />
        </ButtonAccent>
        {/* Delete Button */}
        <ButtonAccent outlined={true} variant="canvasControl" iconOnly={true} onClick={() => handleFileDelete(id)}>
            <DeleteIcon />
        </ButtonAccent>
      </div>

      <div className="controlGroup">
          {/* Canvas Export size settings */}
          <ZoomAndSizeSetting setCanvasExportSize={setCanvasExportSize} canvasSize={canvasSize} setCanvasSize={setCanvasSize}/>
      </div>

      <div className='controlGroup'>
        {/* Add new chat Button */}
        <ButtonAccent title="Add Chat" outlined={true} rounded={true} variant="canvasControl" onClick={handleCreateChat}>
            <TextIcon />
        </ButtonAccent>
        {/* Add image button */}
        <ButtonAccent title="Add Image" disabled={true} rounded={true} variant="canvasControl">
            <ImageIcon />
        </ButtonAccent>
        {/* Add blur button */}
        <ButtonAccent title="Blur" disabled={true} rounded={true} variant="canvasControl" />
      </div>

    </div>
  )
}
