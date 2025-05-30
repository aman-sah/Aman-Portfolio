import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ReactTypingEffect from "react-typing-effect";

import Icon from "../components/Icon";
// Icons
import Html from "../components/icons/Html";
import Css from "../components/icons/Css";
import Javascript from "../components/icons/Javascript";
import Tailwind from "../components/icons/Tailwind";
import Bootstrap from "../components/icons/Bootstrap";
import Sass from "../components/icons/Sass";
import ReactJs from "../components/icons/ReactJs";
import NextJs from "../components/icons/NextJs";
import NodeJs from "../components/icons/NodeJs";
import Firebase from "../components/icons/Firebase";
import Figma from "../components/icons/Figma";
import Photoshop from "../components/icons/Photoshop";
import Illustrator from "../components/icons/Illustrator";
import AfterEffects from "../components/icons/AfterEffects";
import AdobeXd from "../components/icons/AdobeXd";
import Supabase from "../components/icons/Supabase";
import MongoDb from "../components/icons/MongoDb";
import Express from "../components/icons/Express";

// Project Card
import ProjectCard from "../components/ProjectCard";
import GitHubProfile from "../components/icons/GitHubProfile";
import TwitterProfile from "../components/icons/TwitterProfile";
import LinkedInProfile from "../components/icons/LinkedInProfile";
import DiscordProfile from "../components/icons/DiscordProfile";
import InstagramProfile from "../components/icons/InstagramProfile";
import FeaturedProjectCard from "../components/FeaturedProjectCard";

// Blog Components
import BlogList from "../components/blog/BlogList";
import BlogItem from "../components/blog/BlogItem";

// Dark Mode
import { useTheme } from "next-themes";

import { projects } from "../utils/constants";
import NewIcon from "../components/NewIcon";

