import { useContext } from 'react';
import { ImageEditorContext } from '../ImageEditor';
import './editorUploaded.scss'

export default function EditorUploaded() {
    const { uploadedFiles, handleFileSelect, activeFileId, handleFileDelete } = useContext(ImageEditorContext);

    return (
        <div className='editorUploadedSection'>
            {uploadedFiles?.map((file) => (
                <div key={file.id} className='uploadedThumbnail'>
                    <img
                        className={`thumbnailImage ${file.id === activeFileId && "activeThumbnail"}`}
                        src={file.imageUrl}
                        height={100}
                        onClick={() => handleFileSelect(file.id)}
                    />
                    <div className="thumbnailButtons">
                        <button onClick={() => handleFileDelete(file.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
