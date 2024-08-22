import { useEffect, useState } from 'react';
import XIcon from '../../../assets/icons/XIcon';
import './zoomAndSizeSetting.scss';

export default function ZoomAndSizeSetting({ setCanvasExportSize, canvasSize, setCanvasSize }) {
    const [width, setWidth] = useState(900);
    const [height, setHeight] = useState(450);
    const [contentSectionSize, setContentSectionSize] = useState({
        width: 1,
        height: 1
    });

    const contentSection = document.querySelector('.editorContentWrap');

    useEffect(() => {
        const updateContentSectionSize = () => {
            if (contentSection) {
                setContentSectionSize({
                    width: contentSection.offsetWidth,
                    height: contentSection.offsetHeight
                });
            }
        };
    
        // Set initial size
        updateContentSectionSize();
    
        // Update size on window resize
        window.addEventListener('resize', updateContentSectionSize);
    
        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', updateContentSectionSize);
    }, []);

    const handleUpdateWidthAndHeight = (event) => {
        const { name, value } = event.target;
        const newValue = parseInt(value, 10);
        
        // Update local state for width or height
        if (name === 'width') {
            setWidth(newValue);
        } else if (name === 'height') {
            setHeight(newValue);
        }
    
        // Update canvasExportSize
        setCanvasExportSize(prevState => {
            const newCanvasExportSize = {
                ...prevState,
                [name]: newValue,
                x: (canvasSize.width - newValue) / 2,
                y: (canvasSize.height - (name === 'width' ? height : newValue)) / 2
            };
    
            // Adjust canvasSize if necessary
            const { width: contentSectionWidth, height: contentSectionHeight } = contentSectionSize;
    
            setCanvasSize(prevState => {
                if (newCanvasExportSize.width > contentSectionWidth || newCanvasExportSize.height > contentSectionHeight) {
                    return {
                        width: Math.max(newCanvasExportSize.width, contentSectionWidth) + 100,
                        height: Math.max(newCanvasExportSize.height, contentSectionHeight) + 100
                    };
                } else {
                    return {
                        width: contentSectionWidth,
                        height: contentSectionHeight
                    };
                }
            });
    
            return newCanvasExportSize;
        });
    };



    return (
        <div className='zoomAndSizeWrap'>
            <form className="sizeSettingForm">
                <input max={1920} type='number' id='width' name='width' value={width} onChange={handleUpdateWidthAndHeight} />
                <XIcon />
                <input type='number' id='height' name='height' value={height} onChange={handleUpdateWidthAndHeight} />
            </form>
        </div>
    );
}
