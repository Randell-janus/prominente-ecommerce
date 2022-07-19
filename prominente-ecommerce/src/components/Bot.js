import { useEffect } from "react";

import { ChatIcon, XIcon, SendIcon } from "./general/icons";
import { useBot } from "../utils/contexts/BotContext";
import { FcOnlineSupport, FcAbout } from "react-icons/fc";

export default function Bot() {
  const {
    rasaAPI,
    chat,
    setChat,
    inputMessage,
    setInputMessage,
    botTyping,
    setbotTyping,
    isChatOpen,
    setIsChatOpen,
  } = useBot();

  useEffect(() => {
    // console.log("called");
    const objDiv = document.getElementById("messageArea");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const name = "user";
    const request_temp = { sender: "user", sender_id: name, msg: inputMessage };

    if (inputMessage !== "") {
      setChat((chat) => [...chat, request_temp]);
      setbotTyping(true);
      setInputMessage("");
      rasaAPI(name, inputMessage);
    } else {
      window.alert("Please enter valid message");
    }
  };

  // console.log(chat);

  return (
    <>
      <div className="fixed right-4 sm:right-12 bottom-16 z-10">
        <button
          onClick={() => setIsChatOpen((prev) => !prev)}
          className="bg-teal-400 rounded-full p-4 text-white shadow-lg hover:scale-110 active:bg-teal-500 transition-all"
        >
          {!isChatOpen && <ChatIcon className="h-8 w-8 md:h-12 md:w-12" />}
          {isChatOpen && <XIcon className="h-8 w-8 md:h-12 md:w-12" />}
        </button>
      </div>

      <div
        className={`${
          isChatOpen ? "block" : "hidden"
        } fixed right-0 sm:right-12 bottom-40 z-10 max-w-md sm:max-w-lg w-full shadow-lg bg-white rounded-md`}
      >
        {/* <button onClick={()=>rasaAPI("shreyas","hi")}>Try this</button> */}
        <section className="flex p-6 bg-teal-400 rounded-t-md">
          <div className="flex space-x-2">
            <FcOnlineSupport className="h-8 w-8" />
            <FcAbout className="h-8 w-8" />
          </div>
          {/* {botTyping ? <h6>Bot Typing....</h6> : null} */}
          <span className="bg-teal-600 rounded-full h-4 w-4 absolute right-4 top-4">
            {botTyping && (
              <span className="bg-teal-300 animate-ping rounded-full h-4 w-4 absolute"></span>
            )}
          </span>
        </section>

        <section
          className="p-8 h-96 overflow-y-auto space-y-6 section-scrollbar"
          id="messageArea"
        >
          {chat.map((user, key) => (
            <div key={key} className="">
              {user.sender === "bot" ? (
                <div className="flex bg-slate-100 rounded-lg rounded-tl-none px-4 py-2 w-max space-x-2 items-center">
                  <FcOnlineSupport className="h-6 w-6" />
                  <h5 className="break-words max-w-[12rem] sm:max-w-xs">
                    {user.msg}
                  </h5>
                </div>
              ) : (
                <div className="flex justify-end ">
                  <span className="bg-teal-400 rounded-lg rounded-tr-none px-3 py-2 w-max break-words max-w-[12rem] sm:max-w-xs">
                    {user.msg}
                  </span>
                </div>
              )}
            </div>
          ))}
        </section>

        <form
          className="flex p-4 bg-slate-100 rounded-b-md"
          onSubmit={handleSubmit}
        >
          <input
            onChange={(e) => setInputMessage(e.target.value)}
            value={inputMessage}
            type="text"
            placeholder="Type a message..."
            className="bg-slate-100 w-10/12 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
          />
          <div className="flex-1 flex items-center justify-center">
            <button type="submit">
              <SendIcon className="h-6 w-6 md:h-8 md:w-8 rotate-90" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
