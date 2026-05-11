import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [view, setView] = useState("landing");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("reboot_user");
    if (saved) {
      setUser(JSON.parse(saved));
      setView("dashboard");
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("reboot_user", JSON.stringify(userData));
    setView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("reboot_user");
    setView("landing");
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        {view === "landing" ? (
          <Landing onStart={() => setView("dashboard")} onLogin={handleLogin} />
        ) : (
          <Dashboard onBack={handleLogout} user={user} />
        )}
        <Toaster position="bottom-right" />
      </div>
    </ThemeProvider>
  );
}
