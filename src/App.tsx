import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar"; // Sidebar component
import Content from "./Content"; // Content component
import Footer from "./Footer"; // Footer component
import "./App.css"; // Import the App styles
import Header from "./Header";

// Dummy components for /remote/user and /remote/admin
const UserPage = () => <div>User Page</div>;
const AdminPage = () => <div>Admin Page</div>;

const NotFound = () => <div>404 Page Not Found</div>;

const App: React.FC = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);

  const toggleLeftSidebar = () => setLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setRightSidebarOpen(!isRightSidebarOpen);

  return (
    <Router>
      <div className="app-container">
        <Header
          onHamburgerClick={toggleLeftSidebar}
          onUserInfoClick={toggleRightSidebar}
        />
        {/* Sidebar */}
        <Sidebar
          position="left"
          isOpen={isLeftSidebarOpen}
          onClose={() => {
            setLeftSidebarOpen(false);
          }}
        />

        <Sidebar
          position="right"
          isOpen={isRightSidebarOpen}
          onClose={() => setRightSidebarOpen(false)}
        />

        <div className="content-wrapper">
          {/* Define Routes */}
          <Routes>
            <Route index element={<Content />} />
            {/* Add your other routes here */}
            <Route path="/remote/user" element={<UserPage />} />
            <Route path="/remote/admin" element={<AdminPage />} />
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
