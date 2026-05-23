import { SidebarProvider } from '../ui/sidebar'
import LayoutContent from './LayoutContent'

const Layout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  )
}

export default Layout
