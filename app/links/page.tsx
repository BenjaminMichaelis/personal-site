import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import LinkCard from '@/components/LinkCard'

export const metadata = genPageMetadata({
  title: 'Links',
  description: 'All my links in one place',
})

export default function LinksPage() {
  const links = [
    {
      title: '.NET Conf 2025 Feedback',
      description: 'Share your thoughts on my presentation at .NET Conf 2025',
      href: 'https://szfb.me/WZ4i5J',
      imageSrc: '/static/images/dotnet-logo.png',
    },
    {
      title: 'TRX to VS Playlist Github Action',
      description: 'Automate TRX to VS Playlist conversion in your CI/CD pipeline',
      href: 'https://github.com/marketplace/actions/trx-to-vs-playlist-converter',
      iconKind: 'github' as const,
    },
    {
      title: 'TRX to VS Playlist dotnet tool and library',
      description: 'Convert TRX test result files to Visual Studio Playlist format',
      href: 'https://github.com/BenjaminMichaelis/VS.TestPlaylistTools',
      iconKind: 'github' as const,
    },
    {
      title: 'LinkedIn',
      description: 'Connect with me professionally',
      href: siteMetadata.linkedin,
      iconKind: 'linkedin' as const,
    },
    {
      title: 'Twitter',
      description: 'Follow me on Twitter for updates and insights',
      href: siteMetadata.twitter,
      iconKind: 'twitter' as const,
    },
    {
      title: 'Website',
      description: 'Visit my blog for articles and updates',
      href: siteMetadata.siteUrl,
      iconKind: 'globe' as const,
    },
    {
      title: 'Email',
      description: 'Get in touch via email',
      href: `mailto:${siteMetadata.email}`,
      iconKind: 'mail' as const,
    },
    {
      title: 'Essential C#',
      description: 'Your ultimate guide to mastering C# programming',
      href: 'https://essentialcsharp.com',
      imageSrc: '/static/images/EssentialCSharp.png',
    },
    {
      title: 'GitHub',
      description: 'Check out my open source projects',
      href: siteMetadata.github,
      iconKind: 'github' as const,
    },
  ].filter((link): link is typeof link & { href: string } => Boolean(link.href))

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Links
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            All my links in one place - connect with me on various platforms
          </p>
        </div>
        <div className="container py-12">
          <div className="mx-auto max-w-2xl space-y-4">
            {links.map((link) => (
              <LinkCard
                key={link.href}
                title={link.title}
                description={link.description}
                href={link.href}
                iconKind={link.iconKind}
                imageSrc={link.imageSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
