import React, { useState } from "react";
import Header from "./Header"; // Assuming you have Header component
import Sidebar from "./Sidebar"; // Your Sidebar component
import Content from "./Content"; // Your Content component
import Footer from "./Footer"; // The new Footer component
import "./App.css"; // Import the App styles

const App: React.FC = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);

  const toggleLeftSidebar = () => setLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setRightSidebarOpen(!isRightSidebarOpen);

  return (
    <div className="app-container">
      <Header
        onHamburgerClick={toggleLeftSidebar}
        onUserInfoClick={toggleRightSidebar}
      />
      <Sidebar
        position="left"
        isOpen={isLeftSidebarOpen}
        onClose={() => setLeftSidebarOpen(false)}
      />
      <Sidebar
        position="right"
        isOpen={isRightSidebarOpen}
        onClose={() => setRightSidebarOpen(false)}
      />
      <Content />
      <Footer />
    </div>
  );
};

export default App;
