import { genPageMetadata } from 'app/seo'
import LinkCard from '@/components/LinkCard'
import Link from '@/components/Link'

export const metadata = genPageMetadata({
  title: 'Building Custom MCP Servers in .NET - Boise Code Camp',
  description: 'Resources and links from Benjamin Michaelis\u2019s talk at Boise Code Camp',
})

const links = [
  {
    title: 'Demo Code',
    description: 'Browse the demo code from this talk on GitHub',
    href: 'https://github.com/BenjaminMichaelis/mcp-server-dotnet-az-functions',
    iconKind: 'github' as const,
  },
  {
    title: 'Session Feedback',
    description: 'Share your feedback on this talk \u2014 it really helps!',
    href: 'https://sfeedback.com/Co4Y7e',
    iconKind: 'globe' as const,
  },
  {
    title: 'LinkedIn',
    description: 'Connect with me professionally',
    href: 'https://www.linkedin.com/in/benjamin-michaelis/',
    iconKind: 'linkedin' as const,
  },
  {
    title: 'GitHub',
    description: 'Check out my open source projects',
    href: 'https://github.com/BenjaminMichaelis',
    iconKind: 'github' as const,
  },
  {
    title: 'Twitter',
    description: 'Follow me for updates and insights',
    href: 'https://x.com/benmichaelis',
    iconKind: 'twitter' as const,
  },
  {
    title: 'Blog',
    description: 'Visit my blog for articles and updates',
    href: 'https://benjamin.michaelis.net',
    iconKind: 'globe' as const,
  },
  {
    title: 'Email',
    description: 'Get in touch via email',
    href: 'mailto:benjamin@intellitect.com',
    iconKind: 'mail' as const,
  },
]

export default function BuildingCustomMcpServersPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Building Custom MCP Servers in .NET
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Connect with Benjamin Michaelis &mdash;{' '}
          <Link href="/links/boise-code-camp" className="text-primary-500 hover:text-primary-600">
            Boise Code Camp
          </Link>
        </p>
      </div>
      <div className="container py-12">
        <div className="mx-auto max-w-2xl space-y-4">
          {links.map((link) => (
            <LinkCard
              key={link.title}
              title={link.title}
              description={link.description}
              href={link.href}
              iconKind={link.iconKind}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
