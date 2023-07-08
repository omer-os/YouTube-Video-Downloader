"use client";
import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

export default function YTBDownloaderCon() {
  const [videoURL, setVideoURL] = useState("");
  const [format, setFormat] = useState("mp4");
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);

    if (videoURL) {
      const downloadLink = document.createElement("a");
      downloadLink.href = `/api/download?videoURL=${encodeURIComponent(
        videoURL
      )}&format=${format}`;
      downloadLink.download = `${videoURL
        .split("v=")[1]
        .split("&")[0]
        .slice(0, 10)}...${format}`;
      downloadLink.click();

      // When the browser tab regains focus, assume the download started
      window.onfocus = () => {
        setIsLoading(false);
        window.onfocus = null; // Reset the event for future downloads
      };
    } else {
      // If there is no URL, set loading to false and alert the user
      setIsLoading(false);
      alert("Please enter a valid URL.");
    }
  };

  const spinnerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };
  return (
    <div className="flex flex-col">
      <div className="rounded h-14 w-full max-w-[34em] border relative mx-auto mt-8 border-zinc-500 flex gap-0.5">
        <input
          className="rounded w-full h-full bg-transparent px-2 py-1 outline-none"
          placeholder="ادخل رابط الفيديو"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
        />
        <motion.button
          animate={{
            width: isLoading ? 45 : 100,
            transition: {
              delay: 0.5,
            },
          }}
          className="bg-blue-700 flex items-center gap-1 text-white rounded px-3 py-2 m-2 active:scale-95 transition-all active:bg-blue-700 justify-center"
          disabled={isLoading}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleDownload}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="flex items-center justify-center"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  className="animate-spin"
                >
                  <path d="M16 8c-0.020-1.045-0.247-2.086-0.665-3.038-0.417-0.953-1.023-1.817-1.766-2.53s-1.624-1.278-2.578-1.651c-0.953-0.374-1.978-0.552-2.991-0.531-1.013 0.020-2.021 0.24-2.943 0.646-0.923 0.405-1.758 0.992-2.449 1.712s-1.237 1.574-1.597 2.497c-0.361 0.923-0.533 1.914-0.512 2.895 0.020 0.981 0.234 1.955 0.627 2.847 0.392 0.892 0.961 1.7 1.658 2.368s1.523 1.195 2.416 1.543c0.892 0.348 1.851 0.514 2.799 0.493 0.949-0.020 1.89-0.227 2.751-0.608 0.862-0.379 1.642-0.929 2.287-1.604s1.154-1.472 1.488-2.335c0.204-0.523 0.342-1.069 0.415-1.622 0.019 0.001 0.039 0.002 0.059 0.002 0.552 0 1-0.448 1-1 0-0.028-0.001-0.056-0.004-0.083h0.004zM14.411 10.655c-0.367 0.831-0.898 1.584-1.55 2.206s-1.422 1.112-2.254 1.434c-0.832 0.323-1.723 0.476-2.608 0.454-0.884-0.020-1.759-0.215-2.56-0.57-0.801-0.354-1.526-0.867-2.125-1.495s-1.071-1.371-1.38-2.173c-0.31-0.801-0.457-1.66-0.435-2.512s0.208-1.694 0.551-2.464c0.342-0.77 0.836-1.468 1.441-2.044s1.321-1.029 2.092-1.326c0.771-0.298 1.596-0.438 2.416-0.416s1.629 0.202 2.368 0.532c0.74 0.329 1.41 0.805 1.963 1.387s0.988 1.27 1.272 2.011c0.285 0.74 0.418 1.532 0.397 2.32h0.004c-0.002 0.027-0.004 0.055-0.004 0.083 0 0.516 0.39 0.94 0.892 0.994-0.097 0.544-0.258 1.075-0.481 1.578z"></path>
                </svg>
              </motion.div>
            ) : (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="flex gap-1 items-center"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                تحميل
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="rounded w-full max-w-[30em] mt-3 mx-auto flex p-2 bg-zinc-900 gap-2 text-sm">
        {[
          {
            title: "صوت - mp3",
            value: "mp3",
          },
          {
            title: "فيديو - mp4",
            value: "mp4",
          },
        ].map((i, index) => (
          <button
            key={index}
            onClick={() => setFormat(i.value)}
            className="py-2 px-4 relative flex-1 active:scale-95 hover:bg-zinc-800/50 rounded transition-all"
          >
            {format === i.value && (
              <motion.div
                layoutId="ojiberipbe"
                className="absolute top-0 left-0 h-full w-full bg-zinc-800 rounded"
              />
            )}
            <p className="relative z-10">{i.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
