import { useContext } from 'react';
import { ImageEditorContext } from '../ImageEditor';
import './editorContent.scss';
import EditorKonvaCanvas from '../editorKonvaCanvas/EditorKonvaCanvas';

export default function EditorContent() {
  const { uploadedImages, activeUploadedImage, canvasSize, canvasExportSize } = useContext(ImageEditorContext);
  return (
    <section className='editorContentWrap'>
        {uploadedImages.map((image) => (
          <EditorKonvaCanvas
            key={image.id}
            id={image.id}
            uploadedImage={image}
            image={image.image}
            activeId={activeUploadedImage}
            canvasSize={canvasSize}
            canvasExportSize={canvasExportSize}
          />
        ))}
    </section>
  )
}
