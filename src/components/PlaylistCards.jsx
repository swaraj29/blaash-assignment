import React, { useEffect, useState } from "react";
import axios from "axios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DraggableCard = ({ id, title, thumbnail, index, moveCard, onVideoClick }) => {
  const [, drag] = useDrag({
    type: "CARD",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="bg-[#2b2b3d] rounded-lg overflow-hidden shadow-md relative cursor-pointer"
      onClick={() => onVideoClick(id)}
    >
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-white font-semibold">{title}</h3>
        <div className="flex items-center mt-2 text-gray-400 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
            <path d="M12 2a4 4 0 0 0-4 4v4H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v4h-4V6a2 2 0 0 1 2-2zm-6 8h12v6H6v-6z" />
          </svg>
          Videos
        </div>
      </div>
      <div className="absolute top-2 right-2" onClick={e => e.stopPropagation()}>
        <button className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const PlaylistCards = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("product playlist");
  const [activeVideo, setActiveVideo] = useState(null);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const fetchYouTubeVideos = async () => {
    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          maxResults: 6,
          key: API_KEY,
        },
      });
      setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
    }
  };

  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  const moveCard = (fromIndex, toIndex) => {
    const updatedVideos = [...videos];
    const [movedCard] = updatedVideos.splice(fromIndex, 1);
    updatedVideos.splice(toIndex, 0, movedCard);
    setVideos(updatedVideos);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 bg-[#27262F] min-h-screen">
        {activeVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="w-full max-w-4xl max-h-[80vh] bg-black rounded-lg overflow-hidden relative">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <h2 className="text-white text-xl mb-4">Product Playlists</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search videos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#3C3C3C] text-[#858585] px-3 py-1.5 rounded placeholder-[#858585]"
          />
          <button
            onClick={fetchYouTubeVideos}
            className="mt-2 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <DraggableCard
              key={video.id.videoId}
              id={video.id.videoId}
              title={video.snippet.title}
              thumbnail={video.snippet.thumbnails.medium.url}
              index={index}
              moveCard={moveCard}
              onVideoClick={setActiveVideo}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default PlaylistCards;