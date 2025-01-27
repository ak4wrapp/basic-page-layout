import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";

const App: React.FC = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!isRightSidebarOpen);
  };

  return (
    <div>
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
    </div>
  );
};

export default App;
