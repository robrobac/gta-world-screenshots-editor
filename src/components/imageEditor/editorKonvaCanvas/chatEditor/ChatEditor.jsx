import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import ReactQuill from "react-quill";
import './chatEditor.scss'
import DragIndicatorIcon from "../../../../assets/icons/DragIndicatorIcon";
import useDebounce from "../../../../hooks/useDebounce";
import html2canvas from "html2canvas";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";

const toolbarOptions = [  
    [{ 'size': ['small', false, 'large'] }],
  
    [{ 'color': ["red", "green", "blue"] }, { 'background': ["red", "green", "blue"] }],
  
    ['clean']
  ];

const modules = {
    toolbar: toolbarOptions,
}

const formats = ["size", "background", "color"]


export default function ChatEditor({currentChat, setChats, canvasExportSize, selectedChatId, setSelectedChatId}) {
    const [value, setValue] = useState(currentChat.chatValue)
    console.log("valueeee", value)

    // DEBOUNCING THE EDITOR VALUE
    const debouncedValue = useDebounce(value, 200);
    // THEN CREATING A CANVAS FROM THAT VALUE
    useEffect(() => {
        if (debouncedValue) {
          const editor = document.querySelector(`.quill-${currentChat.id} .ql-editor`);
          if (!editor) return;
    
          editor.style.width = `fit-content`;
    
          html2canvas(editor, {
            logging: false,
            backgroundColor: "transparent",
            willReadFrequently: true
          }).then((canvas) => {
    
            setChats((prevChats) => {
              if (!prevChats) return []; // Handle case where prevChats is undefined
    
              return prevChats.map((chat) => {
                if (chat.id === currentChat.id) {
                  return { ...chat, chatCanvas: canvas, chatValue: debouncedValue };
                }
                return chat; // Ensure that other chats are returned unchanged
              });
            });
          });
    
          editor.style.width = `unset`;
        }
      }, [debouncedValue]);


    const handleDeleteChat = (id) => {
        setChats(prevChats => prevChats.filter(chat => chat.id !== id));
        setSelectedChatId("")
    }

    return (
        <Draggable
            handle=".handle"
            defaultPosition={{ x: 16, y: 66 }}
            bounds="parent"
        >
            <div className={`chatEditorWrap ${selectedChatId === currentChat.id && "selectedEditor"}`}>
                <ReactQuill
                    modules={modules}
                    formats={formats}
                    className={`quill-${currentChat.id}`}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                />
                <div className="chatEditorControls left">
                    <div className="chatControl dragChat handle">
                        <DragIndicatorIcon />
                    </div>
                </div>
                <div className="chatEditorControls right">
                    {selectedChatId === currentChat.id && (
                        <div className="chatControl deleteChat" onClick={() => handleDeleteChat(currentChat.id)}>
                            <DeleteIcon />
                        </div>
                    )}
                </div>
            </div>
        </Draggable>
    )
}
