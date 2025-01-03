# Blaash Assignment

**Blaash Assignment** is a web application designed to manage shoppable videos, playlists, and other content for e-commerce and marketing purposes. It integrates with YouTube to fetch and display videos, allowing users to create and manage playlists, update video statuses, and generate embeddable codes.

## Features

- **Shoppable Video Management**:
  - Fetch and display YouTube videos.
  - Manage video status (Active/Inactive).
  - Update video thumbnails and titles.
  - Generate embeddable codes for videos.

- **Playlist Manager**:
  - Create and manage playlists.
  - Drag-and-drop functionality to reorder videos.
  - Search and add videos to playlists.

- **Responsive Design**:
  - Fully responsive layout for mobile, tablet, and desktop.
  - Collapsible sidebar for smaller screens.

- **User Authentication**:
  - Login with Google or email.
  - User profile management.

---

## Technologies Used

- **Frontend**:
  - React.js
  - React Router for navigation.
  - Tailwind CSS for styling.
  - React DnD for drag-and-drop functionality.

- **Backend**:
  - Firebase for authentication.
  - YouTube Data API for fetching videos.

- **Other Tools**:
  - Axios for API requests.
  - Lucide React for icons.

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Google Authentication enabled.
- YouTube Data API key.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/blaash-assignment.git
   cd blaash-assignment

### Install Dependencies

```bash
npm install
or
yarn install
```

### Set up environment variables:

Create a .env file in the root directory and add the following:
```bash
VITE_YOUTUBE_API_KEY=your_youtube_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Run the development server:
```bash
npm run dev
# or
yarn dev
```

### Open the app:
Visit http://localhost:5173 in your browser.
Live Demo
Check out the live demo of the project:
👉 https://blaash-assignment-tawny.vercel.app/

Folder Structure

blaash-assignment/
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── firebase.jsx      # Firebase configuration
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Entry point
├── .env                  # Environment variables
├── package.json          # Project dependencies
└── README.md             # Project documentation
Usage

Login:

Use Google or email to log in.

Manage Videos:

Navigate to the "Shoppable Video" section to view and manage videos.

Click on a video to play it in a modal.

Update video status and thumbnail title.

Playlist Manager:

Navigate to the "Playlist Manager" section.

Drag and drop videos to reorder them.

Search for videos and add them to the playlist.

Generate Code:

Click the "Generate Code" button to get an embeddable code for a video.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/YourFeatureName).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/YourFeatureName).

Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
YouTube Data API for providing video data.

Firebase for authentication.

Tailwind CSS for making styling easier.

React DnD for drag-and-drop functionality.

Contact
For questions or feedback, please reach out to:

Your Name - your.email@example.com

Project Link: https://github.com/your-username/blaash-assignment

Live Demo: https://blaash-assignment-tawny.vercel.app/

