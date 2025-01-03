import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoSlider = () => {
  const [videos, setVideos] = useState([]);
  const [videoStatus, setVideoStatus] = useState("Active");
  const [activeVideo, setActiveVideo] = useState(null);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        const searchResponse = await axios.get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            part: "snippet",
            q: "product video",
            type: "video",
            maxResults: 3,
            key: API_KEY,
          },
        });

        const videoIds = searchResponse.data.items.map((video) => video.id.videoId).join(",");
        const videoResponse = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
          params: {
            part: "contentDetails",
            id: videoIds,
            key: API_KEY,
          },
        });

        const videosWithDetails = searchResponse.data.items.map((video, index) => ({
          ...video,
          duration: formatDuration(videoResponse.data.items[index].contentDetails.duration),
          productsAttached: 5,
        }));

        setVideos(videosWithDetails);
      } catch (error) {
        console.error("Error fetching YouTube data:", error);
      }
    };

    fetchYouTubeVideos();
  }, []);

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const handleVideoClick = (video) => {
    setActiveVideo(video);
  };

  return (
    <div className="relative">
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
              src={`https://www.youtube.com/embed/${activeVideo.id.videoId}?autoplay=1`}
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <button className="absolute -top-9 left-[70%] bg-[#2F80ED] text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Generate Code
      </button>

      <div className="bg-[#27262F] p-6 rounded-lg text-white mt-10">
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Thumbnail Title</h2>
          <input
            type="text"
            placeholder="Get Sporty in Style"
            className="w-full bg-[#3C3C3C] text-white px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Video Status</h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="status"
                value="Active"
                checked={videoStatus === "Active"}
                onChange={() => setVideoStatus("Active")}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm">Active</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={videoStatus === "Inactive"}
                onChange={() => setVideoStatus("Inactive")}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm">Inactive</span>
            </label>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className="bg-[#2D2D30] p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-[#3D3D40]"
              onClick={() => handleVideoClick(video)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-16 h-12 object-cover rounded-lg"
                />
                <div>
                  <h4 className="text-lg font-semibold">{video.snippet.title}</h4>
                  <p className="text-gray-400">{video.duration}</p>
                  <p className="text-gray-400">Products Attached: {video.productsAttached}</p>
                </div>
              </div>
              <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>

        <button className="w-full bg-[#2F80ED] text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Update Playlist
        </button>
      </div>
    </div>
  );
};

export default VideoSlider;