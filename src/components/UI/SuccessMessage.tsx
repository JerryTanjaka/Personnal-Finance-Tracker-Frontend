import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SuccessMessageProps = {
  message: string;
  onClose: () => void;
};

export default function SuccessMessage({ message, onClose }: SuccessMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto max-w-md rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <i className="bx bxs-check-circle text-xl"></i>
            <span className="text-sm">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
