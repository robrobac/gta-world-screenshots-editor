import ButtonAccent from '../../../buttonAccent/ButtonAccent'
import './canvasControls.scss'
import PlusIcon from '../../../../assets/icons/PlusIcon';
import TextIcon from '../../../../assets/icons/TextIcon';
import ImageIcon from '../../../../assets/icons/ImageIcon';
import ZoomAndSizeSetting from '../../../zoomAndSizeSetting/ZoomAndSizeSetting';

export default function CanvasControls({handleExport}) {
  return (
    <div className='canvasControlsWrap'>
      <div className='controlGroup'>
        <ButtonAccent title="Add Text" rounded={true} variant="canvasControl">
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
