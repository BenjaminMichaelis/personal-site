import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="my-6 flex flex-col gap-x-12 lg:mb-12 lg:flex-row">
        <div className="flex flex-col items-start justify-start space-y-6 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
          <div className="space-y-4 md:border-r-2 md:border-gray-200 dark:md:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-100">
              Benjamin Michaelis
            </h1>
            <p className="text-primary-500 mr-2 w-96 text-sm tracking-wider uppercase">
              {siteMetadata.description}
            </p>
          </div>
          <div className="max-w-xl space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              Hi, I’m Ben 👋 a software engineer at
              <a href="https://intellitect.com" className="text-blue-600 dark:text-blue-400">
                {' '}
                IntelliTect
              </a>
              . I love building{' '}
              <strong>cloud-native systems, developer tools, and full-stack .NET apps</strong>
              that make life easier for developers and help teams ship faster.
            </p>
            <p>
              I maintain
              <a href="https://essentialcsharp.com" className="text-blue-600 dark:text-blue-400">
                {' '}
                EssentialCSharp.com
              </a>{' '}
              and co-author <em>Essential C#</em>. Teaching and sharing what I learn keeps me
              energized, whether it's in a classroom at Eastern Washington University, mentoring at
              IntelliTect, or writing here on this blog.
            </p>
            <p>
              Over the years, I've worked on systems in higher education, utilities, finance, and
              startups. Along the way, I've also helped build IntelliTect products like
              <a href="https://stormingcastle.com" className="text-blue-600 dark:text-blue-400">
                {' '}
                StormingCastle.com
              </a>
              .
            </p>

            <p>
              Outside of code, you'll usually find me on a trail, behind a camera, planning my next
              trip, or just enjoying time with friends and family. This site is my place to share
              what I'm building, learning, and sometimes just what I find fun.
            </p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
            Latest Writing
          </h2>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h3>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
