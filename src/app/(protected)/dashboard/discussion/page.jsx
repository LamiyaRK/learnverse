"use client";

import { useEffect, useRef, useState } from "react";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";

export default function DiscussionPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (status === "authenticated") {
      socket.connect();

      // Load all previous messages
      socket.on("loadMessages", (msgs) => setMessages(msgs));

      // Listen for new messages
      socket.on("receiveMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      socket.emit("loadMessages");

      return () => {
        socket.off("loadMessages");
        socket.off("receiveMessage");
        socket.disconnect();
      };
    }
  }, [status]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      sender: {
        name: session.user.name,
        image: session.user.image || null,
      },
      message: text,
    });

    setText("");
  };

  if (status !== "authenticated") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Please login to join the discussion.</p>
      </div>
    );
  }

  return (
    <div className="py-20 w-full ">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg flex flex-col mx-auto  ">
          
        {/* Header */}
        <div className="border-b px-6 py-4 ">
          <h2 className="text-3xl font-semibold text-center ">Student Discussion</h2>
          
        </div>
       
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, idx) => {
            const isMe = msg.sender.name === session.user.name;
            return (
              <div key={idx} className={`flex items-end ${isMe ? "justify-end" : "justify-start"}`}>
                
                {/* Sender Avatar */}
                {!isMe && msg.sender.image && (
                  <img
                    src={msg.sender.image}
                    alt={msg.sender.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}

                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm
                    ${isMe
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                >
                  {!isMe && <p className="text-xs font-semibold mb-1">{msg.sender.name}</p>}
                  <p className="text-lg">{msg.message}</p>
                </div>

                {/* Your Avatar */}
                {isMe && session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-8 h-8 rounded-full ml-2"
                  />
                )}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t px-4 py-3 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
       
      </div>
    </div>
  );
}
