import React, { useState, useRef, useEffect } from "react";
import { Paperclip, Mic, Video, Send, Loader2 } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const ChatUI = () => {
  const [messages, setMessages] = useState([{ text: "Hi there 👋", sender: "ai" }]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Clean markdown-like text
  const cleanText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "**$1**")
      .replace(/###\s*/g, "### ")
      .replace(/- /g, "- ")
      .replace(/\n{2,}/g, "\n\n");
  };

  // File select button
  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  // Handle file selection (audio or video)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setInput(file.name);
    }
  };

  // Handle send (text/audio/video)
  const handleSend = async () => {
    if (!input.trim() && !selectedFile) return;

    // --- If file is selected (audio or video)
    if (selectedFile) {
      const fileType = selectedFile.type;
      const formData = new FormData();
      const isVideo = fileType.startsWith("video/");

      const apiUrl = isVideo
        ? "http://localhost:8000/api/chat_with_video"
        : "http://localhost:8000/api/chat_with_audio";

      formData.append(isVideo ? "video_file" : "audio_file", selectedFile);

      const userMsg = {
        text: isVideo ? `🎥 ${selectedFile.name}` : `🎵 ${selectedFile.name}`,
        sender: "user",
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setSelectedFile(null);
      setIsLoading(true);

      try {
        const res = await axios.post(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const aiResponseRaw =
          res.data?.answer?.content || res.data?.answer || "No response available.";
        const aiResponse = cleanText(aiResponseRaw);

        const expression = res.data?.facial_expression
          ? `😊 Facial Expression: **${res.data.facial_expression}**`
          : null;

        const emotion = res.data?.emotion
          ? `🎭 Detected Emotion: **${res.data.emotion}**`
          : null;

        const transcription = res.data?.transcription
          ? `🗣️ Transcription: "${res.data.transcription}"`
          : null;

        const combinedResponse = [expression, emotion, transcription, aiResponse]
          .filter(Boolean)
          .join("\n\n");

        setMessages((prev) => [...prev, { text: combinedResponse, sender: "ai" }]);
      } catch (err) {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          {
            text: "⚠️ Error processing file. Please try again.",
            sender: "ai",
          },
        ]);
      } finally {
        setIsLoading(false);
      }

      return;
    }

    // --- If text message
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/chat", {
        question: input,
      });

      const aiResponseRaw =
        res.data?.answer?.content || res.data?.answer || "No response available.";
      const aiResponse = cleanText(aiResponseRaw);

      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to backend.", sender: "ai" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-end justify-center h-screen bg-gray-100">
      <div className="w-4/5 max-w-4xl h-[95vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 mb-6">
        {/* Header */}
        <div className="bg-indigo-50 border-b border-gray-200 p-4 flex items-center rounded-t-2xl">
          <div className="h-3 w-3 bg-emerald-400 rounded-full mr-3"></div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Mental Wellness Companion
            </h2>
            <p className="text-xs text-gray-500">Friend Mode</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-xl whitespace-pre-line break-words markdown-content ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
                style={{ lineHeight: "1.5" }}
              >
                {msg.sender === "ai" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {/* Loading Spinner */}
          {isLoading && (
            <div className="flex justify-end">
              <div className="flex items-center bg-gray-200 text-gray-700 px-3 py-2 rounded-2xl rounded-tl-none text-sm">
                <Loader2 className="mr-2 animate-spin" size={16} />
                Analyzing your input...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="bg-white border-t border-gray-200 p-4 flex items-center space-x-3 rounded-b-2xl">
          <input
            type="file"
            accept="audio/*,video/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* File Attach Button */}
          <button
            onClick={handleFileClick}
            className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50"
            title="Attach audio or video file"
            disabled={isLoading}
          >
            <Paperclip size={20} />
          </button>

          {/* Mic Button */}
          <button
            className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50"
            title="Record audio"
            disabled={isLoading}
          >
            <Mic size={20} />
          </button>

          {/* Video Placeholder */}
          <button
            className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50"
            title="Upload video"
            disabled={isLoading}
          >
            <Video size={20} />
          </button>

          {/* Input Field */}
          <input
            type="text"
            className="flex-1 bg-gray-100 text-sm px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
            placeholder={
              isLoading ? "Please wait..." : "Share what's on your mind..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
            disabled={isLoading}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            className="p-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
