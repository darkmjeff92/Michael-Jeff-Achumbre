export interface NavigationItem {
  href: string
  label: string
  ariaLabel: string
}

export interface UnifiedNavigationProps {
  className?: string
}

export interface NavigationMenuProps {
  items: NavigationItem[]
  onItemClick?: () => void
  className?: string
}

export interface NavigationState {
  isOpen: boolean
  activeItem?: string
}