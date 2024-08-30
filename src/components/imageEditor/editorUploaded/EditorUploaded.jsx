import { useContext, useRef } from 'react';
import { ImageEditorContext } from '../ImageEditor';
import './editorUploaded.scss'
import ButtonAccent from '../../buttonAccent/ButtonAccent';
import DeleteIcon from '../../../assets/icons/DeleteIcon';
import ReplaceImageIcon from '../../../assets/icons/ReplaceImageIcon';

export default function EditorUploaded({file}) {
    const { handleFileSelect, activeFileId, handleFileDelete, handleReplaceFile } = useContext(ImageEditorContext);
    const fileReplaceRef = useRef(null);

    return (
        <div key={file.id} className='uploadedThumbnail'>
            <img
                className={`thumbnailImage ${file.id === activeFileId && "activeThumbnail"}`}
                src={file.imageUrl}
                height={100}
                onClick={() => handleFileSelect(file.id)}
            />
            <div className="thumbnailButtons">
                <ButtonAccent
                    customClassName="deleteFileSmallButton"
                    outlined={true}
                    variant="thumbnailControl"
                    iconOnly={true} onClick={() => handleFileDelete(file.id)}
                >
                    <DeleteIcon />
                </ButtonAccent>
                <ButtonAccent
                    customClassName="replaceSmallButton"
                    outlined={true}
                    variant="thumbnailControl"
                    iconOnly={true}
                    onClick={() => fileReplaceRef.current.click()}
                >
                    <ReplaceImageIcon />
                </ButtonAccent>
                
            </div>
            <input
                ref={fileReplaceRef}
                style={{position: 'absolute', top: "-300%", left: "300%"}}
                type="file"
                accept="image/*"
                onChange={(e) => handleReplaceFile(file.id, e.target.files[0])}
            />
        </div>
    )
}
