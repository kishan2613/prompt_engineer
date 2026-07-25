function Message({
  role = "assistant",
  content,
  time = "",
}) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[80%] gap-3 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-semibold ${
            isUser
              ? "bg-indigo-600"
              : "bg-emerald-600"
          }`}
        >
          {isUser ? "K" : "AI"}
        </div>

        {/* Bubble */}

        <div
          className={`rounded-2xl px-5 py-4 shadow-lg ${
            isUser
              ? "rounded-br-md bg-indigo-600 text-white"
              : "rounded-tl-md border border-white/10 bg-[#1A2235] text-gray-200"
          }`}
        >
          <p className="whitespace-pre-wrap text-sm leading-7">
            {content}
          </p>

          {time && (
            <div
              className={`mt-3 text-xs ${
                isUser
                  ? "text-indigo-200"
                  : "text-gray-500"
              }`}
            >
              {time}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;