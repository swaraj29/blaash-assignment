import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlaylistCards from "../components/PlaylistCards";
import VideoSlider from "../components/VideoSlider";

const HomePage = () => {
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar - Fixed on the left */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header - Fixed at the top */}
        <Header />

        <div className="flex flex-1 ">
          {/* Product Playlists Section */}
          <section className="flex-1 ">
            <PlaylistCards />
          </section>

          {/* Video Slider Section */}
          <section className="w-1/3 bg-[#27262F] ">
            <VideoSlider />
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
