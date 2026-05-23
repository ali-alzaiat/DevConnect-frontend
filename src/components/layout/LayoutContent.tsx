import { useSidebar } from '@/contexts/SidebarContext'
import { Outlet } from 'react-router'
import Navbar from '../navbar/Navbar'
import { SidebarTrigger } from '../ui/sidebar'

const LayoutContent = () => {
  const { open } = useSidebar()
  return (
    <div className="App flex w-full">
      <div className="sidebar mr-2">
        <Navbar />
      </div>
      <div className="App-center h-screen flex-1 overflow-y-auto flex flex-row">
        {!open && (
          <div className="navbar-trigger py-2 sticky top-0 z-10 bg-background">
            <SidebarTrigger />
          </div>
        )}
        <div className="main-content w-full py-6 px-3 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default LayoutContent
