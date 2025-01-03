import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

const VideoContext = React.createContext();

export const useVideo = () => React.useContext(VideoContext);

const VideoProvider = ({ children }) => {
  const [activeVideo, setActiveVideo] = React.useState(null);

  return (
    <VideoContext.Provider value={{ activeVideo, setActiveVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

const App = () => {
  return (
    <Router>
      <VideoProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </VideoProvider>
    </Router>
  );
};

export default App;