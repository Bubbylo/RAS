import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function ConsoleOutput(props){
    const {soEof, terminalInputRef, consoleOutput, loading, textSpeed, replyDisplayed, setReplyDisplayed} = props
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
            if (soEof.current){
                soEof.current.scrollIntoView();
            }
            if(terminalInputRef.current){
                terminalInputRef.current.focus();
            }
            // Typewriter output if we haven't typed our output and 
            if (index < consoleOutput.length && !replyDisplayed) {
                // If this is the first run, clear the current displayed text.
                if (index === 0){
                    setDisplayText("")
                }
                // Output one character
                const timeoutId = setTimeout(() => {
                  setDisplayText(prevText => prevText + consoleOutput[index]);
                  setIndex(prevIndex => prevIndex + 1);
                }, textSpeed);
                return () => clearTimeout(timeoutId);
              }
            // If we have output our entire string, reset our index and set our replyDisplayed bool
            // to be true.
            if (index === consoleOutput.length){
                setReplyDisplayed(true)
                setIndex(0)
            }
          }, [loading, index, consoleOutput]);

    return(
            <div className="terminalOutputWrap">
                <label>» Terminal Output</label>
                <div className="terminalOutput">
                    {loading ? <Loader/> : <div className="terminalOutputContent">{displayText}</div>}
                </div>
            </div>
        )
}