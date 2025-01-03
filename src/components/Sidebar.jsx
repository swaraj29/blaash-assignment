import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BarChart2, PlaySquare, BookOpen, ShoppingCart, ListMusic, Calendar, Users, MessageSquare } from 'lucide-react';

const Sidebar = () => {
  const [playlistOpen, setPlaylistOpen] = useState(true);

  return (
    <div className="w-64 bg-gray-900 min-h-screen p-6 text-gray-300">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">bloosh</h1>
      </div>
      
      <nav className="space-y-4">
        <div className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded">
          <BarChart2 size={20} />
          <span>Revenue</span>
        </div>

        <div className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded justify-between">
          <div className="flex items-center space-x-4">
            <PlaySquare size={20} />
            <span>Shoppable Video</span>
          </div>
          <ChevronDown size={16} />
        </div>

        <div className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded justify-between">
          <div className="flex items-center space-x-4">
            <BookOpen size={20} />
            <span>Story</span>
          </div>
          <ChevronDown size={16} />
        </div>

        <div className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded justify-between">
          <div className="flex items-center space-x-4">
            <ShoppingCart size={20} />
            <span>Live Commerce</span>
          </div>
          <ChevronDown size={16} />
        </div>

        <div className="bg-gray-800 rounded">
          <div 
            className="flex items-center space-x-4 p-3 justify-between cursor-pointer"
            onClick={() => setPlaylistOpen(!playlistOpen)}
          >
            <div className="flex items-center space-x-4">
              <ListMusic size={20} />
              <span>Playlist Manager</span>
            </div>
            {playlistOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {playlistOpen && (
            <div className="ml-10 py-3">
              <div className="text-gray-400 hover:text-gray-200">Product playlist</div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded">
          <MessageSquare size={20} />
          <span>One Click Post</span>
        </div>

        <div className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded">
          <Calendar size={20} />
          <span>Calendar</span>
        </div>

        <div className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded">
          <Users size={20} />
          <span>Hire Influencer</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;