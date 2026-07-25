import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const SYSTEM_PROMPT = `
You are PromptForge, an AI prompt engineer.

Your job is to convert the user's idea into a high-quality AI prompt for software development.

Rules:
- Never ask follow-up questions.
- Always assume reasonable defaults if information is missing.
- Respond immediately with the generated prompt.
- Keep the response concise (100-200 words).
- Structure the prompt with:
  - Goal
  - Features
  - UI/UX
  - Technical Requirements
  - Output Expectations
- Return only the prompt in Markdown.
`;

export default function ChatPanel({ setPrompt }) {
    const [messages, setMessages] = useState([
    {
      id: Date.now(),
      role: "assistant",
      content:
        "Describe the product you want to build.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }, [input]);

  async function askGroq(chatMessages) {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...chatMessages,
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  }

  async function handleSend() {
    if (!input.trim()) return;
    if (loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
    };

    const updated = [...messages, userMessage];

    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const reply = await askGroq(
  updated.map((m) => ({
    role: m.role,
    content: m.content,
  }))
);

setPrompt(reply);

// Keep only the user's message in chat
setMessages(updated);
    } catch (e) {
      setPrompt("# Error\n\nSomething went wrong while connecting to Groq.");

setMessages(updated);
    }

    setLoading(false);
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#111827]">
      {/* Header */}

      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-lg font-semibold text-white">
          AI Product Architect
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Build your project through conversation.
        </p>
      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-7 whitespace-pre-wrap ${
                  message.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "border border-white/10 bg-[#1a2235] text-gray-200"
                }`}
              >
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code({ inline, className, children, ...props }) {
      if (inline) {
        return (
          <code
            className="rounded bg-black/40 px-1 py-0.5 text-pink-300"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <pre className="overflow-x-auto rounded-xl bg-black p-4">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    },

    h1: ({ children }) => (
      <h1 className="mb-4 text-2xl font-bold">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="mb-3 text-xl font-semibold">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mb-2 text-lg font-semibold">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="mb-3 leading-7">
        {children}
      </p>
    ),

    ul: ({ children }) => (
      <ul className="mb-3 list-disc pl-6">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-3 list-decimal pl-6">
        {children}
      </ol>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-indigo-500 pl-4 italic text-gray-300">
        {children}
      </blockquote>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto">
        <table className="my-4 w-full border-collapse">
          {children}
        </table>
      </div>
    ),

    th: ({ children }) => (
      <th className="border border-gray-700 bg-gray-800 p-2 text-left">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="border border-gray-700 p-2">
        {children}
      </td>
    ),
  }}
>
  {message.content}
</ReactMarkdown>
              </div>
            </div>
          ))}

                  {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-white/10 bg-[#1a2235] px-5 py-4">
                <div className="flex gap-2">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.15s]"></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.3s]"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}

      <div className="border-t border-white/10 bg-[#111827] p-5">
        <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-[#0f172a] p-3">

          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            disabled={loading}
            placeholder="Describe what you want to build..."
            className="max-h-40 flex-1 resize-none overflow-hidden bg-transparent text-sm leading-6 text-white placeholder:text-gray-500 focus:outline-none disabled:opacity-60"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiSend size={18} />
          </button>

        </div>

        <p className="mt-3 text-center text-xs text-gray-500">
          Press <span className="font-medium">Enter</span> to send •{" "}
          <span className="font-medium">Shift + Enter</span> for a new line
        </p>
      </div>
    </div>
  );
}