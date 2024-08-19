import { useEffect, useState } from 'react'
import UploadImages from './uploadImages/UploadImages'
import ImageSelect from './imageSelect/ImageSelect';
import CanvasEditor from './canvasEditor/CanvasEditor';
import TextEditor from './textEditor/TextEditor';

export default function Editor() {
    const [backgroundImages, setBackgroundImages] = useState([]);
    const [activeBackgroundImage, setActiveBackgroundImage] = useState('')

    useEffect(() => {
        if (activeBackgroundImage == "" && backgroundImages.length > 0) {
            setActiveBackgroundImage(backgroundImages[0].id)
        }
    }, [backgroundImages])
    console.log("Background Images:", backgroundImages)

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
        const SidebarSection = document.querySelector('.editorSidebarWrap');
        const header = document.querySelector('.headerMain')
        const footer = document.querySelector('.footerMain')
        console.log(contentSection.offsetWidth, contentSection.offsetHeight)
        setCanvasSize({
            width: window.innerWidth,
            height: canvasSize.height
        })
    }, [])

    useEffect(() => {
        const { width, height } = canvasExportSize;
        setCanvasExportSize({
            width: width,
            height: height,
            x: (canvasSize.width - width) / 2,
            y: (canvasSize.height - height) / 2,
        });
    }, [canvasSize]);
    
    
    return (
        <div>
            <h1>Editor</h1>
            {backgroundImages.map((backgroundImage) => (
                <CanvasEditor key={backgroundImage.id} id={backgroundImage.id} image={backgroundImage.image} activeId={activeBackgroundImage} canvasSize={canvasSize} canvasExportSize={canvasExportSize}/>
            ))}
            <UploadImages setBackgroundImages={setBackgroundImages} setAtiveBackgroundImage={setActiveBackgroundImage}/>
            <ImageSelect backgroundImages={backgroundImages} setBackgroundImages={setBackgroundImages} activeBackgroundImage={activeBackgroundImage} setActiveBackgroundImage={setActiveBackgroundImage}/>
        </div>
    )
}
