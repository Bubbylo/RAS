import { useState, useEffect } from "react"

export default function ConsoleInput(props){
    const {terminalInputRef, handleInputSubmit, loading, replyDisplayed} = props
    const [userText, setUserText] = useState('')
    const [lastInput, setLastInput] = useState('')
    const [resetUserInput, setResetUserInput] = useState(false)
    
    // Called on user Input submission.
    function handleSubmit(event){
        event.preventDefault()

        // Do not submit inputs that are the same as the last ones, or empty strings.
        if(userText != lastInput && userText){
            setResetUserInput(true)
            handleInputSubmit(userText)
            setLastInput(userText)
        }
        else{
            setUserText("")
        }
    }

    // Called on each modification of user input.
    const handleInputChange = (event) => {
        const input = event.target.value
        
        // If we just got back query results, reset the input and start updating from the last addition.
        if (resetUserInput){
            setUserText(input.slice(-1))
            setResetUserInput(false)
        }
        else{
            setUserText(event.target.value);
        }
    };

    return(
        <div className="terminalInputWrap">
            <label>» Type Your Commands Here</label>
            <form onSubmit={handleSubmit}>
                <input
                    // Show darker container and letters if we are loading, haven't displayed the output messsage, or 
                    // if the user input has yet to be reset post query.
                    className={loading || !replyDisplayed || resetUserInput ? "terminalInputLocked" : "terminalInput"}
                    name="userInput"
                    // Don't allow the user to input while we display or wait to display.
                    disabled={loading || !replyDisplayed}
                    onChange={handleInputChange}
                    value = {userText}
                    autoComplete="off"
                    spellCheck="false"
                    ref={terminalInputRef}
                />
            </form>
        </div>)
}