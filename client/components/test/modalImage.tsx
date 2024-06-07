import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ModalProps {
  showModal: boolean;
  imageSrc: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ showModal, imageSrc, onClose }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="relative">
            <Image
              src={imageSrc}
              alt="Full screen"
              width={16}
              height={16}
              layout="responsive"
              className="max-w-full max-h-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
