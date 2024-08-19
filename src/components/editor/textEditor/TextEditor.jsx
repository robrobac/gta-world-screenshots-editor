import html2canvas from 'html2canvas';
import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import useDebounce from '../../../hooks/useDebounce';

export default function TextEditor({id}) {
    const [value, setValue] = useState('');
    const [canvasText, setCanvasText] = useState(null)

    const canvasContainerRef = useRef(null);

    // Debounced value
    const debouncedValue = useDebounce(value, 2000);

    useEffect(() => {
        if (debouncedValue) {
            const editor = document.querySelector(`.quill-${id} .ql-editor`);
            html2canvas(editor, {
                logging: false,
                backgroundColor: "black",
            }).then((canvas) => {
                setCanvasText(canvas);
                canvasContainerRef.current.append(canvas);
            });
        }
    }, [debouncedValue, id]);

    console.log("html:", value)
    console.log("canvasText:", canvasText)

    const modules = {
        toolbar: [
          [{ 'size': ['14px', '16px', '18px'] }],
          [{ 'color': [] }, { 'background': [] }],
        ],
      };

      

    return (
        <div>
            <ReactQuill modules={modules} className={`quill-${id}`} theme="snow" value={value} onChange={setValue} />
            <div ref={canvasContainerRef} />
        </div>
        
    )
}
