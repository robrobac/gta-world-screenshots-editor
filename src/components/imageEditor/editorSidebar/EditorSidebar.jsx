import EditorUpload from '../editorUpload/EditorUpload';
import EditorUploaded from '../editorUploaded/EditorUploaded';
import './editorSidebar.scss';

export default function EditorSidebar() {
  

  return (
    <aside className='editorSidebarWrap'>
        <EditorUpload />
        <EditorUploaded />
    </aside>
  )
}
