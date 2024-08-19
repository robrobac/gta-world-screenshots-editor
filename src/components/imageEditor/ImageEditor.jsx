import { createContext, useEffect, useState } from 'react';
import EditorContent from './editorContent/EditorContent';
import EditorSidebar from './editorSidebar/EditorSidebar';
import './imageEditor.scss';
import { useWindowSize } from '../../hooks/useWindowSize';

export const ImageEditorContext = createContext();

export default function ImageEditor() {
    const {windowWidth, windowHeight} = useWindowSize();
    const [uploadedImages, setUploadedImages] = useState([]);
    const [activeUploadedImage, setActiveUploadedImage] = useState('')
    console.log(uploadedImages)

    
    const [canvasSize, setCanvasSize] = useState({
        width: 1200,
        height: 700
    });
    const [canvasExportSize, setCanvasExportSize] = useState({
        width: 900,
        height: 450,
        x: (canvasSize.width - 900) / 2,
        y: (canvasSize.height - 450) / 2,
    });
    useEffect(() => {
        const contentSection = document.querySelector('.editorContentWrap');
        setCanvasSize({
            width: contentSection.offsetWidth,
            height: contentSection.offsetHeight
        })
    }, [windowWidth, windowHeight])

    useEffect(() => {
        const { width, height } = canvasExportSize;
        setCanvasExportSize({
            width: width,
            height: height,
            x: (canvasSize.width - width) / 2,
            y: (canvasSize.height - height) / 2,
        });
    }, [canvasSize]);

    useEffect(() => {
        if (activeUploadedImage == "" && uploadedImages.length > 0) {
            setActiveUploadedImage(uploadedImages[0].id)
        }
    }, [uploadedImages])

    


    return (
        <ImageEditorContext.Provider
            value={{
                uploadedImages,
                setUploadedImages,
                activeUploadedImage,
                setActiveUploadedImage,
                canvasSize,
                canvasExportSize,
            }}
        >
            <main className='imageEditorWrap'>
                <EditorContent />
                <EditorSidebar />
            </main>
        </ImageEditorContext.Provider>
    )
}
