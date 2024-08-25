import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { chatFormats } from "../../lib/chatFormats";

export default function ChatlogParser() {
    const [textareaValue, setTextareaValue] = useState("");
    const [quillEditor, setQuillEditor] = useState("<p>aaaa</p>");

    const quillRef = useRef(null);


    // If there's timestamps in the chatlog, remove them.
    const handleRemoveTimestamp = (linesArray) => {
        const noTimestamps = linesArray.map(line => line.replace(/^\[\d{2}:\d{2}:\d{2}\]\s*/, ''));
        return noTimestamps
    }

    // create paragraph elements from array of lines with timestamps removed in the previous step
    const handleCreateQuillElements = (arr) => {
        return arr.map((line) => {
            const lineParagraph = document.createElement("p");
            lineParagraph.innerHTML = line;
            return lineParagraph
        })
    }

    // add color styles to line elements, the settings are stored in the chatFormats array
    const handleAddStyle = (elements) => {
        // Return the edited lines array
        return elements.map((line) => {
            
            // Go through each format in chatFormats array
            for (const format of chatFormats) {
                // For each format, go through each word in the triggerWords array
                for (const word of format.triggerWords) {

                    if (line.innerHTML.includes(word)) { // If the line contains the word, apply the style
                        
                        if (format.fullLine) {
                            // If the format is a full line, apply the lineColor style to the whole line

                            line.style.color = format.lineColor
                            line.innerHTML = `<span style="color: ${format.lineColor}">${line.innerHTML}</span>`
                        } else {
                            // If the format is not a full line, apply the wordColor style to the word and lineColor to the rest

                            const parts = line.innerHTML.split(word);

                            // Map over the parts and style each part accordingly
                            const styledParts = parts.map((part, index) => {
                                if (index < parts.length - 1) {
                                    return `<span style="color: ${format.lineColor}">${part}</span><span style="color: ${format.wordColor}">${word}</span>`;
                                }
                                return `<span style="color: ${format.lineColor}">${part}</span>`;
                            })

                            // Join the parts back together
                            line.innerHTML = styledParts.join("");
                        }
                    }

                }
            }
            // Return the edited line
            return line;
        })
    };

    // Parse the chatlog
    const handleParse = () => {
        // Clear the editor state
        setQuillEditor("")

        // Split the chatlog into lines
        const lines = textareaValue.split("\n")

        // Remove timestamps
        const noTimestampArray = handleRemoveTimestamp(lines)

        // Create quill elements
        const unstyledQuillElements = handleCreateQuillElements(noTimestampArray)

        // Add styles
        const styledElements = handleAddStyle(unstyledQuillElements)
        
        // Add the styled elements to the editor state
        styledElements.forEach((element) => {
            setQuillEditor(prev => prev + element.outerHTML)
        })
    }

    // Copy the editor state to the quill clipboard
    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            quill.clipboard.dangerouslyPasteHTML(quillEditor);
        }
    }, [quillEditor])

    return (
        <div>
            <textarea
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                className="chatlogTextArea"
            />
            <button onClick={handleParse}>Parse</button>
            <ReactQuill
                ref={quillRef}
                className="parsedQuill"
                readOnly
            />
        </div>
        
    )
}
