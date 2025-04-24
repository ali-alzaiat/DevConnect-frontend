import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";
import { SidebarProvider } from "../ui/sidebar";

const Layout = () => {
  return (
    <div className="App flex">
      <div className="sidebar mr-6">
        <SidebarProvider>
          <Navbar />
        </SidebarProvider>
      </div>
      <div className="h-screen w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
