import { genPageMetadata } from 'app/seo'
import LinkCard from '@/components/LinkCard'
import Link from '@/components/Link'

export const metadata = genPageMetadata({
  title: 'Mastering the Agentic Coding Workflow - Boise Code Camp',
  description: 'Resources and links from Benjamin & Mark Michaelis\u2019s talk at Boise Code Camp',
})

const talkLinks = [
  {
    title: 'Session Feedback',
    description: 'Share your feedback on this talk \u2014 it really helps!',
    href: 'https://sfeedback.com/C04Y74',
    iconKind: 'globe' as const,
  },
  {
    title: 'Schedule',
    description: 'View the full Boise Code Camp schedule',
    href: 'https://boisecodecamp.com/#/schedule',
    iconKind: 'globe' as const,
  },
  {
    title: 'Email Us',
    description: 'Reach both Benjamin and Mark directly',
    href: 'mailto:benjamin@intellitect.com,mark@intellitect.com',
    iconKind: 'mail' as const,
  },
]

const benjaminLinks = [
  {
    title: 'Benjamin on LinkedIn',
    description: 'Connect with Benjamin professionally',
    href: 'https://www.linkedin.com/in/benjamin-michaelis/',
    iconKind: 'linkedin' as const,
  },
  {
    title: 'Benjamin on GitHub',
    description: 'Check out Benjamin\u2019s open source projects',
    href: 'https://github.com/BenjaminMichaelis',
    iconKind: 'github' as const,
  },
]

const markLinks = [
  {
    title: 'Mark on Facebook',
    description: 'Connect with Mark on Facebook',
    href: 'https://fb.com/MarkMichaelis',
    iconKind: 'facebook' as const,
  },
]

const intellitectLinks = [
  {
    title: 'IntelliTect',
    description: 'Visit IntelliTect \u2014 where we build software that matters',
    href: 'https://intellitect.com',
    iconKind: 'globe' as const,
  },
]

const sections = [
  { heading: 'Talk Resources', links: talkLinks },
  { heading: 'Connect with Benjamin', links: benjaminLinks },
  { heading: 'Connect with Mark', links: markLinks },
  { heading: 'IntelliTect', links: intellitectLinks },
]

export default function MasteringAgenticCodingWorkflowPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Mastering the Agentic Coding Workflow
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Connect with the speakers &mdash;{' '}
          <Link href="/links/boise-code-camp" className="text-primary-500 hover:text-primary-600">
            Boise Code Camp
          </Link>
        </p>
      </div>
      <div className="container py-12">
        <div className="mx-auto max-w-2xl space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-sm font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.links.map((link) => (
                  <LinkCard
                    key={link.title}
                    title={link.title}
                    description={link.description}
                    href={link.href}
                    iconKind={link.iconKind}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
