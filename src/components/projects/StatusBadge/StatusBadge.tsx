import { Badge } from '@/components/ui/badge'
import { ProjectStatus } from './constants'

type StatusBadgeProps = {
  status: ProjectStatus
}

const statusConfig = {
  [ProjectStatus.Active]: {
    label: 'Active',
    className: 'bg-article-tint text-in-article border-transparent'
  },
  [ProjectStatus.Idle]: {
    label: 'Idle',
    className: 'bg-surface-hover text-secondary border-transparent'
  },
  [ProjectStatus.Review]: {
    label: 'Review',
    className: 'bg-brand-tint text-in-brand border-transparent'
  },
  [ProjectStatus.Archived]: {
    label: 'Archived',
    className: 'bg-sunken text-disabled border-transparent'
  }
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { label, className } = statusConfig[status]
  return (
    <Badge className={className}>
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {label}
    </Badge>
  )
}

export default StatusBadge
