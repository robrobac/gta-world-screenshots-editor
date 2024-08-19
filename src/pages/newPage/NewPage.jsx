import Editor from '../../components/editor/Editor';
import ScreenshotEditor from '../../components/screenshotEditor/ScreenshotEditor';
import './newPage.scss';

export default function NewPage() {
    return (
        <>
        <main className='newPageMain'>
            <ScreenshotEditor />
        </main>
        {/* <main className='homePageMain'>
            <Editor />
        </main> */}
        </>
    )
}
