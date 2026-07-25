import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PromptPanel({ prompt }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!prompt) return;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-[#111827]">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-white/10 p-6">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Generated Prompt
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Ready to copy and use.
          </p>
        </div>

        {prompt && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
          >
            {copied ? (
              <>
                <FiCheck size={16} />
                Copied
              </>
            ) : (
              <>
                <FiCopy size={16} />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Scrollable Content */}

      <div className="flex-1 overflow-y-auto p-8">
        {!prompt ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            Your generated prompt will appear here.
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-6 text-4xl font-bold text-white">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-4 mt-8 border-b border-white/10 pb-2 text-2xl font-semibold text-white">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-3 mt-6 text-xl font-semibold text-white">
                    {children}
                  </h3>
                ),

                h4: ({ children }) => (
                  <h4 className="mb-2 mt-5 text-lg font-semibold text-white">
                    {children}
                  </h4>
                ),

                p: ({ children }) => (
                  <p className="mb-4 leading-8 text-gray-300">
                    {children}
                  </p>
                ),

                strong: ({ children }) => (
                  <strong className="font-semibold text-white">
                    {children}
                  </strong>
                ),

                em: ({ children }) => (
                  <em className="italic text-gray-200">
                    {children}
                  </em>
                ),

                ul: ({ children }) => (
                  <ul className="mb-5 list-disc space-y-2 pl-6 text-gray-300">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-5 list-decimal space-y-2 pl-6 text-gray-300">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li className="leading-7">
                    {children}
                  </li>
                ),

                hr: () => (
                  <hr className="my-8 border-white/10" />
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-5 border-l-4 border-indigo-500 bg-white/5 py-2 pl-4 italic text-gray-300">
                    {children}
                  </blockquote>
                ),

                code({ inline, className, children, ...props }) {
                  if (inline) {
                    return (
                      <code
                        className="rounded bg-black/40 px-1.5 py-1 font-mono text-pink-300"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  return (
                    <pre className="my-5 overflow-x-auto rounded-xl border border-white/10 bg-[#0B1220] p-5">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                },

                table: ({ children }) => (
                  <div className="my-6 overflow-x-auto rounded-lg border border-white/10">
                    <table className="w-full border-collapse">
                      {children}
                    </table>
                  </div>
                ),

                thead: ({ children }) => (
                  <thead className="bg-[#1F2937]">
                    {children}
                  </thead>
                ),

                th: ({ children }) => (
                  <th className="border border-white/10 px-4 py-3 text-left font-semibold text-white">
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td className="border border-white/10 px-4 py-3 text-gray-300">
                    {children}
                  </td>
                ),

                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 underline hover:text-indigo-300"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {prompt}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}