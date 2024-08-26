import ChatlogParser from '../../components/chatlogParser/ChatlogParser';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import './parserPage.scss';

export default function ParserPage() {
    return (
        <>
        <Header />
        <main className='parserPageMain'>
            <ChatlogParser />
        </main>
        <Footer />
        </>
    )
}
