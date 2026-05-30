import { useMemo } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '../ui/sidebar';
import {
  Code,
  House,
  LayoutDashboard,
  LucideProps,
  MessageSquareCode,
  MessageSquareMore,
  NotebookText,
  Power,
  Search,
  Settings,
  User
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { useSidebar } from '@/contexts/SidebarContext';
import Logo from '../general/Logo';
import { useLogout } from '@/hooks/useLogout';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];
  const { open } = useSidebar();
  const { logout } = useLogout();

  const mainItems = useMemo(() => {
    return [
      { name: 'Home', icon: House, path: '/home' },
      { name: 'Chats', icon: MessageSquareMore, path: '/chats' },
      { name: 'Articles', icon: NotebookText, path: '/articles' },
      { name: 'Projects', icon: LayoutDashboard, path: '/projects' },
      { name: 'Snippets', icon: Code, path: '/snippets' },
      { name: 'Explore', icon: Search, path: '/explore' }
    ];
  }, []);

  const settingsItems = useMemo(() => {
    return [
      { name: 'Profile', icon: User, path: '/profile' },
      { name: 'Preferences', icon: Settings, path: '/settings' }
    ];
  }, []);

  const onClickHandler = (path: string) => {
    navigate(path);
  };

  const renderMenuItems = (
    list: {
      name: string;
      icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
      >;
      path: string;
    }[]
  ) => (
    <SidebarMenu>
      {list.map((item) => {
        const isActive = currentPath === item.path.split('/')[1];
        return (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <button
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 hover:cursor-pointer ${
                  isActive
                    ? 'bg-brand-tint text-brand font-medium'
                    : 'text-muted-foreground hover:bg-surface-hover hover:text-primary font-normal'
                }`}
                onClick={() => onClickHandler(item.path)}
              >
                <item.icon />
                <span>{item.name}</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="text-brand flex flex-row justify-between">
        <Logo />
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        {!open && (
          <SidebarGroup>
            <MessageSquareCode className="bg-brand p-1 text-on-brand ml-1" />
          </SidebarGroup>
        )}
        <SidebarGroup>{renderMenuItems(mainItems)}</SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          {renderMenuItems(settingsItems)}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 hover:cursor-pointer text-error hover:bg-surface-hover hover:text-error! font-normal`}
                onClick={logout}
              >
                <Power className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navbar;
