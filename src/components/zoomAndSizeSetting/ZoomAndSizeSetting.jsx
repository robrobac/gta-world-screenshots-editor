import MinusIcon from '../../assets/icons/MinusIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import XIcon from '../../assets/icons/XIcon';
import './zoomAndSizeSetting.scss';

export default function ZoomAndSizeSetting() {
    return (
        <div className='zoomAndSizeWrap'>
            <div className="sizeSetting">
                <p>900px</p>
                <XIcon />
                <p>600px</p>
            </div>
            <div className="zoomAndSizeDivider" />
            <div className="zoomSetting">
                <PlusIcon />
                <p>100%</p>
                <MinusIcon />
            </div>
        </div>
    )
}
