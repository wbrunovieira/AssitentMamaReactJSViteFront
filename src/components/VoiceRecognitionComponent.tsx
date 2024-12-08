import { motion } from 'framer-motion';
import useVoiceRecognition from './useVoiceRecognition';

const VoiceRecognitionComponent = () => {
  const {
    isListening,
    commandRecognized,
    backendResponse,
  } = useVoiceRecognition();

  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-4 p-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div>
        {isListening ? (
          <p className="text-xl text-softPink">
            Estou ouvindo...
          </p>
        ) : (
          <p className="text-xl text-darkText">
            Estou aqui
          </p>
        )}
      </div>

      {commandRecognized && (
        <p className="text-2xl font-bold text-pastelGreen">
          Comando reconhecido: "Oi Márcia"
        </p>
      )}

      {backendResponse && (
        <p className="text-xl text-darkText">
          {backendResponse}
        </p>
      )}
    </motion.div>
  );
};

export default VoiceRecognitionComponent;
