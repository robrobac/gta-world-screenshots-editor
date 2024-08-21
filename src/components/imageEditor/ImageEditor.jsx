import { createContext, useEffect, useState } from 'react';
import EditorContent from './editorContent/EditorContent';
import EditorSidebar from './editorSidebar/EditorSidebar';
import './imageEditor.scss';
import { v4 as uuid } from 'uuid';

export const ImageEditorContext = createContext();

export default function ImageEditor() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [activeFileId, setActiveFileId] = useState("")
    console.log("uploadedFiles", uploadedFiles)
    console.log("activeFileId", activeFileId)

    // FILES UPLOAD FUNCTION
    const handleUploadFiles = (e) => {
        if (e.target.files.length > 0) {
            console.log("e.target.files", e.target.files)
            Array.from(e.target.files).forEach((file) => {
                const fileObj = {
                    id: uuid(),
                    imageUrl: URL.createObjectURL(file), // Saving this to use in the list of uploaded files.
                    file // Will use for creating a new image state for each uploaded file, prepared for canvas
                }
                setUploadedFiles(prev => [...prev, fileObj]);
            })
        }
    }

    // SELECTING FILE FUNCTION
    const handleFileSelect = (id) => {
        setActiveFileId(id);
    }

    // DELETING FILE FUNCTION
    const handleFileDelete = (id) => {
        const deleteIndex = uploadedFiles.findIndex((file) => file.id === id);

        if (uploadedFiles.length === 1) {
            setActiveFileId('');
        } else if (deleteIndex == 0 && activeFileId === id) {
            setActiveFileId(uploadedFiles[1].id);
            
        } else if (activeFileId === id) {
            setActiveFileId(uploadedFiles[deleteIndex - 1].id);
            
        }
        const filteredArray = uploadedFiles.filter((file) => file.id !== id);
        setUploadedFiles([...filteredArray]);
    }

    // SELECTING THE FIRST UPLOADED FILE IF THERE WAS NO FILES BEFORE
    useEffect(() => {
        if (activeFileId == "" && uploadedFiles.length > 0) {
            setActiveFileId(uploadedFiles[0].id)
        }
    }, [uploadedFiles])

    return (
        <ImageEditorContext.Provider
            value={{
                handleUploadFiles,
                uploadedFiles,
                handleFileSelect,
                activeFileId,
                handleFileDelete,
            }}
        >
            <main className='imageEditorWrap'>
                <EditorContent />
                <EditorSidebar />
            </main>
        </ImageEditorContext.Provider>
    )
}
