import { useEffect } from 'react';
import ChatlogParser from '../../components/chatlogParser/ChatlogParser';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import './parserPage.scss';
import supabase from '../../config/supabaseClient';

export default function ParserPage() {

    // TODO
    useEffect(() => {
        const registerVisit = async () => {
            const {error} = await supabase
                .from('visitCount')
                .insert([{page: "parser"}])

                if (error) {
                    console.log(error)
                }
                console.log("test")
        }
        registerVisit()
    }, [])

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
