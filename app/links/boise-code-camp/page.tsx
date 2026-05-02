import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'

export const metadata = genPageMetadata({
  title: 'Boise Code Camp',
  description: 'Links for Boise Code Camp talks by Benjamin Michaelis and Mark Michaelis',
})

const talks = [
  {
    title: 'Future Of Software Engineering',
    description: 'Benjamin Michaelis & Mark Michaelis',
    href: '/links/boise-code-camp/future-of-software-engineering',
  },
  {
    title: 'Mastering the Agentic Coding Workflow',
    description: 'Benjamin Michaelis & Mark Michaelis',
    href: '/links/boise-code-camp/mastering-the-agentic-coding-workflow',
  },
  {
    title: 'Building Custom MCP Servers in .NET',
    description: 'Benjamin Michaelis',
    href: '/links/boise-code-camp/building-custom-mcp-servers-in-dotnet',
  },
]

export default function BoiseCodeCampPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Boise Code Camp
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Links for all talks — select a session to connect with the speakers
        </p>
      </div>
      <div className="container py-12">
        <div className="mx-auto max-w-2xl space-y-4">
          {talks.map((talk) => (
            <Link
              key={talk.title}
              href={talk.href}
              className="hover:border-primary-500 dark:hover:border-primary-400 block w-full rounded-lg border-2 border-gray-200 p-4 transition-colors dark:border-gray-700"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {talk.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{talk.description}</p>
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
          ))}
        </div>
      </div>
    </div>
  )
}
