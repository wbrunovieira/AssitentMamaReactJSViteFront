import { motion } from 'framer-motion';
import MicrophoneButton from './components/MicrophoneButton';
import VoiceRecognitionComponent from './components/VoiceRecognitionComponent';

function App() {
  return (
    <main className="bg-softGray text-darkText min-h-screen flex flex-col items-center justify-center p-12">
      <motion.div
        className="text-center space-y-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-6xl font-bold text-highlight">
          Bem-vinda, Rose!
        </h1>

        <MicrophoneButton />
        <VoiceRecognitionComponent />
      </motion.div>
    </main>
  );
}

export default App;
