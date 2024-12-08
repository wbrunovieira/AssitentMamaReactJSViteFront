import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

const useVoiceRecognition = () => {
  const recognitionRef = useRef<SpeechRecognition | null>(
    null
  );

  const [isListening, setIsListening] = useState(false);
  const [commandRecognized, setCommandRecognized] =
    useState(false);
  const [microphoneError, setMicrophoneError] = useState<
    string | null
  >(null);
  const [backendResponse, setBackendResponse] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .catch(error => {
          console.error(
            'Erro ao acessar o microfone:',
            error
          );
          setMicrophoneError(
            'Não foi possível acessar o microfone.'
          );
        });
    } else {
      console.warn('Microfone não disponível.');
      setMicrophoneError('Microfone não disponível.');
    }
  }, []);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn(
        'SpeechRecognition API não está disponível no navegador.'
      );
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'pt-BR';
    recognitionRef.current = rec;
  }, []);

  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.onstart = () => {
      console.log('Reconhecimento de voz iniciado.');
      setIsListening(true);
    };

    recognition.onend = () => {
      console.log('Reconhecimento de voz finalizado.');
      setIsListening(false);
    };

    recognition.onerror = (
      event: SpeechRecognitionErrorEvent
    ) => {
      console.error(
        'Erro no reconhecimento de voz:',
        event.error
      );
    };

    recognition.onresult = async (
      event: SpeechRecognitionEvent
    ) => {
      const transcript =
        event.results[
          event.resultIndex
        ][0].transcript.toLowerCase();
      console.log('Reconhecimento:', transcript);

      if (transcript.includes('oi márcia')) {
        setCommandRecognized(true);
        console.log('Comando reconhecido: Oi Márcia');
        try {
          const response = await axios.post(
            'http://localhost:3030/message',
            {
              content: 'Oi Márcia',
            }
          );
          console.log(
            'Resposta do backend:',
            response.data
          );
          setBackendResponse(response.data.reply);
        } catch (error) {
          console.error(
            'Erro ao enviar comando para o backend:',
            error
          );
        }
      }
    };

    try {
      recognition.start();
    } catch (e) {
      console.error('Erro ao iniciar o reconhecimento:', e);
    }

    return () => {
      recognition.stop();
    };
  }, []);

  return {
    isListening,
    commandRecognized,
    microphoneError,
    backendResponse,
  };
};

export default useVoiceRecognition;
