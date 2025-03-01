import React from 'react'
import Head from 'next/head'
import Script from 'next/script'

const contact = () => {
  const rankMathSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://gravatar.com/drtrailer2022',
        name: 'Dr Trailer',
        url: 'https://gravatar.com/drtrailer2022',
        image: {
          '@type': 'ImageObject',
          '@id': 'https://gravatar.com/drtrailer2022',
          url: 'https://gravatar.com/drtrailer2022',
          caption: 'Dr Trailer',
          inLanguage: 'en-US'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://movieandtvhub.vercel.app/#organization',
        name: 'Movie And Tv Hub™ - Online. Stream. Download.',
        url: 'https://movieandtvhub.vercel.app'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://movieandtvhub.vercel.app/#website',
        url: 'https://movieandtvhub.vercel.app',
        name: 'Movie And Tv Hub™ - Online. Stream. Download.',
        publisher: {
          '@type': 'Organization',
          '@id': 'https://movieandtvhub.vercel.app/#organization'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://movieandtvhub.vercel.app/?s={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'WebPage',
        '@id': 'https://movieandtvhub.vercel.app/#webpage',
        url: 'https://movieandtvhub.vercel.app/',
        name: 'Movie',
        datePublished: '2024-01-13T13:00:00+00:00',
        dateModified: '2024-01-13T13:13:00+00:00',
        about: {
          '@type': 'Person',
          '@id': 'https://gravatar.com/drtrailer2022',
          name: 'Dr Trailer',
          url: 'https://gravatar.com/drtrailer2022',
          image: {
            '@type': 'ImageObject',
            '@id': 'https://gravatar.com/drtrailer2022',
            url: 'https://gravatar.com/drtrailer2022',
            caption: 'Dr Trailer',
            inLanguage: 'en-US'
          }
        },
        isPartOf: {
          '@id': 'https://movieandtvhub.vercel.app/#website'
        },
        inLanguage: 'en-US',
        mainEntity: [
          {
            '@type': 'Article',
            '@id': 'https://movieandtvhub.vercel.app/',
            url: 'https://movieandtvhub.vercel.app/',
            headline: 'Movie',
            datePublished: '2024-01-13T13:00:00+00:00',
            dateModified: '2024-01-13T13:13:00+00:00',
            author: {
              '@type': 'Person',
              '@id': 'https://gravatar.com/drtrailer2022',
              name: 'Dr Trailer',
              url: 'https://gravatar.com/drtrailer2022',
              image: {
                '@type': 'ImageObject',
                '@id': 'https://gravatar.com/drtrailer2022',
                url: 'https://gravatar.com/drtrailer2022',
                caption: 'Dr Trailer',
                inLanguage: 'en-US'
              }
            },
            publisher: {
              '@type': 'Organization',
              '@id': 'https://movieandtvhub.vercel.app/#organization',
              name: 'Movie And Tv Hub™ - Online. Stream. Download.',
              url: 'https://movieandtvhub.vercel.app'
            }
          },
          {
            '@type': 'Article',
            '@id': 'https://movieandtvhub.vercel.app/',
            url: 'https://movieandtvhub.vercel.app/',
            headline: 'Tvshow',
            datePublished: '2024-01-13T13:00:00+00:00',
            dateModified: '2024-01-13T13:13:00+00:00',
            author: {
              '@type': 'Person',
              '@id': 'https://gravatar.com/drtrailer2022',
              name: 'Dr Trailer',
              url: 'https://gravatar.com/drtrailer2022',
              image: {
                '@type': 'ImageObject',
                '@id': 'https://gravatar.com/drtrailer2022',
                url: 'https://gravatar.com/drtrailer2022',
                caption: 'Dr Trailer',
                inLanguage: 'en-US'
              }
            },
            publisher: {
              '@type': 'Organization',
              '@id': 'https://movieandtvhub.vercel.app/#organization',
              name: 'Movie And Tv Hub™ - Online. Stream. Download.',
              url: 'https://movieandtvhub.vercel.app'
            }
          },
          {
            '@type': 'Article',
            '@id': 'https://movieandtvhub.vercel.app/',
            url: 'https://movieandtvhub.vercel.app/',
            headline: 'Adult',
            datePublished: '2024-01-13T13:00:00+00:00',
            dateModified: '2024-01-13T13:13:00+00:00',
            author: {
              '@type': 'Person',
              '@id': 'https://gravatar.com/drtrailer2022',
              name: 'Dr Trailer',
              url: 'https://gravatar.com/drtrailer2022',
              image: {
                '@type': 'ImageObject',
                '@id': 'https://gravatar.com/drtrailer2022',
                url: 'https://gravatar.com/drtrailer2022',
                caption: 'Dr Trailer',
                inLanguage: 'en-US'
              }
            },
            publisher: {
              '@type': 'Organization',
              '@id': 'https://movieandtvhub.vercel.app/#organization',
              name: 'Movie And Tv Hub™ - Online. Stream. Download.',
              url: 'https://movieandtvhub.vercel.app'
            }
          }
        ]
      }
    ]
  })

  return (
    <div>
      <Head>
        <title>Movie And Tv Hub™ | Contact Us</title>

        <link
          rel='sitemap'
          type='application/xml'
          title='Sitemap'
          href='https://movieandtvhub.vercel.app/sitemap.xml'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <meta name='googlebot' content='index,follow' />
        <meta name='revisit-after' content='1 days' />
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <meta
          name='keywords'
          content='JustWatch 2024,Movie And Tv Hub, Justwatch US,JustWatch Tv Shows,JustWatch Webseries,JustWatch Movies,JustWatch 2024,Netflix Free,MovieRulz,7MovieRulz 2024,5MovieRulz.'
        />
        <meta
          property='description'
          content='Movie And Tv Hub™ - Stream HD movies and TV series for free on Movie And Tv Hub Online. Online. Stream. Download. full-length movies and shows in HD quality without registration.'
        />

        <link
          rel='canonical'
          href='https://movieandtvhub.vercel.app/intro/contact'
        />
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Movie And Tv Hub™ ' />
        <meta
          property='og:description'
          content='Movie And Tv Hub™ - Stream HD movies and TV series for free on Movie And Tv Hub Online. Online. Stream. Download. full-length movies and shows in HD quality without registration.'
        />
        <meta
          property='og:url'
          content='https://movieandtvhub.vercel.app/intro/contact/'
        />
        <meta property='og:site_name' content='Movie And Tv Hub™ ' />
        <meta
          property='og:image'
          content='https://movieandtvhub.vercel.app/og_image.jpg'
        />
        <meta property='og:image:width' content='1280' />
        <meta property='og:image:height' content='720' />
        <meta property='og:image:type' content='image/jpg' />
        <meta name='application-name' content='Movie And Tv Hub™ ' />
        <meta
          property='article:modified_time'
          content='2024-01-01T13:13:13+00:00'
        />
        <link
          rel='sitemap'
          type='application/xml'
          title='Sitemap'
          href='https://movieandtvhub.vercel.app/sitemap.xml'
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='google-site-verification'
          content='o8uNsADswyHnNPA69n9gI7u6L4_cdjN4iT5lRhHHtMU'
        />
        <meta
          name='facebook-domain-verification'
          content='du918bycikmo1jw78wcl9ih6ziphd7'
        />
        <meta
          name='dailymotion-domain-verification'
          content='dmdzuqt3p027t2adn'
        />
        <meta name='monetag' content='35a75bbdeae678c82776e64fb78cdac5' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: rankMathSchema }}
        />
      </Head>

      <div className='container my-24 px-6 mx-auto'>
        <section className='mb-32 text-gray-800'>
          <div className='flex flex-wrap'>
            <div className='grow-0 shrink-0 basis-auto mb-6 md:mb-0 w-full md:w-6/12 px-3 lg:px-6'>
              <a
                href='https://t.me/watchmovietvshow/'
                target='_blank'
                rel='noopener noreferrer'
                className='telegram-link'
              >
                <h3>
                  For Request or Demand Movies & TV Series Join Telegram
                  <i className='fab fa-telegram telegram-icon'></i>
                </h3>
              </a>

              <h1 className='text-3xl font-bold mb-6'>Contact Us</h1>
              <p className='text-gray-500 mb-6'>
                Feel free to use the form below to provide us with your
                feedback, suggestions, or collaboration or request inquiries
                related to Movie And Tv Hub™. We welcome your input to help us
                echance our services and offerings.
              </p>

              <p className='text-gray-500 mb-6'>
                To submit your email the following details to{' '}
                <strong>drtrailer2022@gmail.com</strong>:
              </p>
            </div>
            <div className='grow-0 shrink-0 basis-auto mb-12 md:mb-0 w-full md:w-6/12 px-3 lg:px-6'>
              <form>
                <div className='form-group mb-6'>
                  <input
                    type='text'
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='channelId'
                    placeholder='Your Name'
                    required
                  />
                </div>
                <div className='form-group mb-6'>
                  <input
                    type='url'
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='videoLink'
                    placeholder='Your Email Id'
                    required
                  />
                </div>

                <div className='form-group mb-6'>
                  <textarea
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='additionalInfo'
                    rows='3'
                    placeholder='Subject'
                  ></textarea>
                </div>
                <div className='form-group form-check text-center mb-6'>
                  <input
                    type='checkbox'
                    className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer'
                    id='sendCopy'
                  />

                  <label
                    className='form-check-label inline-block text-gray-800'
                    for='sendCopy'
                  >
                    Send me a copy of this message is a Sample Format for your
                    Email
                  </label>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default contact
