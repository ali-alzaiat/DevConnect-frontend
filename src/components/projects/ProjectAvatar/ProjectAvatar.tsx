import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import clsx from 'clsx'

const colors = [
  'bg-brand-tint text-in-brand',
  'bg-article-tint text-in-article',
  'bg-snippet-tint text-in-snippet'
]

type ProjectAvatarProps = {
  className?: string
  name: string
  index: number
}

function ProjectAvatar({ className, name, index }: ProjectAvatarProps) {
  const color = colors[index % colors.length]
  return (
    <Avatar className={clsx('rounded-lg size-10', className)}>
      <AvatarFallback className={`rounded-lg text-base font-semibold ${color}`}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}

export default ProjectAvatar
