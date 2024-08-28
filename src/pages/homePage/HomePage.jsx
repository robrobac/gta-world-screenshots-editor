import { useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ImageEditor from '../../components/imageEditor/ImageEditor';
import './homePage.scss';
import supabase from '../../config/supabaseClient';

export default function HomePage() {
    // TODO
    // useEffect(() => {
    //     const registerVisit = async () => {
    //         const {error} = await supabase
    //             .from('visitCount')
    //             .insert([{page: "homepage"}])

    //             if (error) {
    //                 console.log(error)
    //             }
    //     }
    //     registerVisit()
    // }, [])


    return (
        <>
        <Header />
        <ImageEditor />
        <Footer />
        </>
        
    )
}
