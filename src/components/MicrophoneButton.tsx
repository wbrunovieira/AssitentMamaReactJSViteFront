import { motion } from 'framer-motion';

import { FaMicrophone } from 'react-icons/fa';
import useVoiceRecognition from './useVoiceRecognition';

const MicrophoneButton = () => {
  const { isListening, commandRecognized } =
    useVoiceRecognition();

  return (
    <div className="flex justify-center items-center flex-col space-y-4">
      <motion.div
        className={`bg-gray-700 rounded-full p-6 text-white flex justify-center items-center`}
        animate={{
          scale: isListening ? 1.2 : 1,
          opacity: isListening ? 0.7 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
        }}
      >
        {isListening ? (
          <FaMicrophone className="w-12 h-12 text-red-500" />
        ) : (
          <FaMicrophone className="w-12 h-12 text-gray-500" />
        )}
      </motion.div>

      {commandRecognized && (
        <p className="text-xl text-green-500">
          Comando reconhecido: "Oi Marcia"
        </p>
      )}

      {isListening && (
        <p className="text-lg text-blue-500">
          Estou ouvindo...
        </p>
      )}

      {!isListening && !commandRecognized && (
        <p className="text-lg text-gray-500">
          pode começar a falar...
        </p>
      )}
    </div>
  );
};

export default MicrophoneButton;
