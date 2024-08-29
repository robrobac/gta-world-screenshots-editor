import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import ReactQuill from "react-quill";
import './chatEditor.scss'
import DragIndicatorIcon from "../../../../assets/icons/DragIndicatorIcon";
import useDebounce from "../../../../hooks/useDebounce";
import html2canvas from "html2canvas";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";
import CollapseIcon from "../../../../assets/icons/CollapseIcon";
import ExpandIcon from "../../../../assets/icons/ExpandIcon";
import "react-quill/dist/quill.snow.css";
import { inSectionPadding } from "../../../../sass/_variables";
import { chatColorsArray } from "../../../../lib/chatFormats";


// Quill Editor options
const toolbarOptions = [  
  [{ 'size': ['small', false, 'large'] }],
    [
      {
        'color': [
          ...chatColorsArray(),
          "black",
          "transparent"
        ]
      },
      {
        'background': [
          ...chatColorsArray(),
          "black",
          "transparent"
        ]
      }
    ],
    ['clean'],
    ['redirect']
];

// Custom handler for the toolbar redirect button
const handleRedirect = () => {
  window.open("/parser", "_blank");
};

const modules = {
  toolbar: {
    container: toolbarOptions,
    handlers: {
      redirect: handleRedirect, // Attach the custom handler
    },
  },
};

const formats = ["size", "background", "color"]

export default function ChatEditor({ currentChat, setChats, selectedChatId, setSelectedChatId, hoverChatId, setHoverChatId, canvasSize }) {
  const [value, setValue] = useState(currentChat.chatValue)
  console.log(value)
  const [chatEditorSize, setChatEditorSize] = useState({ width: 0, height: 0 })
  const [chatEditorBounds, setChatEditorBounds] = useState({top: 0, left: 0, right: 0, bottom: 0})
  const [visible, setVisible] = useState(true)

  console.log([...chatColorsArray()])

  // Adding text into custom quill toolbar Button
  useEffect(() => {
    const redirectButton = document.querySelectorAll('.ql-redirect');
    if (redirectButton) {
      redirectButton.forEach((button) => {
        button.innerHTML = 'Open Chatlog Parser';
      })
    }
  }, [currentChat]);

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
        willReadFrequently: true,
        scale: 2,
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

  // DELETING A CHAT
  const handleDeleteChat = (id) => {
      setChats(prevChats => prevChats.filter(chat => chat.id !== id));
      setSelectedChatId("")
  }

  // HANDLE CLICK INSIDE EDITOR
  useEffect(() => {
    const handleClick = () => {
      // Action when clicking inside the editor
      setSelectedChatId(currentChat.id); // Example action: selecting the chat editor
    };

    const editorElement = document.querySelector(`.quill-${currentChat.id} .ql-editor`);
    if (editorElement) {
      editorElement.addEventListener('click', handleClick);
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener('click', handleClick);
      }
    };
  }, [currentChat.id, setSelectedChatId]);

  // SETTING CHAT EDITOR SIZE FOR CALCULATING BOUNDS
  useEffect(() => {
    const chatEditor = document.querySelector(`.chatEditorWrap${currentChat.id}`);
    setChatEditorSize({
      width: chatEditor.offsetWidth,
      height: chatEditor.offsetHeight
    })
  }, [currentChat.id, value, visible])

  // SETTING CHAT EDITOR BOUNDS FOR DRAGGING
  useEffect(() => {
    const contentSection = document.querySelector('.editorContentWrap');

    setChatEditorBounds({
      top: 66,
      left: (contentSection.offsetWidth - chatEditorSize.width - inSectionPadding) * -1,
      right: inSectionPadding * -1,
      bottom: contentSection.offsetHeight - chatEditorSize.height - 50
    })
  }, [chatEditorSize, canvasSize, visible])

  return (
    <Draggable
        handle=".handle"
        defaultPosition={{ x: -16, y: 66 }}
        bounds={{ top: chatEditorBounds.top, left: chatEditorBounds.left, right: chatEditorBounds.right, bottom: chatEditorBounds.bottom }}
        onStart={() => setSelectedChatId(currentChat.id)}
    >
      <div
        className={`
          chatEditorWrap
          chatEditorWrap${currentChat.id}
          ${selectedChatId === currentChat.id && "selectedEditor"}
          ${hoverChatId === currentChat.id && currentChat.id !== selectedChatId && "hoverEditor"}
          ${!visible && "hiddenEditor"}
        `}
        onMouseEnter={() => setHoverChatId(currentChat.id)}
        onMouseLeave={() => setHoverChatId("")}
      >
          <ReactQuill
              modules={modules}
              formats={formats}
              className={`quill-${currentChat.id}`}
              theme="snow"
              value={value}
              onChange={setValue}
          />
          <div className="chatEditorControls right">
              {selectedChatId === currentChat.id && (
                  <div className="chatControl deleteChat" onClick={() => handleDeleteChat(currentChat.id)}>
                      <DeleteIcon />
                  </div>
              )}
              <div className="chatControl visibilityChat" onClick={() => setVisible(!visible)}>
                  {visible ? <CollapseIcon /> : <ExpandIcon />}
              </div>
              <div className="chatControl dragChat handle">
                  <DragIndicatorIcon />
              </div>
          </div>
      </div>
    </Draggable>
  )
}
