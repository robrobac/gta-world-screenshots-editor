import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import ReactQuill from "react-quill";
import './chatEditor.scss'
import DragIndicatorIcon from "../../../../assets/icons/DragIndicatorIcon";
import useDebounce from "../../../../hooks/useDebounce";
import html2canvas from "html2canvas";

const toolbarOptions = [  
    [{ 'size': ['small', false, 'large'] }],
  
    [{ 'color': ["red", "green", "blue"] }, { 'background': ["red", "green", "blue"] }],
  
    ['clean']
  ];

const modules = {
    toolbar: toolbarOptions,
}

const formats = ["size", "background", "color"]


export default function ChatEditor({id, setChats, canvasExportSize}) {
    const [value, setValue] = useState("")
    const [canvasValue, setCanvasValue] = useState(null)

    const debouncedValue = useDebounce(value, 1000); // Creating a canvas from the editor HTML

    useEffect(() => {
        if (debouncedValue) {
            const editor = document.querySelector(`.quill-${id} .ql-editor`);
            editor.style.width = `fit-content`;

            html2canvas(editor, {
                logging: false,
                backgroundColor: "transparent",
            }).then((canvas) => {
                setCanvasValue(canvas);
            });

            editor.style.width = `unset`;
        }
    }, [debouncedValue, id]);

    useEffect(() => {
        if (value) {
            setChats((prev) => {
                // CHECKING THE EXISTING OBJECT ID
                const existingIndex = prev.findIndex(chat => chat.id === id);
    
                const newTextObj = {
                    id: id,
                    chatValue: value,
                    chatCanvas: canvasValue,
                    size: {
                        width: canvasValue.width,
                        height: canvasValue.height
                    }
                };
    
                // IF NOT FOUND, ADD THE NEW OBJECT WITH POSITION
                if (existingIndex === -1) {
                    newTextObj.position = {
                        x: canvasExportSize.x,
                        y: canvasExportSize.y
                    };
                    return [...prev, newTextObj];
                }
    
                // IF FOUND, UPDATE THE EXISTING OBJECT WITHOUT POSITION
                const updatedTexts = [...prev];
                updatedTexts[existingIndex] = {
                    ...updatedTexts[existingIndex],
                    ...newTextObj
                };
                return updatedTexts;
            });
        }
    }, [canvasValue]);

    return (
        <Draggable handle=".handle" defaultPosition={{ x: 0, y: 50 }} bounds="parent">
            <div className='chatEditorWrap'>
                <ReactQuill modules={modules} formats={formats} className={`quill-${id}`} theme="snow" value={value} onChange={setValue} />
                <div className="chatEditorControls">
                    <div className="dragControl handle">
                        <DragIndicatorIcon />
                    </div>
                </div>
            </div>
        </Draggable>
    )
}
