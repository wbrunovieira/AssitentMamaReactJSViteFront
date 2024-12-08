import { motion } from 'framer-motion';
import { FaMicrophone } from 'react-icons/fa';
import useVoiceRecognition from './useVoiceRecognition';

const MicrophoneButton = () => {
  const { isListening, commandRecognized } =
    useVoiceRecognition();

  return (
    <motion.div
      className="flex justify-center items-center flex-col space-y-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        className={`bg-pastelGreen rounded-full p-8 flex justify-center items-center shadow-lg`}
        animate={{
          scale: isListening ? [1, 1.2, 1] : [1, 1.1, 1],
          opacity: isListening ? 0.8 : 1,
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2,
        }}
      >
        <FaMicrophone
          className={`w-16 h-16 ${
            isListening ? 'text-softPink' : 'text-darkText'
          }`}
        />
      </motion.div>

      {commandRecognized && (
        <p className="text-2xl font-bold text-pastelGreen">
          Comando reconhecido: "Oi Márcia"
        </p>
      )}

      {isListening && (
        <p className="text-xl text-softPink">
          Estou ouvindo...
        </p>
      )}

      {!isListening && !commandRecognized && (
        <p className="text-xl text-lightYellow">
          Pode começar a falar...
        </p>
      )}
    </motion.div>
  );
};

export default MicrophoneButton;
