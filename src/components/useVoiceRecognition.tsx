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
    // Solicita permissão do microfone uma única vez
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

  // Cria o reconhecimento apenas uma vez
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

  // Configura os handlers uma única vez, após ter o recognition disponível
  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.onstart = () => {
      console.log('Reconhecimento de voz iniciado.');
      setIsListening(true);
    };

    recognition.onend = () => {
      // Não reiniciamos aqui para evitar loop de aborted.
      console.log('Reconhecimento de voz finalizado.');
      setIsListening(false);
      // Se quiser tentar reiniciar após parar espontaneamente, faça com cuidado:
      // setTimeout(() => recognition.start(), 1000);
    };

    recognition.onerror = (
      event: SpeechRecognitionErrorEvent
    ) => {
      console.error(
        'Erro no reconhecimento de voz:',
        event.error
      );
      // Não chamamos start() aqui para evitar loop.
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
