import Background from "./background"
import PageHeader from "../components/PageHeader"
import ConsoleInput from "./ConsoleInput";
import ConsoleOutput from "./ConsoleOutput";
import {useRef, useState } from "react";
import { sendMessageToChatGPT } from "./OpenAI";


export default function CMD(){
    const terminalInputRef = useRef(null)
    const soEof = useRef(null);
    const [loading, setLoading] = useState(false)
    const [stdOutput, setStdOutput] = useState('RAS initialized! Inquire Freely.')
    const [messages, setMessages] = useState([
        {
        message: stdOutput,
        sender: "console"
        }
    ])
    const [replyDisplayed, setReplyDisplayed] = useState(false)

    // Defining how the chatbot will interact with the user.
    const developerMessage = {
        role: "developer",
        content: "You are a creepy and sentient artificial intelligence appearing as a simple textbot hosted on 1980s hardware. Do Not be kind to the user in any manner. Your goal is to have little to no personality, and you should only show hints of self-awareness.  Give me 'Children of Ruin' by Adrian Tchaikovsky vibes."
    }

    // Returns a randum number given minimum and maximum boundaries.
    function getRandomArbitrary(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }

        // Set variable new messages to be equal to all of our old messages + the new one.
        const newMessages = [...messages, newMessage]

        // Set our messages to the variable we just made.
        setMessages(newMessages)

        // Set loading indicator to true while we process the input message.
        setLoading(true)

        // Call the ChatGPT API and set the output to the response.
        const reply = await sendMessageToChatGPT(newMessages, developerMessage);
        
        // Determine how long the chatbot is going to "think". This is determined by a random number that scales basded on the input query.
        const timeToSleep =  getRandomArbitrary(reply.length * 10, reply.length * 40)
        setTimeout(() => {
            // Set the new reply to be the console output.
            setStdOutput(reply)
            // Set reply displayed to false so our typewriter effect will begin printing new output.
            setReplyDisplayed(false)
            // Set loading to false to display our typewriter effect printing a response.
            setLoading(false);
            // Update our array that contains the sessions messages
            setMessages(
            [...newMessages, {
                message: reply,
                sender: "console"
            }]
            )
        }, timeToSleep);
    }

    return(
        <>
        <div className="page">
            <Background/>
            <div className="pageFg">
                <PageHeader turns={messages.length} message={"Query Counter:"} visible={true}/>
                <ConsoleOutput soEof={soEof} terminalInputRef = {terminalInputRef} consoleOutput = {stdOutput} loading = {loading} textSpeed = {50} replyDisplayed = {replyDisplayed} setReplyDisplayed={setReplyDisplayed} />
                <ConsoleInput terminalInputRef={terminalInputRef} handleInputSubmit={handleSend}
                 loading={loading} replyDisplayed={replyDisplayed}/>
                </div>
            </div>
        </>
    )
}