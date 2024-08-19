import DownloadIcon from '../../../assets/icons/DownloadIcon';
import ButtonAccent from '../../buttonAccent/ButtonAccent';
import EditorUpload from '../editorUpload/EditorUpload';
import EditorUploaded from '../editorUploaded/EditorUploaded';
import './editorSidebar.scss';

export default function EditorSidebar() {
  

  return (
    <aside className='editorSidebarWrap'>
        <EditorUpload />
        <EditorUploaded />
        <ButtonAccent title="Download All" fullWidth={true}>
          <DownloadIcon />
        </ButtonAccent>
    </aside>
  )
}
