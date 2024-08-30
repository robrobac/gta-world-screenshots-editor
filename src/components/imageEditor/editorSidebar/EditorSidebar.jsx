import ButtonAccent from '../../buttonAccent/ButtonAccent';
import EditorUpload from '../editorUpload/EditorUpload';
import EditorUploaded from '../editorUploaded/EditorUploaded';
import './editorSidebar.scss';

export default function EditorSidebar({setFeedbackFormVisible, uploadedFiles}) {

  return (
    <aside className='editorSidebarWrap'>
        <EditorUpload />
        
        <div className='editorUploadedSection'>
            {uploadedFiles?.map((file) => (
              <EditorUploaded key={file.id} file={file}/>
            ))}
        </div>

        {/* TODO */}
        <div style={{padding: "16px 16px 0 16px"}}>
          <ButtonAccent fullWidth={true} title="Chatlog Parser" outlined={false} rounded={false} variant="canvasControl" onClick={() => window.open("/parser", "_blank")}/>
        </div>
        <div style={{padding: "16px"}}>
          <ButtonAccent fullWidth={true} title="Leave Feedback" outlined={true} rounded={false} variant="canvasControl" onClick={() => setFeedbackFormVisible(true)}/>
        </div>
    </aside>
  )
}
