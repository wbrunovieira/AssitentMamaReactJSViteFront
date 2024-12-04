// import { useState, useEffect } from 'react';
// import { FaArrowLeft } from 'react-icons/fa';
// import axios from 'axios';
// import subjects from './subjects.json';

// interface Video {
//   title: string;
//   videoId: string;
//   description: string;
// }

// function VideoPage({ onBack }: { onBack: () => void }) {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [currentSubject, setCurrentSubject] =
//     useState<string>('Elvis Presley');
//   const [loading, setLoading] = useState<boolean>(false);

//   const youtubeApiKey = import.meta.env
//     .VITE_YOUTUBE_API_KEY;

//   const searchVideos = async (subject: string) => {
//     setLoading(true);

//     try {
//       const response = await axios.get(
//         `https://www.googleapis.com/youtube/v3/search`,
//         {
//           params: {
//             part: 'snippet',
//             q: subject,
//             type: 'video',
//             maxResults: 5,
//             key: youtubeApiKey,
//           },
//         }
//       );

//       const videoData = response.data.items.map(
//         (item: any) => ({
//           title: item.snippet.title,
//           videoId: item.id.videoId,
//           description: item.snippet.description,
//         })
//       );

//       setVideos(videoData);
//     } catch (error) {
//       console.error('Erro ao buscar vídeos', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (youtubeApiKey) {
//       searchVideos(currentSubject);
//     } else {
//       console.error(
//         'Chave da API do YouTube não configurada.'
//       );
//     }
//   }, [currentSubject]);

//   return (
//     <div className="text-center space-y-10">
//       <h1 className="text-5xl font-bold text-highlight">
//         Escolha um Vídeo - {currentSubject}
//       </h1>

//       {loading ? (
//         <p>Carregando...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
//           {videos.map((video, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-lg overflow-hidden"
//             >
//               <iframe
//                 width="100%"
//                 height="315"
//                 src={`https://www.youtube.com/embed/${video.videoId}`}
//                 title={video.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//               <div className="p-4">
//                 <p className="text-xl font-semibold">
//                   {video.title}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {video.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <button
//         onClick={onBack}
//         className="bg-buttonAction text-white px-12 py-6 rounded-lg w-full text-2xl font-extrabold hover:bg-buttonPrimary hover:text-white hover:scale-110 transform transition-transform duration-300 transition-colors focus:ring-4 focus:ring-buttonPrimary"
//       >
//         <FaArrowLeft
//           size={30}
//           className="inline-block mr-4"
//         />
//         Voltar
//       </button>

//       <div className="mt-8">
//         {subjects.map(subject => (
//           <button
//             key={subject.id}
//             onClick={() => setCurrentSubject(subject.name)}
//             className="bg-buttonAction text-white px-6 py-4 rounded-lg mx-4 text-xl font-bold hover:bg-buttonPrimary hover:text-white focus:ring-4 focus:ring-buttonPrimary"
//           >
//             {subject.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default VideoPage;
