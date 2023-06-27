import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="explanation-container">
      <h1 className="title">Welcome to NoteHub: Your Personal Digital Notebook!</h1>
      <p className="description">
        NoteHub is a powerful website designed to help you stay organized, capture ideas, and keep track of important information.
        Whether you need to jot down reminders, take detailed notes, or create a visual diary, NoteHub provides all the tools you need in one convenient place.
      </p>
      <div className="features">
        <h2>Features:</h2>
        <ul>
          <li>Add a Note: Easily create a new note and write down your thoughts, to-do lists, or any other information you want to remember.</li>
          <li>Add a Photo: Attach photos to your notes to capture special moments or provide visual references.</li>
          <li>Edit Note Elements: Customize your notes with various font styles, sizes, and colors to create visually appealing content.</li>
          <li>Delete a Note: Remove unwanted notes effortlessly with the delete option.</li>
          <li>Sort by Name or Color: Organize your notes alphabetically or by color to quickly find specific notes.</li>
          <li>Auto-Save and Sync: All your changes are automatically saved in real-time and synced across devices for easy access.</li>
        </ul>
      </div>
      <p className="call-to-action">
        NoteHub is your personal companion for staying productive, organized, and creative.
        Start utilizing the power of digital note-taking today and enjoy the convenience of having all your important thoughts and ideas at your fingertips.
      </p>
      <p className="get-started">Get started now and unlock the endless possibilities of NoteHub: Your Personal Digital Notebook!</p>
    </div>
  );
};

export default About;
