import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chats" element={<div>Chats</div>} />
        <Route path="/articles" element={<div>Articles</div>} />
        <Route path="/projects" element={<div>Projects</div>} />
        <Route path="/snippets" element={<div>Snippets</div>} />
        <Route path="/explore" element={<div>Explore</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
      </Route>
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/register" element={<div>Register</div>} />
      <Route path="/forgot-password" element={<div>Forgot Password</div>} />
      <Route path="/reset-password" element={<div>Reset Password</div>} />
    </Routes>
  );
}

export default App;
