import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Projects from "./components/projects/Projects";
import NewProject from "./components/projects/new_project/NewProject";
import ProjectDetails from "./components/projects/project_details/ProjectDetails";
import Snippets from "./components/snippets/Snippets";
import SnippetDetails from "./components/snippets/snippet_details/SnippetDetails";
import Preferences from "./components/Settings/Preferences";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chats" element={<div>Chats</div>} />
        <Route path="/articles" element={<div>Articles</div>} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/create" element={<NewProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/snippets" element={<Snippets />} />
        <Route path="/snippets/:id" element={<SnippetDetails />} />
        <Route path="/explore" element={<div>Explore</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/settings" element={<Preferences />} />
      </Route>
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/register" element={<div>Register</div>} />
      <Route path="/forgot-password" element={<div>Forgot Password</div>} />
      <Route path="/reset-password" element={<div>Reset Password</div>} />
    </Routes>
  );
}

export default App;
