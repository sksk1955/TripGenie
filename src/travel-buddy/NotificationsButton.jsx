import React, { useEffect, useState, useRef } from "react";
import { db } from "@/service/firebaseConfig";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { FaBell } from "react-icons/fa";

function NotificationsButton({ currentUser }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!currentUser || !currentUser.userId) return; // Prevent query with undefined value
    const q = query(
      collection(db, "Notifications"),
      where("toUserId", "==", currentUser.userId)
    );
    const unsub = onSnapshot(q, (snap) => {
      setNotifications(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [currentUser]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const markAsRead = async (id) => {
    await updateDoc(doc(db, "Notifications", id), { read: true });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className="relative bg-white rounded-full p-2 shadow hover:bg-gray-100"
        onClick={() => setOpen(o => !o)}
      >
        <FaBell className="text-primary" size={22} />
        {notifications.some(n => !n.read) && (
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-3 h-3"></span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl z-50 p-4">
          <h4 className="font-bold mb-2">Notifications</h4>
          {notifications.length === 0 && <div className="text-gray-400">No notifications</div>}
          {notifications.map(n => (
            <div
              key={n.id}
              className={`mb-2 p-2 rounded ${n.read ? "bg-gray-100" : "bg-accent/20"}`}
              onClick={() => markAsRead(n.id)}
            >
              <b>{n.fromName}</b>: {n.message}
              <div className="text-xs text-gray-500">{n.createdAt?.toDate?.().toLocaleString?.() || ""}</div>
            </div>
          ))}
        </div>
      )}
      {/* Example for a card component */}
      <div className="fancy-glass p-6 m-4 shadow-lg">
        {/* Card content */}
      </div>
    </div>
  );
}

export default NotificationsButton;