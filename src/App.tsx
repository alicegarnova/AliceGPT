import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { OPENAI_URL, SUGGESTION_BUTTONS } from "./constants";
import { IMessage } from "./models";
import { addMessage, deleteMessage } from "./reducers/MessagesReducer";
import { RootStore } from "./store/Store";

export const App = () => {
  const dispatch = useDispatch();
  const messages = useSelector(
    (state: RootStore) => state.message.sendMessages
  );

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const handleDeleteMessage = (message: IMessage) => {
    dispatch(deleteMessage(message.id));
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];

    dispatch(
      addMessage({
        role: "user",
        content: input,
        id: crypto.randomUUID(),
      })
    );
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(OPENAI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GPT_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: newMessages,
        }),
      });

      const data = await res.json();
      const reply = data.choices[0].message;
      dispatch(addMessage(reply));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (text: string) => {
    dispatch(
      addMessage({
        role: "user",
        content: text,
        id: crypto.randomUUID(),
      })
    );
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    localStorage.setItem("threads", JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-col flex-1 overflow-y-auto p-4 gap-4">
        {messages.map((message, index) => (
          <div key={message.id} className="flex items-center justify-end gap-2">
            <button
              onClick={() => handleDeleteMessage(message)}
              className="w-6 h-6 text-xs bg-gray-200 rounded-sm texx-gray-400"
            >
              x
            </button>
            <div
              ref={index === messages.length - 1 ? messagesEndRef : undefined}
              className={`p-3 rounded-lg max-w-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {loading && <p className="italic text-grey-500">Loading...</p>}
      </div>
      <div className="p-4 bg-white flex gap-2">
        <div className="flex flex-wrap gap-4 ">
          {SUGGESTION_BUTTONS.map((button) => (
            <button
              key={button.id}
              onClick={() => handleButtonClick(button.text)}
              disabled={loading}
              className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg"
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-8 justify-center mb-3 bg-white">
        <div className="flex-1">
          <textarea
            className="flex-1 border-1 border-gray-400 rounded-lg h-full w-full px-3 py-2 ml-4 resize-none align-middle"
            placeholder="Введите свой вопрос"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            rows={1}
          />
        </div>
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-green-500 text-white px-8 py-2 mr-4 rounded-lg disabled: bg-gray-400 "
        >
          Отправить
        </button>
      </div>
    </div>
  );
};
