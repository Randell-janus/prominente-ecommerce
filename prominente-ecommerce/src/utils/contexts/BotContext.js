import { useContext, useState, useEffect, createContext, useRef } from "react";

const BotContext = createContext();

export const useBot = () => {
  return useContext(BotContext);
};

export const BotProvider = ({ children }) => {
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setbotTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const rasaAPI = async (name, msg) => {
    //chatData.push({sender : "user", sender_id : name, msg : msg});

    // await fetch("http://localhost:5005/webhooks/rest/webhook", {
    await fetch(
      "https://1b20-2001-4451-ab5-3b00-d8cd-191f-3ffc-747c.ap.ngrok.io/webhooks/rest/webhook",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          charset: "UTF-8",
        },
        credentials: "same-origin",
        body: JSON.stringify({ sender: name, message: msg }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          response.forEach((obj) => {
            const recipient_id = obj["recipient_id"];
            const recipient_msg = obj["text"];

            const response_temp = {
              sender: "bot",
              recipient_id: recipient_id,
              msg: recipient_msg,
            };

            setChat((chat) => [...chat, response_temp]);
          });

          setbotTyping(false);

          // scrollBottom();
        }
      });
  };

  useEffect(() => {
    rasaAPI("user", "/restart");
  }, []);

  //   useEffect(() => {
  //     getNotifs();
  //   }, [currentUser]);

  const value = {
    rasaAPI,
    chat,
    setChat,
    inputMessage,
    setInputMessage,
    botTyping,
    setbotTyping,
    isChatOpen,
    setIsChatOpen,
  };

  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
};
