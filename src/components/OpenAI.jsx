import axios from 'axios';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const sendMessageToChatGPT = async (messages, developerMessage) => {

    // Update role naming to be expected input for ChatGPT
    let apiMessages = messages.map((messageObject) => {
        let role = ""
        if(messageObject.sender === "console"){
            role="assistant"
        }else {
            role="user"
        }
        return { role: role, content: messageObject.message }
    })

  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-4o',
        messages: [developerMessage,...apiMessages],
        store: true,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error communicating with ChatGPT:', error);
    return 'Sorry, something went wrong.';
  }
};
