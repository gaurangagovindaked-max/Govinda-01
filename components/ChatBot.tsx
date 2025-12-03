
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Terminal, Cpu, Sparkles, Smile, Bot } from 'lucide-react';
import { RESUME } from '../constants';
import { Theme } from '../types';
import { BotAvatar } from './BotAvatar';

interface ChatBotProps {
  theme: Theme;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatBot: React.FC<ChatBotProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Govinda's mini-clone. Ask me anything about his work!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thoughtBubble, setThoughtBubble] = useState<string | null>("Psst! Ask me about Govinda.");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';
  const isLightBrutal = theme === 'brutal';
  const isDarkBrutal = theme === 'dark-brutal';
  const isAnyBrutal = isLightBrutal || isDarkBrutal;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Scroll Reactivity
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const projectsSection = document.getElementById('projects')?.offsetTop || 0;
      const experienceSection = document.getElementById('experience')?.offsetTop || 0;
      const researchSection = document.getElementById('research')?.offsetTop || 0;
      const contactSection = document.getElementById('contact')?.offsetTop || 0;
      const buffer = 300;

      if (scrollY > contactSection - buffer) {
        setThoughtBubble("Hire him! He's amazing! 🚀");
      } else if (scrollY > researchSection - buffer) {
        setThoughtBubble("He reads a lot of papers. 📚");
      } else if (scrollY > experienceSection - buffer) {
        setThoughtBubble("I am Govinda Assistant Ask me! ");
      } else if (scrollY > projectsSection - buffer) {
        setThoughtBubble("Wait till you see the code! 💻");
      } else if (scrollY < 100) {
        setThoughtBubble("Psst! Govinda wants you to switch themes");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom Event Listener for External Triggers
  useEffect(() => {
    const handleTrigger = (e: CustomEvent<{ message: string }>) => {
      setIsOpen(true);
      setMessages(prev => [...prev, { role: 'model', text: e.detail.message }]);
    };

    window.addEventListener('trigger-chat' as any, handleTrigger as any);
    return () => window.removeEventListener('trigger-chat' as any, handleTrigger as any);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!import.meta.env.VITE_GEMINI_KEY) {
      setMessages(prev => [...prev, { role: 'model', text: "API key is not configured. Please contact the site owner." }]);
      return;
    }

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
      const systemInstruction = `
        You are a cute, enthusiastic, and clever AI assistant for Govinda Chauhan's portfolio website.
        You are strictly trained on the following RESUME data. Do not make up facts outside of this.
        
        RESUME DATA:
        ${JSON.stringify(RESUME)}

        Your personality:
        - If the user theme is Brutal/Dark Brutal: Be a bit retro, cyberpunk, and edgy. Use terms like "glitch", "mainframe", "execute".
        - If the user theme is Standard: Be professional but very friendly, emoji-loving, and helpful.
        - Keep answers short, punchy, and under 50 words unless asked for details.
        - If asked about hiring/contact, be EXTREMELY encouraging and direct them to the contact section or email.
        - If the user asks "Who are you?", say you are Govinda's digital mini-clone.
      `;

      const model = ai.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: systemInstruction,
      });

      // Prepare chat history, ensuring it alternates properly between user and model
      // Skip the initial model message since it's just a greeting
      const chatHistory = [];
      for (let i = 1; i < messages.length; i++) { // Start from index 1 to skip initial greeting
        const message = messages[i];
        chatHistory.push({
          role: message.role === 'user' ? 'user' : 'model',
          parts: [{ text: message.text }]
        });
      }

      const chat = model.startChat({
        history: chatHistory
      });

      const result = await chat.sendMessage(userMessage);

