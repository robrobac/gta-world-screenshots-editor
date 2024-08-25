import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { chatFormats, chatRemove } from "../../lib/chatFormats";

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
        return arr
            // Remove lines that match trigger words from chatRemove array
            .filter((line) => {
                // Check if the line matches any of the trigger words
                return !chatRemove.some(({ triggerWords }) =>
                    triggerWords.some((trigger) => {
                        return typeof trigger === "string"
                            ? line.includes(trigger)  // Check for string match
                            : trigger.test(line);     // Check for regex match
                    })
                );
            })
            // Create paragraph elements from the rest of the lines
            .map((line) => {
                const lineParagraph = document.createElement("p");
                lineParagraph.innerHTML = line;
                return lineParagraph;
            });
    };

    // add color styles to line elements, the settings are stored in the chatFormats array
    const handleAddStyle = (elements) => {
        // Return the edited lines array
        return elements.map((line) => {
            
            // Go through each format in chatFormats array
            for (const format of chatFormats) {
                // For each format, go through each word in the triggerWords array
                for (const word of format.triggerWords) {

                    // Check if the line contains the word for both string and regex match
                    const hasMatch = format.triggerWords.some((trigger) => {
                        return typeof trigger === "string"
                            ? line.innerHTML.includes(trigger)  // Check for string match
                            : trigger.test(line.innerHTML);     // Check for regex match
                    })

                    if (hasMatch) { // If the line contains the word, apply the style
                        
                        if (format.fullLine) {
                            // If the format is a full line, apply the lineColor style to the whole line
                            
                            line.style.color = format.lineColor
                            line.innerHTML = `<span style="color: ${format.lineColor}">${line.innerHTML}</span>`
                        } else {
                            // If the format is not a full line, apply the wordColor style to the word and lineColor to the rest
                            // but first check if the trigger word is string or regex, matters in replacing the line words into spans

                            if (typeof word === "string") {
                                // handle string case

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

                            } else if (word instanceof RegExp) {
                                // Handle regex case

                                line.innerHTML = line.innerHTML.replace(word, (match) => {
                                    return `<span style="color: ${format.wordColor}">${match}</span>`;
                                });

                                line.innerHTML = `<span style="color: ${format.lineColor}">${line.innerHTML}</span>`;
                            }
 
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
