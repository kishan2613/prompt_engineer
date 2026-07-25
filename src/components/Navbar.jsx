import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
function Navbar() {
  const { user, signOut } = useAuth();
  return (
    
    <header className="flex h-[64px] items-center justify-between border-b border-white/10 bg-[#0F172A] px-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
       

        <span className="text-lg font-semibold text-white">
          PromptForge
        </span>
      </div>

       <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-300">
          <b>Welcome</b>, {user?.name || user?.full_name || user?.email}
        </span>

        <button
          onClick={signOut}
          className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-red-400"
          title="Logout"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;