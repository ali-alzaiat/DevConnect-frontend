import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Layout from './components/layout/Layout';
import { useCheckLoginStatus } from './api/generated/auth/auth';
import { ProtectedRoute } from './components/general/ProtectedRoute';
import SignUp from './components/SignUp/SignUp';
import { CustomSpinner } from './components/general/CustomSpinner';

const Home = lazy(() => import('./components/home/Home'));
const Projects = lazy(() => import('./components/projects/Projects'));
const NewProject = lazy(() => import('./components/projects/NewProject/NewProject'));
const ProjectDetails = lazy(() => import('./components/projects/ProjectDetails/ProjectDetails'));
const Snippets = lazy(() => import('./components/snippets/Snippets'));
const SnippetDetails = lazy(() => import('./components/snippets/SnippetDetails/SnippetDetails'));
const Articles = lazy(() => import('./components/articles/Articles'));
const ArticleDetails = lazy(() => import('./components/articles/ArticleDetails/ArticleDetails'));
const Preferences = lazy(() => import('./components/Settings/Preferences'));
const Profile = lazy(() => import('./components/profile/Profile'));
const Login = lazy(() => import('./components/login/Login'));

function App() {
  const { data: user, isError, isLoading, isRefetching } = useCheckLoginStatus();
  const hasToken = !!localStorage.getItem('accessToken');

  if (isLoading) return <CustomSpinner fullPage />;

  const hideWhileRefetching = hasToken && isError && isRefetching;
  if (hideWhileRefetching) return <CustomSpinner fullPage />;

  const isAuthenticated = user != null;
  const showProtected = isAuthenticated || (!isError && isLoading);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={showProtected} />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chats" element={<div>Chats</div>} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetails />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/create" element={<NewProject />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/snippets" element={<Snippets />} />
            <Route path="/snippets/:id" element={<SnippetDetails />} />
            <Route path="/explore" element={<div>Explore</div>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Preferences />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<div>Forgot Password</div>} />
        <Route path="/reset-password" element={<div>Reset Password</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
