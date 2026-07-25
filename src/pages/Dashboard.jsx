import { useState } from "react";
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";

import Navbar from "../components/Navbar";
import PromptPanel from "../components/PromptPanel";
import ChatPanel from "../components/ChatPanel";
import LoginModal from "../components/LoginModal";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const { isLoggedIn } = useAuth();
  const [prompt, setPrompt] = useState("");

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0B1020] text-white">
      {!isLoggedIn && (
        <>
          <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-md" />
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <LoginModal />
          </div>
        </>
      )}

      <Navbar />

      <div className="h-[calc(100vh-72px)] p-5">
        <PanelGroup
          direction="horizontal"
          autoSaveId="promptforge-layout"
          className="flex h-full w-full"
        >
          <Panel defaultSize={60} minSize={35}>
            <PromptPanel prompt={prompt} />
          </Panel>

          <PanelResizeHandle className="group flex w-2 cursor-col-resize items-center justify-center">
            <div className="h-full w-[2px] rounded-full bg-white/10 transition-all duration-200 group-hover:w-1 group-hover:bg-indigo-500" />
          </PanelResizeHandle>

          <Panel defaultSize={40} minSize={25}>
            <ChatPanel setPrompt={setPrompt} />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default Dashboard;