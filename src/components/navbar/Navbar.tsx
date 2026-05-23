import { useMemo } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '../ui/sidebar'
import {
  Code,
  House,
  LayoutDashboard,
  LucideProps,
  MessageSquareMore,
  NotebookText,
  Search,
  Settings,
  User
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.split('/')[1]

  const mainItems = useMemo(() => {
    return [
      { name: 'Home', icon: House, path: '/home' },
      { name: 'Chats', icon: MessageSquareMore, path: '/chats' },
      { name: 'Articles', icon: NotebookText, path: '/articles' },
      { name: 'Projects', icon: LayoutDashboard, path: '/projects' },
      { name: 'Snippets', icon: Code, path: '/snippets' },
      { name: 'Explore', icon: Search, path: '/explore' }
    ]
  }, [])

  const settingsItems = useMemo(() => {
    return [
      { name: 'Profile', icon: User, path: '/profile' },
      { name: 'Preferences', icon: Settings, path: '/settings' }
    ]
  }, [])

  const onClickHandler = (path: string) => {
    navigate(path)
  }

  const renderMenuItems = (
    list: {
      name: string
      icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
      >
      path: string
    }[]
  ) => (
    <SidebarMenu>
      {list.map((item) => {
        return (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <button
                className={`!font-normal !rounded-md hover:!bg-menu-item-accent hover:dark:!text-white ${
                  currentPath === item.path.split('/')[1]
                    ? '!bg-menu-item-accent dark:!text-white'
                    : ''
                }`}
                onClick={() => onClickHandler(item.path)}
              >
                <item.icon />
                <span>{item.name}</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>DevConnect</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>{renderMenuItems(mainItems)}</SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          {renderMenuItems(settingsItems)}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default Navbar
