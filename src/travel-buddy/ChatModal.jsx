import React, { useEffect, useRef, useState } from "react";
import { db } from "@/service/firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

function getChatId(userA, userB) {
  return [userA.userId, userB.userId].sort().join("_");
}

function ChatModal({ currentUser, buddy, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatId = getChatId(currentUser, buddy);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "Chats", chatId, "messages"),
      orderBy("createdAt")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsub();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    await addDoc(collection(db, "Chats", chatId, "messages"), {
      senderId: currentUser.userId,
      senderName: currentUser.name,
      text: message,
      createdAt: new Date()
    });
    // Add notification for recipient
    await addDoc(collection(db, "Notifications"), {
      toUserId: buddy.userId,
      fromUserId: currentUser.userId,
      fromName: currentUser.name,
      message,
      chatId,
      createdAt: serverTimestamp(),
      read: false
    });
    setMessage("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fancy-glass p-8 w-full max-w-md mx-auto">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-primary" onClick={onClose}>×</button>
        <h2 className="text-xl font-bold text-primary mb-2">Chat with {buddy.name}</h2>
        <div className="flex-1 overflow-y-auto mb-2 max-h-80">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 flex ${msg.senderId === currentUser.userId ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2 rounded-lg ${msg.senderId === currentUser.userId ? "bg-primary text-white" : "bg-gray-200 text-gray-800"}`}>
                <span className="block text-xs font-semibold">{msg.senderName}</span>
                <span>{msg.text}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2 mt-2">
          <input
            className="flex-1 border rounded p-2"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
            placeholder="Type a message..."
          />
          <button className="bg-secondary text-white px-4 py-2 rounded-full" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatModal;