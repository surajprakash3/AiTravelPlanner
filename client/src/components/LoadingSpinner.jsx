import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Map, Hotel, Compass, Utensils } from 'lucide-react';
import './LoadingSpinner.css';

const AI_MESSAGES = [
  { text: 'Analyzing destination data...', icon: Map },
  { text: 'Finding the best hotels...', icon: Hotel },
  { text: 'Curating local experiences...', icon: Compass },
  { text: 'Selecting top-rated restaurants...', icon: Utensils },
  { text: 'Optimizing daily schedules...', icon: Sparkles },
  { text: 'Finalizing your itinerary...', icon: Sparkles },
];

export default function LoadingSpinner({ message = 'Loading...', isAiMode = false }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (!isAiMode) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % AI_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isAiMode]);

  if (isAiMode) {
    const CurrentIcon = AI_MESSAGES[msgIndex].icon;

    return (
      <div className="spinner-ai-wrapper">
        <div className="spinner-ai-ring-wrapper">
          {/* Glowing rings */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="spinner-ai-glow"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="spinner-ai-ring-outer"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="spinner-ai-ring-inner"
          />
          {/* Center icon */}
          <div className="spinner-ai-center">
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <CurrentIcon className="spinner-ai-icon" />
            </motion.div>
          </div>
        </div>

        {/* Text */}
        <div className="spinner-ai-text-wrapper">
          <h3 className="spinner-ai-title">
            <Sparkles className="spinner-ai-title-icon" />
            Gemini AI is Working
          </h3>
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="spinner-ai-msg"
            >
              {AI_MESSAGES[msgIndex].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="spinner-ai-progress-track">
          <motion.div
            className="spinner-ai-progress-bar"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    );
  }

  // Basic Spinner Fallback
  return (
    <div className="spinner-basic-wrapper">
      <div className="spinner-basic-ring-wrapper">
        <div className="spinner-basic-track"></div>
        <div className="spinner-basic-spin"></div>
        <div className="spinner-basic-dot-wrapper">
          <div className="spinner-basic-dot"></div>
        </div>
      </div>
      <p className="spinner-basic-msg">{message}</p>
    </div>
  );
}