const getDimensions = (ele) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = (ele) => {
  ele.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function Home({ publications }) {
  const [visibleSection, setVisibleSection] = useState();
  const [scrolling, setScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const handleResize = () => {
    if (window.innerWidth < 1024) {
    } else {
      setNavbarOpen(false);
    }
  };

  const headerRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const myWorkRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const sectionRefs = [
      { section: "home", ref: homeRef, id: 1 },
      { section: "about", ref: aboutRef, id: 2 },
      { section: "skills", ref: skillsRef, id: 3 },
      { section: "my-work", ref: myWorkRef, id: 4 },
      { section: "blog", ref: blogRef, id: 5 },
      { section: "contact", ref: contactRef, id: 6 },
    ];

    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition >= offsetTop && scrollPosition <= offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
        // console.log(visibleSection);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  // Handle Header Scroll Away
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    let timeoutId;

    const handleScrollBack = () => {
      const currentScrollPos = window.pageYOffset;

      // Delay before the header scrolls back into view
      if (currentScrollPos < scrollPosition - 50 && scrolling) {
        timeoutId = setTimeout(() => {
          setShowHeader(true);
        }, 250);
      }

      // Add an easing effect when the header scrolls into and out of view
      if (currentScrollPos > prevScrollPos + 10 && !scrolling && showHeader) {
        setScrolling(true);
      } else if (currentScrollPos < prevScrollPos - 10 && scrolling) {
        clearTimeout(timeoutId);
        setScrolling(false);
        setTimeout(() => {
          setShowHeader(false);
        }, 250);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScrollBack);
    return () => window.removeEventListener("scroll", handleScrollBack);
  }, [scrollPosition, scrolling, showHeader]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setScrolling(window.pageYOffset > 110)
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    console.log(currentTheme);
  }, [currentTheme]);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    if (currentTheme === "dark") {
      return (
        <svg
          className="w-6 h-6 transition-all duration-150 ease-in-out dark:flex dark:opacity-50 dark:group-hover:opacity-100 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-6 h-6 transition-all duration-150 ease-in-out flex text-mid group-hover:text-dark"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      );
    }
  };

  return (
    <div className="bg-white dark:bg-darker transition-all duration-150 ease-in-out">
      <div
        className={`relative w-full dark:bg-darker bg-light bg-opacity-10 overflow-auto min-h-screen transition-all duration-150 ease-in-out ${navbarOpen ? "overflow-hidden" : "overflow-auto"
          }`}
      >
        <Head>
          <title>Aman Sah | Frontend Developer & Designer</title>
          <meta
            name="description"
            content="The portfolio of frontend developer and designer, Aman Sah"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Full-screen Menu */}
        <div
          className={`fixed w-full z-50 h-screen pt-24 bg-white dark:bg-darker bg-opacity-100 transform delay-100 transition-all duration-150 ${navbarOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full"
            }`}
        >
          <div className="container relative mx-auto">
            <nav className="block ml-auto">
              <ul className="z-50 flex flex-col items-start">
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === "home"
                      ? "selected delay-200"
                      : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(homeRef.current);
                    }}
                  >
                    Home
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === "about"
                      ? "current"
                      : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(aboutRef.current);
                    }}
                  >
                    About
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === "skills"
                      ? "current"
                      : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(skillsRef.current);
                    }}
                  >
                    Skills
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === "my-work"
                      ? "current"
                      : "dark:text-light dark:hover:text-white text-mid  hover:text-mid border-b-2 border-transparent"
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(myWorkRef.current);
                    }}
                  >
                    My Work
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === "blog"
                      ? "current"
                      : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(blogRef.current);
                    }}
                  >
                    Blog
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === "contact"
                      ? "current"
                      : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(contactRef.current);
                    }}
                  >
                    Contact
                  </button>
                </li>
                <li className="z-40 block py-2 mt-6 list-none lg:inline-block">
                  <a
                    href={`mailto:danielcranney@gmail.com`}
                    className="text-lg btn-brand btn-lg group"
                  >
                    Get in touch
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Header and Nav */}
        <header
          ref={headerRef}
          // className={`header top-0 mx-auto flex items-center z-50 fixed w-full transition-all duration-150 h-20 ease-in-out ${scrolling ? "-translate-y-full" : ""
          //   } ${scrolling && !navbarOpen ? "dark:bg-darker" : "dark:bg-darker"}`}
          className={`header top-0 mx-auto flex items-center z-50 fixed w-full transition-all duration-150 h-20 ease-in-out dark:bg-darker`}
        >
          {/* Logo and Nav container */}
          <div className="container relative flex items-center mx-auto">
            {/* Logo */}
            <div className="z-50 sm:w-10 sm:h-10 w-11 h-11 flex items-center">
              <NewIcon />
            </div>
            {/* Text */}
            <div className="flex items-center ml-4">
              <p className="text-lg font-semibold font-display tracking-tight dark:text-white text-darker mb-0 transition-all duration-150 ease-in-out">
                Aman Sah
              </p>
            </div>
            {/* Nav */}
            <nav className=" sticky block ml-auto h-full">
              <ul className="z-50 flex items-center">
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${visibleSection === "home" ? "current" : "active"
                      }`}
                    onClick={() => {
                      scrollTo(homeRef.current);
                    }}
                  >
                    Home
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${visibleSection === "about" ? "current" : "active"
                      }`}
                    onClick={() => {
                      scrollTo(aboutRef.current);
                    }}
                  >
                    About
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${visibleSection === "skills" ? "current" : "active"
                      }`}
                    onClick={() => {
                      scrollTo(skillsRef.current);
                    }}
                  >
                    Skills
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${visibleSection === "my-work" ? "current" : "active"
                      }`}
                    onClick={() => {
                      scrollTo(myWorkRef.current);
                    }}
                  >
                    My Work
                  </button>
                </li>


                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <a
                    href="/Resume_Aman.pdf" // Path to your local/public resume PDF E:\4th sem\CN\WevDevProject\portfolio-aman\pages\Resume_Aman.pdf
                    download="Aman_Resume.pdf" // Custom filename for downloaded file
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`nav-item ${visibleSection === "resume" ? "current" : "active"
                      }`}
                    onClick={() => window.open("https://drive.google.com/file/d/1Shsjt2-MZbihxoKqM2IGLbtYUgQteA8K/view?usp=sharing", "_blank")}
                  >
                    Resume
                  </a>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${visibleSection === "contact" ? "current" : "active"
                      }`}
                    onClick={() => {
                      scrollTo(contactRef.current);
                    }}
                  >
                    Contact
                  </button>
                </li>
                <li className="z-50 hidden ml-5 list-none lg:inline-block">
                  <a
                    href={`mailto:danielcranney@gmail.com`}
                    className="btn-brand btn-md group"
                  >
                    Hire me
                  </a>
                </li>
                <li className="z-50 inline-block list-none lg:hidden group">
                  <button
                    className={`relative w-10 h-10 ${navbarOpen
                      ? "dark:text-white text-dark"
                      : "text-mid group-hover:text-dark dark:opacity-50 dark:group-hover:opacity-100 dark:text-white dark:group-hover:text-white"
                      } focus:outline-none`}
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${navbarOpen ? "rotate-45" : "-translate-y-1.5"
                          }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${navbarOpen ? "opacity-0" : "opacity-100"
                          }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${navbarOpen ? "-rotate-45" : "translate-y-1.5"
                          }`}
                      ></span>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
            <div className="flex mt-auto ml-0 lg:ml-5">
              {/* Dark mode */}
              <button
                className="flex items-center justify-center w-7 h-12 transition-all duration-150 ease-in rounded-sm focus:outline-none group bg-transparent outline-none"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
              >
                {renderThemeChanger()}
              </button>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="container relative z-30 mx-auto">
          {/* Hero Content */}
          <main className={`flex-col flex h-screen`} id="home" ref={homeRef}>
            {/* Main */}
            <div className="container relative flex flex-col items-start justify-center flex-grow px-0 mx-auto md:px-20 lg:px-24 section">
              <div className="w-full">
                {/* <span className="text-2xl font-semibold text-brand">
                  Hello! 👋 My name is
                </span> */}

                <h1 className="mb-2 text-5xl md:text-7xl dark:text-white text-dark">
                  Aman Sah
                </h1>
                <h2 className="mb-4 text-3xl md:text-4xl dark:text-light text-mid">
                  <ReactTypingEffect
                    typingDelay={200}
                    speed={30}
                    eraseSpeed={30}
                    eraseDelay={1500}
                    text={[
                      "Frontend Developer",
                      "Frontend Developer",
                      "Frontend Developer",
                      `Frontend Developer`,
                    ]}
                  />
                </h2>
                <p className="w-4/5 text-xl md:w-full">
                  I design and build websites that look good, and work well.
                </p>
                <button
                  className="mt-4 btn-brand btn-lg group"
                  onClick={() => {
                    scrollTo(myWorkRef.current);
                  }}
                >
                  See my Work
                </button>
              </div>
            </div>
          </main>

          {/* About */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="about"
            ref={aboutRef}
          >
            <div className="flex flex-col">
              <h2 className="text-5xl">About</h2>
              <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

              <div className="flex flex-col-reverse items-start w-full md:flex-row">
                <div className="flex flex-col w-full md:pr-8 md:w-3/5">
                  <p className="text-lg">
                    Hi! I&apos;m Aman and I&apos;m a frontend developer, designer from Bihar, India.
                  </p>
                  <p className="text-lg">
                    Currently, I&apos;m studying at Chitkara University. I built my first website at the age of seventeen and since then, I&apos;ve been passionate about working with computers and technology.
                  </p>
                  <p className="text-lg">
                    As a fresher, I&apos;m eager to apply my knowledge and skills in real-world projects. I&apos;ve been focusing on programming, building a solid frontend stack, and creating exciting projects that solve real-world problems.
                  </p>
                  <p className="text-lg">
                    I&apos;m constantly learning and keeping up with the latest trends in web development and design. Whether it&apos;s through online courses, tutorials, or personal projects, I am committed to expanding my skill set and delivering high-quality work.
                  </p>
                  <p className="text-lg">
                    In addition to my technical skills, I have a keen interest in UI/UX design, ensuring that my projects are not only functional but also visually appealing and user-friendly. My goal is to create impactful digital experiences that delight users and make a difference.
                  </p>
                  <p className="text-lg">
                    Take a look at my work below to see what I&apos;m working
                    on, and get in touch if you&apos;d like to work together!
                  </p>
                </div>
                <div className="flex w-full h-full mb-4 md:pl-8 md:w-2/5 md:mb-0">
                  <Image
                    src="/headshot1.jpg"
                    className="overflow-hidden rounded-md"
                    width={880}
                    height={880}
                    alt={"Aman Sah headshot"}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="skills"
            ref={skillsRef}
          >
            <h2 className="text-5xl">Skills</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            {/* Skills icons */}
            <div className="w-full mr-auto grid gap-4 grid-cols-4 sm:grid-cols-4 md:grid-cols-8 mt-4">
              {/* HTML */}
              <Icon
                IconType={Html}
                title="HTML"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* CSS */}
              <Icon
                IconType={Css}
                title="CSS"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Tailwind */}
              <Icon
                IconType={Tailwind}
                title="Tailwind"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Javascript */}
              <Icon
                IconType={Javascript}
                title="Javascript"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* React */}
              <Icon
                IconType={ReactJs}
                title="React"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Next */}
              <Icon
                IconType={NextJs}
                title="Next"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Node */}
              <Icon
                IconType={NodeJs}
                title="Node"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Express */}
              <Icon
                IconType={Express}
                title="Express"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Supabase */}
              <Icon
                IconType={Supabase}
                title="Supabase"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* MongoDb */}
              <Icon
                IconType={MongoDb}
                title="MongoDb"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Sass */}
              <Icon
                IconType={Sass}
                title="Sass"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Bootstrap */}
              {<Icon
                IconType={Bootstrap}
                title="Bootstrap"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />}

              {/* Firebase */}
              <Icon
                IconType={Firebase}
                title="Firebase"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Photoshop */}
              <Icon
                IconType={Photoshop}
                title="Photoshop"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Illustrator */}
              <Icon
                IconType={Illustrator}
                title="Illustrator"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* After Effects */}
              <Icon
                IconType={AfterEffects}
                title="After Effects"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Adobe XD */}
              {/*<Icon
                IconType={AdobeXd}
                title="Adobe XD"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />*/}
            </div>
          </section>

          {/* My Work */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="my-work"
            ref={myWorkRef}
          >
            {/* My Work header */}
            <h2 className="text-5xl">My Work</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            {/* Featured Projects Container */}
            <div className="flex flex-col w-full mb-12">
              {/* Project One */}
              <FeaturedProjectCard
                title={"YourSpace"}
                status={"Find Your Home"}
                description={`Discover your dream home effortlessly with our expert real estate services. Buy, sell, or rent with confidence.`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/yourSpace.png"}

                liveLink={"https://your-space-zeta.vercel.app/"}
                repoLink={"https://github.com/aman-sah/your_space"}
                stack={
                  <>
                    <Icon
                      IconType={Html}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Tailwind}
                      title="Tailwind"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={ReactJs}
                      title="React"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={NextJs}
                      title="Next"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={MongoDb}
                      title="Supabase"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />
                  </>
                }
              />
              {/* Project Two */}
              <FeaturedProjectCard
                title={"Sehat Saathi"}
                status={"Track Your Health"}
                description={`Monitor and manage your health with ease. Get insights and stay on top of your wellness journey.`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row-reverse`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/sehatSaathi.png"}
                liveLink={"https://sehat-saathi.vercel.app/"}
                repoLink={"https://github.com/aman-sah/sehat-saathi"}
                stack={
                  <>
                    <Icon
                      IconType={Html}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Tailwind}
                      title="Tailwind"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={ReactJs}
                      title="React"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={NextJs}
                      title="Next"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={MongoDb}
                      title="Supabase"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />
                  </>
                }
              />
              {/* Project Three */}
              <FeaturedProjectCard
                title={"CineStream"}
                status={"Stream, Watch, Enjoy"}
                description={`Discover, stream, and enjoy the latest movies and classics all in one place.`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/cineStream.png"}
                liveLink={"https://aman-sah.github.io/Movie-App/"}
                repoLink={"https://github.com/hey-aman/50ProjectsIn50Days/commit/c966c100a71bcfbb49c120c447a9eb8ddb25c4a4"}
                stack={
                  <>
                    <Icon
                      IconType={Html}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Css}
                      title="Tailwind"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Javascript}
                      title="React"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={MongoDb}
                      title="Next"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />
                  </>
                }
              />
            </div>

            {/* Other Projects header */}
            <h2 className="text-4xl text-center">Other Projects</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 mx-auto border-0"></hr>
            <p className="mb-16 text-lg text-center">
              Check out some of the projects I&apos;ve been a part of...
            </p>

            {/* Other Projects Container */}
            <div className="grid grid-flow-row grid-rows-2 gap-4 grid-col-1 lg:grid-cols-3">
              {projects.map(function (project, i) {
                return <ProjectCard project={project} key={i} />;
              })}
            </div>
          </section>

          {/* <section
            id="github"
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
          >
            <h2 className="text-3xl">My GitHub Contributions</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-10 border-0" />

            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <img
                  src="https://github-readme-streak-stats-salesp07.vercel.app/?user=aman-sah&count_private=true&theme=react&border_radius=10"
                  alt="GitHub Streak Stats"
                  className="rounded-lg shadow-md"
                />
                <img
                  src="https://github-readme-stats-salesp07.vercel.app/api?username=aman-sah&count_private=true&show_icons=true&theme=react&rank_icon=github&border_radius=10"
                  alt="GitHub Readme Stats"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="mt-6">
                <img
                  src="https://ghchart.rshah.org/aman-sah"
                  alt="GitHub Contributions Calendar"
                  className="w-full max-w-4xl mx-auto"
                />
              </div>
            </div>
          </section> */}


<section
  id="github"
  className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
>
  <h2 className="text-3xl">My GitHub Contributions</h2>
  <hr className="bg-brand w-40 h-1.5 mt-4 mb-10 border-0" />

  <div className="flex flex-col items-center gap-8">
    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
      <div className="relative w-[420px] h-[200px]">
        <Image
          // src="https://github-readme-streak-stats-salesp07.vercel.app/?user=aman-sah&count_private=true&theme=react&border_radius=10"
          src="/projects/git1.png"
          alt="GitHub Streak Stats"
          fill
          className="rounded-lg shadow-md object-contain"
          unoptimized
        />
      </div>
      <div className="relative w-[420px] h-[200px]">
        <Image
          // src="https://github-readme-stats-salesp07.vercel.app/api?username=aman-sah&count_private=true&show_icons=true&theme=react&rank_icon=github&border_radius=10"
         src="/projects/git2.png"

          alt="GitHub Readme Stats"
          fill
          className="rounded-lg shadow-md object-contain"
          unoptimized
        />
      </div>
    </div>
    <div className="mt-6 relative w-full max-w-4xl h-[200px]">
      <Image
        // src="https://ghchart.rshah.org/aman-sah"
        src="/projects/git3.png"
        alt="GitHub Contributions Calendar"
        fill
        className="mx-auto object-contain"
        unoptimized
      />
    </div>
  </div>
</section>

         



          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="contact"
            ref={contactRef}
          >
            <h2 className="text-4xl">Get In Touch</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0" />

            <div className="flex flex-col-reverse w-full gap-8 md:flex-row">
              {/* Contact Info */}
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4 mt-2">Contact Information</h3>
                <p className="mb-2 flex items-center">
                  <i className="fas fa-envelope mr-2 text-brand" />
                  <a href="mailto:ashutoshkumarsah41@gmail.com" className="underline-link">
                    amansah2181@gmail.com
                  </a>
                </p>
                <p className="mb-4 flex items-center">
                  <i className="fas fa-phone mr-2 text-brand" />
                  +91 9534940053
                </p>
              </div>

              {/* Contact Form */}
              <form className="w-full md:w-1/2 space-y-4 mt-3">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand dark:bg-dark dark:text-white"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand dark:bg-dark dark:text-white"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Your Message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-brand dark:bg-dark dark:text-white"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-brand px-6 py-3 rounded-md text-white bg-brand hover:bg-brand-dark transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </section>


          {/* Footer */}
          <footer className="flex flex-col w-full px-0 py-16 md:px-20 lg:px-24 section">
            <hr className="w-full h-1 mb-16 dark:bg-white bg-dark border-0 opacity-10"></hr>
            <div className="w-8 mb-4">
              <svg
                id="abbe8588-8b21-44fd-a605-eb7de7f82941"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 93.13 75.2"
              >
                <path
                  className="dark:opacity-50 dark:fill-current dark:text-light fill-brand"
                  d="M24.05,38.51,7.5,55.06a4.39,4.39,0,1,1-6.21-6.21L14.74,35.41,1.29,22A4.39,4.39,0,0,1,7.5,15.75L24.05,32.3A4.4,4.4,0,0,1,24.05,38.51Z"
                />
                <path
                  className="dark:opacity-50 dark:fill-current dark:text-light fill-brand"
                  d="M91.85,55.06a4.38,4.38,0,0,1-6.21,0L69.09,38.51a4.4,4.4,0,0,1,0-6.21L85.64,15.75A4.39,4.39,0,0,1,91.85,22L78.41,35.41,91.85,48.85A4.4,4.4,0,0,1,91.85,55.06Z"
                />
                <rect
                  className="dark:opacity-50 dark:fill-current dark:text-light fill-brand"
                  x="41.93"
                  y="-1.17"
                  width="8.78"
                  height="77.54"
                  rx="4.39"
                  transform="translate(11.31 -10.71) rotate(15)"
                />
              </svg>
            </div>

            <div className="flex flex-col items-start md:flex-row">
              <p className="w-auto mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} - Designed and built by Aman Sah
              </p>

              <div className="flex md:hidden">
                <span className="mr-2">
                  <GitHubProfile marginBottom={"mb-0"} />
                </span>
                <span className="mr-2">
                  <TwitterProfile marginBottom={"mb-0"} />
                </span>
                {/* <span className="mr-2">
                  <LinkedInProfile marginBottom={"mb-0"} />
                </span>
                */}
              </div>
            </div>
          </footer>
        </div>

        {/* Fixed Container */}
        <div className="fixed bottom-0 z-30 w-full">
          <div className="container relative flex h-full mx-auto">
            {/* Profile Icons */}
            <div className="absolute bottom-0 items-center hidden mt-auto mr-auto text-white left-8 md:flex md:flex-col">
              <GitHubProfile marginBottom={"mb-4"} />
              <TwitterProfile marginBottom={"mb-4"} />
              <LinkedInProfile marginBottom={"mb-4"} />
              <DiscordProfile marginBottom={"mb-4"} />
              <InstagramProfile marginBottom={"mb-4"}/>
              
              <div className="w-0.5 dark:bg-white bg-dark h-24 opacity-20 mt-2"></div>
            </div>

            {/* Pagination */}
            <div className="absolute bottom-0 items-center hidden mt-auto ml-auto text-white right-8 md:flex md:flex-col">
              {/* Hero - Diamond 1 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(homeRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === "home"
                    ? "rotate-45 scale-110"
                    : "rotate-0 scale-100"
                    }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${visibleSection === "home"
                      ? "dark:text-white text-mid rotate-90"
                      : "dark:text-dark text-light rotate-0"
                      }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === "home"
                      ? "dark:text-white text-dark rotate-45 opacity-100"
                      : "dark:text-white text-light rotate-45"
                      }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* About - Diamond 2 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(aboutRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === "about"
                    ? "rotate-45 scale-110"
                    : "rotate-0 scale-100"
                    }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${visibleSection === "about"
                      ? "dark:text-white text-mid rotate-90"
                      : "dark:text-dark text-light rotate-0"
                      }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === "about"
                      ? "dark:text-white text-dark rotate-45 opacity-100"
                      : "dark:text-white text-light rotate-45"
                      }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Skills - Diamond 3 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(skillsRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === "skills"
                    ? "rotate-45 scale-110"
                    : "rotate-0 scale-100"
                    }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${visibleSection === "skills"
                      ? "dark:text-white text-mid rotate-90"
                      : "dark:text-dark text-light rotate-0"
                      }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === "skills"
                      ? "dark:text-white text-dark rotate-45 opacity-100"
                      : "dark:text-white text-light rotate-45"
                      }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* My Work - Diamond 4 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(myWorkRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === "my-work"
                    ? "rotate-45 scale-110"
                    : "rotate-0 scale-100"
                    }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${visibleSection === "my-work"
                      ? "dark:text-white text-mid rotate-90"
                      : "dark:text-dark text-light rotate-0"
                      }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === "my-work"
                      ? "dark:text-white text-dark rotate-45 opacity-100"
                      : "dark:text-white text-light rotate-45"
                      }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Blog - Diamond 5 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(blogRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === "blog"
                    ? "rotate-45 scale-110"
                    : "rotate-0 scale-100"
                    }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${visibleSection === "blog"
                      ? "dark:text-white text-mid rotate-90"
                      : "dark:text-dark text-light rotate-0"
                      }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === "blog"
                      ? "dark:text-white text-dark rotate-45 opacity-100"
                      : "dark:text-white text-light rotate-45"
                      }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Contact - Diamond 6 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(contactRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${visibleSection === "contact"
                    ? "rotate-45 scale-110"
                    : "rotate-0 scale-100"
                    }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${visibleSection === "contact"
                      ? "dark:text-white text-mid rotate-90"
                      : "dark:text-dark text-light rotate-0"
                      }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${visibleSection === "contact"
                      ? "dark:text-white text-dark rotate-45 opacity-100"
                      : "dark:text-white text-light rotate-45"
                      }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>

              {/* Line */}
              <div className="w-0.5 dark:bg-white bg-dark h-24 opacity-20 mt-2 z-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const res = await fetch("https://api.hashnode.com/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "32ab9fe7-0331-4efc-bdb8-5a3e0bfdd9b9",
//     },
//     body: JSON.stringify({
//       query:
//         'query {user(username: "danielcranney") {publication {posts(page: 0) {title brief slug coverImage dateAdded}}}}',
//     }),
//   });
//   const publications = await res.json();

//   if (!publications) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       publications,
//     },
//   };
// }
