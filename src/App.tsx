import { useEffect, useRef, useState } from "react";
import { IMessage } from "./models";
import { useDispatch, useSelector } from "react-redux";

export const App = () => {
  const messages = useSelector((state) => state.sendMessages);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    localStorage.setItem("threads", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];

    dispatch({
      type: "ADD_MESSAGE",
      payload: { role: "user", content: input },
    });
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
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
      dispatch({
        type: "ADD_MESSAGE",
        payload: reply,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const buttons = [
    {
      id: 1,
      text: "Какая сегодня погода?",
    },
    {
      id: 2,
      text: "Сколько минут ехать до университета?",
    },
    {
      id: 3,
      text: "Сколько человек живет на Земле?",
    },
    { id: 4, text: "Как дышат рыбы?" },
  ];

  const handleButtonClick = (text: string) => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: { role: "user", content: text },
    });
  };

  const dispatch = useDispatch();

  return (
    <div className="flex  flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? messagesEndRef : undefined}
            className={`mb-2 p-3 rounded-lg max-w-lg ${
              message.role === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-black mr-auto"
            }`}
          >
            {message.content}
          </div>
        ))}
        {loading && <p className="italic text-grey-500">Loading...</p>}
      </div>
      <div className="p-4 bg-white flex gap-2">
        <div className="flex flex-wrap gap-4 ">
          {buttons.map((button) => (
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
