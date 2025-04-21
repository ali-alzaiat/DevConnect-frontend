import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <div className="App flex">
      <div className="sidebar mr-6">
        <SidebarProvider>
          <Navbar />
        </SidebarProvider>
      </div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/home" element={<div>Home</div>} />
        <Route path="/chats" element={<div>Chats</div>} />
        <Route path="/articles" element={<div>Articles</div>} />
        <Route path="/projects" element={<div>Projects</div>} />
        <Route path="/snippets" element={<div>Snippets</div>} />
        <Route path="/explore" element={<div>Explore</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/forgot-password" element={<div>Forgot Password</div>} />
        <Route path="/reset-password" element={<div>Reset Password</div>} />
      </Routes>
    </div>
  );
}

export default App;
