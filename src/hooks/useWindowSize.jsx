import { useLayoutEffect, useState } from "react"

export const useWindowSize = () => {
    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)
    const updateWindowSize = () => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    }
    useLayoutEffect(() => {
        window.addEventListener('resize', updateWindowSize);
        updateWindowSize();
        return () => window.removeEventListener('resize', updateWindowSize);
    },[])

    return {windowWidth, windowHeight}
}