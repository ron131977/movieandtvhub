import React, { useEffect, useRef, useState } from "react";
import path from "path";
import fs from "fs/promises";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from 'next/image';
import Script from "next/script";
import Link from "next/link"; // Ensure you import Link from Next.js
import SocialSharing from "../../components/SocialSharing";
// Helper function to create a slug from a title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with dashes
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}

// This function generates the paths for static generation
export async function getStaticPaths() {
  try {
    const filePath = path.join(process.cwd(), "public", "movies.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const moviesData = JSON.parse(jsonData);

    // Generate slugs and create paths for each movies item
    const paths = moviesData.map((moviesItem) => ({
      params: { id: generateSlug(moviesItem.title) }, // Use the slug as the dynamic route part
    }));

    return {
      paths,
      fallback: false, // Set to false to return 404 if the slug doesn't exist
    };
  } catch (error) {
    console.error("Error reading movies.json", error);
    return { paths: [], fallback: false };
  }
}

// Fetching specific movies data based on the dynamic slug (id)
export async function getStaticProps({ params }) {
  try {
    const filePath = path.join(process.cwd(), "public", "movies.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const moviesData = JSON.parse(jsonData);

    // Find the movies item based on the slug in the URL
    const moviesItem = moviesData.find(
      (item) => generateSlug(item.title) === params.id
    );

    if (!moviesItem) {
      return { notFound: true }; // Return 404 if the movies item is not found
    }

    return {
      props: {
        moviesItem, // Pass the movies item as a prop to the page
      },
    };
  } catch (error) {
    console.error("Error fetching movies item", error);
    return { notFound: true };
  }
}

const moviesSchema = (moviesItem) => 
  JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${moviesItem.siteurl}/#website`,
        url: moviesItem.siteurl,
        name: "Movie And Tv Hub™ - Online. Stream. Download.",
        publisher: {
          "@type": "Organization",
          "@id": "https://movieandtvhub.vercel.app/#organization"
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://movieandtvhub.vercel.app/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        inLanguage: "en-US"
      },
      {
        "@type": "WebPage",
        "@id": `${moviesItem.siteurl}/#webpage`,
        url: moviesItem.siteurl,
        name: "Movie And Tv Hub™ - Online. Stream. Download.",
        isPartOf: {
          "@id": "https://movieandtvhub.vercel.app/#website"
        },
        primaryImageOfPage: {
          "@id": "https://movieandtvhub.vercel.app/#primaryimage"
        },
        image: {
          "@id": "https://movieandtvhub.vercel.app/#primaryimage"
        },
        thumbnailUrl: "https://movieandtvhub.vercel.app/og_image.jpg",
        datePublished: moviesItem.datePublished,
        dateModified: moviesItem.dateModified,
        breadcrumb: {
          "@id": "https://movieandtvhub.vercel.app/#breadcrumb"
        },
        inLanguage: "en-US",
        potentialAction: [
          {
            "@type": "ReadAction",
            target: [moviesItem.siteurl]
          }
        ]
      },
      {
        "@type": "Article",
        "@id": `${moviesItem.siteurl}/#article`,
        url: moviesItem.siteurl,
        headline: moviesItem.title,
        datePublished: moviesItem.datePublished,
        dateModified: moviesItem.dateModified,
        author: {
          "@type": "Person",
          "@id": "https://gravatar.com/drtrailer2022",
          name: "Dr Trailer",
          url: "https://gravatar.com/drtrailer2022",
          image: {
            "@type": "ImageObject",
            "@id": "https://gravatar.com/drtrailer2022",
            url: "https://gravatar.com/drtrailer2022",
            caption: "Dr Trailer",
            inLanguage: "en-US"
          }
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://movieandtvhub.vercel.app/#organization",
          name: "Movie And Tv Hub™ - Online. Stream. Download.",
          url: "https://movieandtvhub.vercel.app"
        },
        image: {
          "@id": "https://movieandtvhub.vercel.app/#primaryimage"
        }
      },
      {
        "@type": "ImageObject",
        "@id": "https://movieandtvhub.vercel.app/#primaryimage",
        url: "https://movieandtvhub.vercel.app/og_image.jpg",
        contentUrl: "https://movieandtvhub.vercel.app/og_image.jpg",
        width: 1280,
        height: 720
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://movieandtvhub.vercel.app/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://movieandtvhub.vercel.app/"
          }
        ]
      }
    ]
  });
  
  export default function MoviesArticle({ moviesItem, videoSources = [] }) {
  const schemaData = moviesSchema(moviesItem); 
  const router = useRouter();

  const [accordionExpanded, setAccordionExpanded] = useState(false); // Added state for the accordion
  const [seconds, setSeconds] = useState(10);
  const [showTimer, setShowTimer] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  // const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const playerRef = useRef(null);
  const dailymotionPlayerRef = useRef(null); // Reference for Dailymotion player
  const [playerReady, setPlayerReady] = useState(false);
  const { movie1, movies2, image1, downloadlink, dailymovies } =
    moviesItem || {}; // Ensure `moviesItem` is defined
    const fullscreenRef = useRef(null);

    const handlePlayerSelect = (index) => {
      setCurrentPlayerIndex(index);
  
    // Trigger full-screen mode
    if (fullscreenRef.current) {
      fullscreenRef.current.requestFullscreen?.();
      fullscreenRef.current.webkitRequestFullscreen?.();
      fullscreenRef.current.mozRequestFullScreen?.();
      fullscreenRef.current.msRequestFullscreen?.();
    }
  };

  const handleExitFullscreen = () => {
    setCurrentPlayerIndex(null);

    // Exit full-screen mode
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      document.webkitExitFullscreen?.();
      document.mozCancelFullScreen?.();
      document.msExitFullscreen?.();
    }
  };
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);

  // Fetch current video and ID
  const currentVideoId = Array.isArray(movie1)
    ? movie1[currentEpisodeIndex] || ""
    : "";
  Array.isArray(dailymovies) ? dailymovies[currentEpisodeIndex] || "" : "";
  const id = Array.isArray(movies2) ? movies2[currentEpisodeIndex] || "" : "";

  // Get video sources for the current episode
  const currentVideoData = videoSources?.[currentEpisodeIndex] || {};
  const currentVideoSources = currentVideoData?.urls || [];
  const src = currentVideoSources?.[currentPlayerIndex] || ""; // Default to an empty string

  
  // Define URLs for different players
  const urls = [
    `https://short.ink/${currentVideoId}?thumbnail=${image1}`,
    `https://geo.dailymotion.com/player/xjrxe.html?video=${dailymovies}&mute=true&Autoquality=1080p`,
    // `https://vidsrc.me/embed/movie?imdb=${id}`,
    // `https://embed.su/embed/movie/${id}`,
    `https://vidsrc.cc/v2/embed/movie/${id}`,
    // `https://ffmovies.lol/movies/?imdb=${id}`,
    // `https://autoembed.co/movie/imdb/${id}`,
    // `https://multiembed.mov/directstream.php?video_id=${id}`,
  ];

  // Handle navigating to the next episode
  const handleNextEpisode = () => {
    setCurrentEpisodeIndex(
      (prevIndex) => (prevIndex + 1) % videoSources.length
    );
  };

  // Handle navigating to the previous episode
  const handlePreviousEpisode = () => {
    setCurrentEpisodeIndex(
      (prevIndex) => (prevIndex - 1 + videoSources.length) % videoSources.length
    );
  };

  // Handle selecting a specific player
  // const handlePlayerSelect = (index) => {
  //   setCurrentPlayerIndex(index);
  // };

  const handleStartTimer = () => {
    setShowTimer(true);
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const toggleAccordion = () => {
    setAccordionExpanded(!accordionExpanded); // Toggle the accordion state
  };

 

  // Handle navigation back to main movies section
  const goBackToMain = () => {
    router.push("/");
  };

  useEffect(() => {
    const loadYouTubeAPI = () => {
      return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
          resolve();
        } else {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          tag.onload = () => {
            window.onYouTubeIframeAPIReady = resolve;
          };
          document.body.appendChild(tag);
        }
      });
    };

    loadYouTubeAPI().then(() => {
      // Initialize first video player
      if (moviesItem.source && moviesItem.source !== "#") {
        new window.YT.Player("player-0", {
          videoId: moviesItem.source,
          playerVars: {
            playsinline: 1,
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: moviesItem.source,
          },
        });
      }

      // Initialize second video player
      if (moviesItem.source1 && moviesItem.source1 !== "#") {
        new window.YT.Player("player-1", {
          videoId: moviesItem.source1,
          playerVars: {
            playsinline: 1,
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: moviesItem.source1,
          },
        });
      }
    });
  }, [moviesItem]);


  
  
  return (
    <>
      <Head>
      <title>Movie And Tv Hub™ – {moviesItem.title || "Default Title"}</title>

        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https://movieandtvhub.vercel.app/sitemap.xml"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="googlebot" content="index,follow" />
        <meta name="revisit-after" content="1 days" />
        <meta name="referrer" content="origin" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
         <meta
          property="og:keywords"
          content="JustWatch 2024,Movie And Tv Hub, Justwatch US,JustWatch Tv Shows,JustWatch Webseries,JustWatch Movies,JustWatch 2024,Netflix Free,MovieRulz,7MovieRulz 2024,5MovieRulz."
        />
         <meta   name="keywords" content={moviesItem.keywords} />
        <meta
          property="og:description"
          content="Stream HD movies and TV series for free on Movie And Tv Hub™. Explore, stream, and download full-length movies and shows in HD quality without registration."
        />
        <meta
          name="description"
          content="Stream HD movies and TV series for free on Movie And Tv Hub™. Explore, stream, and download full-length movies and shows in HD quality without registration."
        />
        <link rel="canonical" href={moviesItem.siteurl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content=" Movie And Tv Hub™ - Online. Stream. Download. "
        />
        <meta property="og:url" content={moviesItem.siteurl} />

        <meta
          property="og:site_name"
          content=" Movie And Tv Hub™ - Online. Stream. Download. "
        />
        <meta
          property="og:image"
          content="https://movieandtvhub.vercel.app/og_image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpg" />
        <meta
          name="application-name"
          content=" Movie And Tv Hub™ - Online. Stream. Download. "
        />
        <meta
          property="article:modified_time"
          content="2024-01-01T13:13:13+00:00"
        />
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="https://movieandtvhub.vercel.app/sitemap.xml"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content=" Movie And Tv Hub™ - Online. Stream. Download."
        />
        <meta
          name="twitter:description"
          content="Stream HD movies and TV series for free on Movie And Tv Hub™. Explore, stream, and download full-length movies and shows in HD quality without registration."
        />
        <meta
          name="twitter:image"
          content="https://movieandtvhub.vercel.app/og_image.jpg"
        />
        <meta
          name="google-site-verification"
          content="o8uNsADswyHnNPA69n9gI7u6L4_cdjN4iT5lRhHHtMU"
        />

        <meta
          name="facebook-domain-verification"
          content="du918bycikmo1jw78wcl9ih6ziphd7"
        />
        <meta
          name="dailymotion-domain-verification"
          content="dm3bs67ukdegz9qik"
        />
        <meta name="monetag" content="98a412cb5612b9188cd76b9744304b6c" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaData }}
        />
      </Head>
      <SocialSharing />
      <Script src="../../../propler/ads.js" defer />
      <Script src=".../../../propler/ads2.js" defer />
      <div style={styles.container}>
        {/* Pagination Button to Return to Main Section */}
        <div style={styles.paginationContainer}>
          <button onClick={goBackToMain} style={styles.pageButton}>
            Back to Main Section
          </button>
        </div>

        <h1 style={styles.title}>{moviesItem.title}</h1>
      
 {/* Description Section */}
 {moviesItem.synopsis && (
          <p style={styles.synopsis}>{moviesItem.synopsis}</p>
        )}
        {/* Description Section
        {moviesItem.description && (
          <p style={styles.description}>{moviesItem.description}</p>
        )} */}

        {/* Image Section */}
        {/* {moviesItem.image && (
          <img src={moviesItem.image} alt={moviesItem.title} style={styles.image} />
        )} */}
  {/* Image Section */}
  {moviesItem.image && (
          <Image
            src={moviesItem.image}
            alt={moviesItem.title}
           // style={styles.image}
           width={250} // Adjust the width according to your needs
           height={450} // Adjust the height according to your needs
           quality={90}
           style={{
            //  width: "400px", // Ensures the image is displayed at this width
            //  height: "500px", // Ensures the image is displayed at this height
            //  objectFit: "cover", // Ensures the image covers the dimensions
             margin: "auto",
             borderRadius: "50px", // Rounded corners for the image
             boxShadow: "0 0 10px 0 #000", // Shadow effect
             filter:
               "contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)", // Image filter effects
           }}
          />
        )}
        {/* {moviesItem.source && moviesItem.source !== "#" ? (
           <div style={styles.source}>
           <h2
             className="text-3xl mt-2"
             style={{
               fontFamily: "Poppins, sans-serif",
               fontWeight: "bold",
               textAlign: "center",
               textShadow: "1px 1px 0px #000",
               marginTop: "50px",
               marginBottom: "50px",
             }}
           >
             {" "}
             Watch Official Trailer.
           </h2>
        </div> */}
  {/* First YouTube Video */}
  {moviesItem.source && moviesItem.source !== "#" && (
        <div style={styles.source}>
          <h2
             className="text-3xl mt-2"
             style={{
               fontFamily: "Poppins, sans-serif",
               fontWeight: "bold",
               textAlign: "center",
               textShadow: "1px 1px 0px #000",
               marginTop: "50px",
               marginBottom: "50px",
             }}
           >
             {" "}
             Watch Official Trailer.
           </h2>
          <div id="player-0" style={styles.youtubePlayer}></div>
        </div>
      )}      
        {/* Image 1 Section */}
        {/* {moviesItem.image1 && <img src={moviesItem.image1} alt="Additional" style={styles.image} />} */}

        {/* Second YouTube Video */}
        {/* {moviesItem.source1 && moviesItem.source1 !== "#" && (
          <div style={styles.source}>
            <div id="player-1" style={styles.youtubePlayer}></div>
          </div>
        )} */}
        {/* second Description */}
        {/* {moviesItem.description2 && <p style={styles.description2}>{moviesItem.description2}</p>} */}
        {/* Embed MP3 Player and Podcast Indicator */}
        {(moviesItem.pod || moviesItem.mp3) && (
          <div style={styles.podcastContainer}>
            {/* Podcast Indicator and YouTube Player */}
            {moviesItem.pod && (
              <div style={styles.podcastWrapper}>
                <div style={styles.podcastIndicator}>
                  <span
                    role="img"
                    className="animate-pulse"
                    aria-label="Podcast"
                    style={styles.podcastIcon}
                  >
                    🎙️
                  </span>
                  Podcast
                </div>
              {/* First YouTube Video */}
      {moviesItem.source && moviesItem.source !== "#" && (
        <div style={styles.source}>
          <div id="player-0" style={styles.youtubePlayer}></div>
        </div>
      )}
              </div>
            )}

            {/* MP3 Player */}
            {moviesItem.mp3 && (
              <div style={styles.audioWrapper}>
                <div style={styles.podcastIndicator}>
                  <span
                    role="img"
                    className="animate-pulse"
                    aria-label="Podcast"
                    style={styles.podcastIcon}
                  >
                    🎙️
                  </span>
                  Podcast
                </div>
                {/* <audio controls style={styles.audioPlayer}>
                <source src={moviesItem.mp3} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio> */}
                {/* MP3 Player */}
                <audio controls width="100%" height="50">
                  <source src={moviesItem.mp3} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        )}

         {/* Player selection buttons */}
         {currentPlayerIndex === null && (
        <div style={styles.playerButtonContainer}>
          {urls.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePlayerSelect(index)}
              style={{
                ...styles.playerButton,
                ...(currentPlayerIndex === index
                  ? styles.activePlayerButton
                  : {}),
              }}
            >
              Player {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Full-screen video player */}
      {currentPlayerIndex !== null && (
        <div ref={fullscreenRef} style={styles.fullscreenContainer}>
          <button style={styles.backButton} onClick={handleExitFullscreen}>
            Back
          </button>
          <iframe
            style={styles.iframe}
            src={urls[currentPlayerIndex] || ""}
            allowFullScreen
            scrolling="no"
            title={`Player ${currentPlayerIndex + 1}`}
          ></iframe>
        </div>
      )}
    </div>
    

      {/* Download Section */}
      <div className={styles.container}>
        <h2
          className="px-0 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-3xl hover:text-blue-800 font-bold mt-2"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Click to Download {moviesItem?.name}
        </h2>

        <div
          className="flex flex-col items-center justify-center"
          style={{
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          {!showTimer ? (
            // Initial Download Now button, starts countdown
            <button
              onClick={handleStartTimer} // Starts countdown
              className="animate-pulse bg-gradient-to-r from-pink-500 to-amber-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 text-xl mb-4"
              style={{
                marginBottom: "20px",
              }}
            >
              Download Now
            </button>
          ) : (
            <>
              {/* Countdown display after button is clicked */}
              {seconds > 0 ? (
                <p
                  className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold mb-4"
                  style={{ marginTop: "50px" }}
                >
                  Your download link will be ready in {seconds} seconds...
                </p>
              ) : (
                <p
                  className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold mb-4"
                  style={{ marginTop: "50px" }}
                >
                  Your download links are ready.
                </p>
              )}

              {/* Display all the download links after countdown finishes */}
              {seconds === 0 && downloadlink && (
                <div className="flex flex-col items-center w-full">
                  {/* Iterate through the downloadlink array and display each link as a button */}
                  {Array.isArray(downloadlink) && downloadlink.length > 0 ? (
                    downloadlink.map((link, index) => (
                      <Link
                        key={index}
                        href={link}
                        target="_blank"
                        className="bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-amber-600 hover:to-pink-600 transition duration-300 mb-4 w-full sm:w-auto"
                      >
                        Download Link
                      </Link>
                    ))
                  ) : (
                    <p className="text-xl font-bold text-red-500">
                      No download links available.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
  },
  title: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "20px",
    color: "#007bff",
    fontWeight: "bold",
    textShadow: "1px 1px 0px #000",
  },
  date: {
    fontSize: "1.3rem",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
    textShadow: "1px 1px 0px #000",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
  },
  courtesy: {
    fontSize: "1.3rem",
    textAlign: "center",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
    marginBottom: "30px",
    fontWeight: "bold",
    textShadow: "1px 1px 0px #000",
  },
  synopsis: {
    fontSize: "1.5rem",
    lineHeight: "1.6",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
  },
  description1: {
    fontSize: "1.3rem",
    lineHeight: "1.6",
    marginBottom: "20px",
    fontWeight: "bold",
    textShadow: "1px 1px 0px #000",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
  },
  description2: {
    fontSize: "1.3rem",
    lineHeight: "1.6",
    marginBottom: "20px",
    fontWeight: "bold",
    textShadow: "1px 1px 0px #000",
    color: "var(--text-secondary-color)", // Dynamic secondary text color
  },
  image: {
    // width: "100%",
    height: "400px",
    maxWidth: "800px",
    margin: "20px auto",
    display: "block",
    borderRadius: "8px",
    boxShadow: "0 0 10px 0 #000",
    filter: "contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)",
  },
  image1: {
    width: "100%",
    maxWidth: "800px",
    margin: "20px auto",
    display: "block",
    borderRadius: "8px",
    boxShadow: "0 0 10px 0 #000",
    filter: "contrast(1.1) saturate(1.1) brightness(1.0) hue-rotate(0deg)",
  },
  source: {
    marginBottom: "40px",
  },
  youtubePlayer: {
    width: "100%",
    maxWidth: "800px",
    margin: "20px auto",
    display: "block",
    borderRadius: "8px",
    height: "450px",
    boxShadow: "0 0 10px 0 #000",
    filter: "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)",
  },
  podcastContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  podcastWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "10px",
  },
  podcastIndicator: {
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "bold",
    marginRight: "15px",
    marginLeft: "15px",
  },
  podcastIcon: {
    fontSize: "36px",
    marginRight: "8px",
  },
  youtubeEmbed: {
    borderRadius: "5px",
    marginLeft: "10px",
    boxShadow: "0 0 10px 0 #000",
    filter: "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)",
  },
  audioWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20px",
  },
  iframeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    aspectRatio: "16/9", // Maintain the 16:9 aspect ratio
    position: "relative",
    backgroundColor: "#000", // Optional: black background for the iframe area
    borderRadius: "8px", // Add a rounded corner effect
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)", // Add a subtle shadow for aesthetics
    overflow: "hidden", // Ensures the iframe doesn't overflow its container
    zIndex: 9999, // Ensure the container is above all elements
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
    position: "absolute",
    top: 0,
    left: 0,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap", // Ensures buttons wrap on smaller screens
  },

  episodeButton: {
    padding: "10px 20px",
    backgroundColor: "#e0e0e0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  },

  playerButtonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap", // Wrap buttons for smaller screens
  },

  playerButton: {
    padding: "10px 20px",
    backgroundColor: "#d6d6d6",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
    cursor: "pointer",
    transition: "all 0.3s",
  },

  activePlayerButton: {
    backgroundColor: "#f44336",
    color: "#fff",
  },
  audioPlayer: {
    width: "100%",
    maxWidth: "600px",
    display: "block",
    margin: "0 auto",
  },
  paginationContainer: { marginTop: "30px", textAlign: "center" },
  pageButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    textShadow: "1px 1px 0px #000",
    fontSize: "20px",
    fontWeight: "bold",
  },
  fullscreenContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  // backButton: {
  //   position: "absolute",
  //   top: "20px",
  //   left: "20px",
  //   zIndex: 1100,
  //   padding: "10px 15px",
  //   backgroundColor: "#FF5733",
  //   color: "#fff",
  //   border: "none",
  //   borderRadius: "5px",
  //   cursor: "pointer",
  //   fontSize: "16px",
  // },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#FF5733",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    marginTop:"20px",
    zIndex: 1100,
    alignItems: "center", // Centers vertically
  },
   // source: { margin: "20px" },
  // title: { fontSize: "20px", textAlign: "center" },
  youtubePlayer: { width: "100%", height: "460px",  filter: "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)", },
  dailymotionPlayer: { width: "100%", height: "460px",  filter: "contrast(1.1) saturate(1.2) brightness(1.3) hue-rotate(0deg)"},
  noVideo: { color: "red", textAlign: "center" },
};
