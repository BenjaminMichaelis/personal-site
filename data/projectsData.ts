interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

// Images are ideally 16x9 aspect ratio
const projectsData: Project[] = [
  {
    title: 'Essential C# Web Site',
    description: `Your ultimate guide to mastering C# programming. As the key maintainer, I oversee dynamic content generation, source code examples, and content updates. While working with a talented team, I ensure a seamless experience for users, from beginners to experts, by providing up-to-date and comprehensive resources to enhance their C# skills.`,
    imgSrc: '/static/images/EssentialCSharp.png',
    href: 'https://essentialcsharp.com/',
  },
  {
    title: 'C# Multitool Library',
    description: 'Library of useful additions to your C# application',
    href: 'https://www.nuget.org/packages/IntelliTect.Multitool',
  },
  {
    title: 'TRX to VS Playlist',
    description: 'Convert TRX test results to Visual Studio .vsplaylist for focused runs.',
    href: 'https://github.com/BenjaminMichaelis/trx-to-vsplaylist',
  },
  {
    title: '.NET Templates',
    description: 'Opinionated dotnet new templates for faster project bootstrapping.',
    href: 'https://github.com/BenjaminMichaelis/DotnetTemplates',
  },
  {
    title: 'Essential C# Source Code',
    description: 'The source code for all the examples and lessons in the Essential C# book.',
    href: 'https://github.com/IntelliTect/EssentialCSharp',
  },
  {
    title: 'TrxLib',
    description: 'Lightweight .NET library for parsing and working with TRX test result files.',
    href: 'https://github.com/BenjaminMichaelis/TrxLib',
  },
  {
    title: 'VS.TestPlaylistTools',
    description: 'Utilities for generating and manipulating Visual Studio test playlist files.',
    href: 'https://github.com/BenjaminMichaelis/VS.TestPlaylistTools',
  },
]

export default projectsData
