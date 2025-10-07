import Link from './Link'
import {
  Mail,
  Github,
  Linkedin,
  Mastodon,
  Facebook,
  Youtube,
  Twitter,
  X,
  Threads,
  Instagram,
  Medium,
  Bluesky,
  Globe,
} from './social-icons/icons'

const iconComponents = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  mastodon: Mastodon,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
  x: X,
  threads: Threads,
  instagram: Instagram,
  medium: Medium,
  bluesky: Bluesky,
  globe: Globe,
}

interface LinkCardProps {
  title: string
  description?: string
  href: string
  iconKind?: keyof typeof iconComponents
}

const LinkCard = ({ title, description, href, iconKind }: LinkCardProps) => {
  const IconComponent = iconKind ? iconComponents[iconKind] : null

  return (
    <Link
      href={href}
      className="hover:border-primary-500 dark:hover:border-primary-400 block w-full rounded-lg border-2 border-gray-200 p-4 transition-colors dark:border-gray-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center gap-4">
        {IconComponent && (
          <div className="text-gray-700 dark:text-gray-200">
            <IconComponent className="h-6 w-6 fill-current" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </Link>
  )
}

export default LinkCard
