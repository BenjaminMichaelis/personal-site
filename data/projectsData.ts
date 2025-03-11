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
    title: 'Essential C# Source Code',
    description: 'The source code for all the examples and lessons in the Essential C# book.',
    imgSrc: '/static/images/EssentialCSharp.png',
    href: 'https://github.com/IntelliTect/EssentialCSharp',
  },
  {
    title: 'C# Multitool Library',
    description: 'Library of useful additions to your C# application',
    imgSrc: '/static/images/nuget.svg',
    href: 'https://www.nuget.org/packages/IntelliTect.Multitool',
  },
]

export default projectsData
