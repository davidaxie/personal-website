'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
        >
          {/* Gradient ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{
              scale: { duration: 0.6, ease: 'easeOut' },
              opacity: { duration: 0.6 },
              rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
            }}
            className="w-10 h-10 rounded-full mb-8"
            style={{
              border: '2px solid transparent',
              borderTopColor: '#D0D0D8',
              borderRightColor: '#FFFFFF',
              boxShadow: '0 0 20px rgba(208,208,216,0.3)',
            }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-lg font-bold text-gradient-sun mb-2"
          >
            DAVID XIE
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ delay: 0.6, duration: 1.5, ease: 'easeInOut' }}
            className="h-[1px] mt-2 rounded-full"
            style={{ background: 'linear-gradient(to right, #D0D0D8, #FFFFFF)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