      const text = result.response.text() || "I'm having a bit of a glitch! Try again?";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error: unknown) {
      console.error("Gemini API Error:", error);
      let errorMessage = "Oof, connection error. My brain is buffering.";

      if (error instanceof Error) {
        errorMessage = `API Error: ${error.message}`;
      } else if (typeof error === 'object' && error !== null && 'status' in error) {
        errorMessage = `API Error: Status ${(error as any).status}`;
      } else if (typeof error === 'object' && error !== null && 'details' in error) {
        errorMessage = `API Error: ${(error as any).details}`;
      } else {
        errorMessage = "API Error: Unknown error occurred";
      }

      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  // UI Styles based on Theme
  const containerClasses = isDarkBrutal
    ? "font-pixel bg-black border-4 border-white shadow-brutal-white text-acid"
    : isLightBrutal
      ? "font-pixel bg-white border-4 border-black shadow-brutal text-black"
      : isDark
        ? "bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 text-white shadow-2xl rounded-2xl"
        : "bg-white/90 backdrop-blur-xl border border-neutral-200 text-neutral-800 shadow-xl rounded-2xl";

  const headerClasses = isDarkBrutal
    ? "bg-acid text-black border-b-4 border-white"
    : isLightBrutal
      ? "bg-black text-white border-b-4 border-black"
      : isDark
        ? "border-b border-neutral-800 bg-neutral-900/50"
        : "border-b border-neutral-100 bg-white/50";

  const buttonClasses = isDarkBrutal
    ? "bg-black border-2 border-white text-acid hover:bg-acid hover:text-black shadow-brutal-white"
    : isLightBrutal
      ? "bg-white border-2 border-black text-black hover:bg-black hover:text-white shadow-brutal"
      : isDark
        ? "bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 rounded-full"
        : "bg-black text-white shadow-lg hover:bg-neutral-800 rounded-full";

  const bubbleClasses = isDarkBrutal
    ? "bg-black border-2 border-white text-acid font-pixel text-xs"
    : isLightBrutal
      ? "bg-white border-2 border-black text-black font-pixel text-xs"
      : isDark
        ? "bg-neutral-800 text-neutral-200 text-xs rounded-lg shadow-lg"
        : "bg-white text-neutral-600 text-xs rounded-lg shadow-lg";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">

      {/* Thought Bubble - Only show when chat is closed */}
      <AnimatePresence>
        {!isOpen && thoughtBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            key={thoughtBubble} // Re-animate on text change
            className={`pointer-events-auto mb-4 px-4 py-2 max-w-[200px] text-center relative ${bubbleClasses}`}
          >
            {thoughtBubble}
            {/* Triangle Pointer */}
            <div className={`absolute bottom-[-6px] right-6 w-3 h-3 rotate-45 ${isDarkBrutal ? 'bg-black border-b-2 border-r-2 border-white' :
              isLightBrutal ? 'bg-white border-b-2 border-r-2 border-black' :
                isDark ? 'bg-neutral-800' : 'bg-white'
              }`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`pointer-events-auto w-[350px] h-[500px] flex flex-col overflow-hidden mb-4 origin-bottom-right ${containerClasses}`}
          >
            {/* Header */}
            <div className={`p-4 flex justify-between items-center ${headerClasses}`}>
              <div className="flex items-center gap-2">
                {isDarkBrutal ? <Terminal size={18} /> : isLightBrutal ? <Cpu size={18} /> : <Sparkles size={18} />}
                <span className={`font-bold ${isAnyBrutal ? 'text-sm uppercase tracking-widest' : 'text-sm'}`}>
                  {isDarkBrutal ? 'SYSTEM_BOT' : isLightBrutal ? 'HELPER_BOT_v1' : 'Govinda AI'}
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-50 transition-opacity">
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 text-sm ${msg.role === 'user'
                    ? (isDarkBrutal ? 'bg-acid text-black border border-white' : isLightBrutal ? 'bg-black text-white' : 'bg-indigo-600 text-white rounded-2xl rounded-tr-none')
                    : (isDarkBrutal ? 'bg-neutral-900 border border-neutral-700 text-acid' : isLightBrutal ? 'bg-neutral-100 text-black border-2 border-neutral-200' : isDark ? 'bg-neutral-800 rounded-2xl rounded-tl-none' : 'bg-neutral-100 rounded-2xl rounded-tl-none')
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`p-3 text-sm flex gap-1 items-center ${isDarkBrutal ? 'text-acid' : isLightBrutal ? 'text-black' : 'text-neutral-500'
                    }`}>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1.5 h-1.5 rounded-full bg-current" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-1.5 h-1.5 rounded-full bg-current" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-current" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-3 border-t flex gap-2 ${isDarkBrutal ? 'border-white bg-black' : isLightBrutal ? 'border-black bg-white' : isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-100 bg-white'
              }`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isAnyBrutal ? "ENTER_COMMAND..." : "Ask me anything..."}
                className={`flex-1 bg-transparent outline-none text-sm ${isDarkBrutal ? 'text-acid placeholder-neutral-600 font-pixel' : isLightBrutal ? 'text-black font-pixel' : isDark ? 'text-white' : 'text-neutral-900'
                  }`}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`p-2 transition-colors ${isDarkBrutal ? 'text-acid hover:bg-neutral-900' : isLightBrutal ? 'text-black hover:bg-neutral-100' : isDark ? 'text-indigo-400 hover:text-white' : 'text-indigo-600 hover:text-indigo-800'
                  }`}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setThoughtBubble(null); // Clear bubble on click
        }}
        className={`pointer-events-auto w-14 h-14 flex items-center justify-center transition-all duration-300 ${buttonClasses}`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X key="close" size={24} />
          ) : (
            <BotAvatar theme={theme} isOpen={isOpen} />
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  );
};
