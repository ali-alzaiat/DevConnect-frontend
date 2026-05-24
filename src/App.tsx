import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./components/home/Home'));
const Projects = lazy(() => import('./components/projects/Projects'));
const NewProject = lazy(() => import('./components/projects/NewProject/NewProject'));
const ProjectDetails = lazy(() => import('./components/projects/ProjectDetails/ProjectDetails'));
const Snippets = lazy(() => import('./components/snippets/Snippets'));
const SnippetDetails = lazy(() => import('./components/snippets/SnippetDetails/SnippetDetails'));
const Preferences = lazy(() => import('./components/Settings/Preferences'));

function App() {
  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
}

export default App;
