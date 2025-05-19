"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContactMeProps {
  onClose: () => void;
}

export default function ContactMe({ onClose }: ContactMeProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      alert("Message sent successfully!");
      onClose();
    } catch (error: any) {
      alert(error?.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Contact Me</h2>

        <label className="block mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="block w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded-lg"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="block w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded-lg"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          className="block w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded-lg"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button
          className="block w-full px-4 py-2 bg-indigo-600 text-white rounded-lg"
          type="submit"
          disabled={isSending}
        >
          Send Message
        </button>

        <button
          className="block w-full px-4 py-2 mt-4 bg-gray-300 text-gray-800 rounded-lg"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </motion.form>
    </motion.div>
  );
}
