import { useContext } from 'react';
import { ImageEditorContext } from '../ImageEditor';
import './editorContent.scss';
import EditorKonvaCanvas from '../editorKonvaCanvas/EditorKonvaCanvas';

export default function EditorContent() {
  const { uploadedFiles } = useContext(ImageEditorContext);
  
  return (
    <section className='editorContentWrap'>
      {uploadedFiles.map((file) => (
        <EditorKonvaCanvas
          key={file.id}
          file={file}
        />
      ))}
  </section>
  )
}