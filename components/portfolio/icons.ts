import {
  Boxes,
  Cloud,
  Cpu,
  Database,
  Globe,
  Layers,
  Mail,
  Server,
  Shield,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import type { IconName } from '@/lib/data'

/** Icon names usable from content files (`icon: database`). */
export const ICONS: Record<IconName, React.ElementType> = {
  globe: Globe,
  users: Users,
  server: Server,
  workflow: Workflow,
  layers: Layers,
  zap: Zap,
  database: Database,
  cloud: Cloud,
  boxes: Boxes,
  cpu: Cpu,
  shield: Shield,
  mail: Mail,
}

export const iconFor = (name?: string) => ICONS[name as IconName] ?? Boxes
