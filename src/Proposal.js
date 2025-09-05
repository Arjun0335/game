import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function Proposal() {
  const [accepted, setAccepted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleYes = () => {
    setAccepted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-red-300 to-pink-400 text-white text-center p-6 relative overflow-hidden">
      {showConfetti && <Confetti />}

      {/* Floating hearts background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200 text-3xl"
            initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
            animate={{
              y: -100,
              transition: { duration: 10 + i, repeat: Infinity, ease: "linear" },
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {!accepted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            💖 I have something special to ask you...
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            From the moment I met you, my world became brighter, my days became
            sweeter, and my heart found its home. 💕 <br />
            You are my favorite reason to smile, my safe place, and my forever
            dream. 🌸 <br />
            So today, I just want to ask…
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-10">
            🌹 Will you be mine, forever and always? 🌹
          </h2>

          <div className="flex gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYes}
              className="px-6 py-3 rounded-2xl bg-white text-pink-600 font-bold shadow-lg"
            >
              ✅ Yes, Forever!
            </motion.button>

            <motion.button
              whileHover={{ x: hovered ? Math.random() * 200 - 100 : 0 }}
              onMouseEnter={() => setHovered(true)}
              className="px-6 py-3 rounded-2xl bg-red-500 text-white font-bold shadow-lg"
            >
              ❌ Maybe later
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">💍 Forever Us 💍</h1>
          <p className="text-xl md:text-2xl leading-relaxed">
            You just made me the happiest person alive! 💕 <br />
            Our journey together starts here, and I promise to make every moment
            magical with you. 🌸✨
          </p>
        </motion.div>
      )}
    </div>
  );
}
