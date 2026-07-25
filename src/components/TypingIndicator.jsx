function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[80%] gap-3">

        {/* AI Avatar */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
          AI
        </div>

        {/* Typing Bubble */}
        <div className="rounded-2xl rounded-tl-md border border-white/10 bg-[#1A2235] px-5 py-4">

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />

            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />

            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-gray-400" />

          </div>

        </div>

      </div>
    </div>
  );
}

export default TypingIndicator;