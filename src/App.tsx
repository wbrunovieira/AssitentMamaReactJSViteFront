import './App.css';

import MicrophoneButton from './components/MicrophoneButton';
import VoiceRecognitionComponent from './components/VoiceRecognitionComponent';

function App() {
  return (
    <main className="bg-lightGray text-darkText min-h-screen flex flex-col items-center justify-center p-12">
      <div className="text-center space-y-12">
        <h1 className="text-6xl font-bold text-highlight">
          Bem-vinda, Rose!
        </h1>

        <MicrophoneButton />
        <VoiceRecognitionComponent />
      </div>
    </main>
  );
}

export default App;
