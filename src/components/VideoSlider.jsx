import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoSlider = () => {
  const [videos, setVideos] = useState([]);
  const [videoStatus, setVideoStatus] = useState("Active");
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;// Your YouTube API key

  // Fetch YouTube data
  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        // Step 1: Fetch video IDs
        const searchResponse = await axios.get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            part: "snippet",
            q: "product video", // Search query
            type: "video",
            maxResults: 3, // Number of results to fetch
            key: API_KEY,
          },
        });

        // Step 2: Fetch video details (including duration)
        const videoIds = searchResponse.data.items.map((video) => video.id.videoId).join(",");
        const videoResponse = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
          params: {
            part: "contentDetails",
            id: videoIds,
            key: API_KEY,
          },
        });

        // Step 3: Combine search and video details
        const videosWithDetails = searchResponse.data.items.map((video, index) => ({
          ...video,
          duration: formatDuration(videoResponse.data.items[index].contentDetails.duration),
          productsAttached: 5, // Placeholder value for "Products Attached"
        }));

        setVideos(videosWithDetails);
      } catch (error) {
        console.error("Error fetching YouTube data:", error);
      }
    };

    fetchYouTubeVideos();
  }, []);

  // Helper function to format duration (e.g., "PT4M5S" -> "4:05")
  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    } else {
      return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }
  };

  return (
    <div className="relative">
      {/* Generate Code Button */}
      <button className="absolute -top-2 left-[70%] bg-[#2F80ED] text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Generate Code
      </button>

      {/* Main Box */}
      <div className="bg-[#27262F] p-6 rounded-lg text-white mt-10">
        {/* Thumbnail Title */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Thumbnail Title</h2>
          <input
            type="text"
            placeholder="Get Sporty in Style"
            className="w-full bg-[#3C3C3C] text-white px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Video Status */}
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

        {/* Video List */}
        <div className="space-y-4 mb-6">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className="bg-[#2D2D30] p-4 rounded-lg flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                {/* Video Thumbnail */}
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Update Playlist Button */}
        <button className="w-full bg-[#2F80ED] text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Update Playlist
        </button>
      </div>
    </div>
  );
};

export default VideoSlider;