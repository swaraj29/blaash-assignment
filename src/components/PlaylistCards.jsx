import React, { useEffect, useState } from "react";
import axios from "axios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Draggable Card Component
const DraggableCard = ({ id, title, thumbnail, index, moveCard }) => {
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
      className="bg-[#2b2b3d] rounded-lg overflow-hidden shadow-md relative"
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover"
      />

      {/* Video Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold">{title}</h3>
        <div className="flex items-center mt-2 text-gray-400 text-sm">
          {/* Lock Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4 mr-2"
          >
            <path d="M12 2a4 4 0 0 0-4 4v4H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v4h-4V6a2 2 0 0 1 2-2zm-6 8h12v6H6v-6z" />
          </svg>
          Videos
        </div>
      </div>

      {/* Menu Button */}
      <div className="absolute top-2 right-2">
        <button className="text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Main PlaylistCards Component
const PlaylistCards = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("product playlist");
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Your YouTube API key

  // Fetch YouTube data
  const fetchYouTubeVideos = async () => {
    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: query, // Search query
          type: "video",
          maxResults: 2, // Number of results to fetch
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

  const handleSearch = () => {
    fetchYouTubeVideos();
  };

  // Move card function
  const moveCard = (fromIndex, toIndex) => {
    const updatedVideos = [...videos];
    const [movedCard] = updatedVideos.splice(fromIndex, 1);
    updatedVideos.splice(toIndex, 0, movedCard);
    setVideos(updatedVideos);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 bg-[#27262F] min-h-screen">
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
            onClick={handleSearch}
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
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default PlaylistCards;