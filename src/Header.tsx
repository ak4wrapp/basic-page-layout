import React from "react";
import "./Header.css"; // Import the header styles

interface HeaderProps {
  onHamburgerClick: () => void;
  onUserInfoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onHamburgerClick,
  onUserInfoClick,
}) => (
  <header>
    <div className="hamburger" onClick={onHamburgerClick}>
      &#9776;
    </div>
    <div className="user-info" onClick={onUserInfoClick}>
      <span className="user-avatar">A</span>
      <span className="user-name">John Doe</span>
    </div>
  </header>
);

export default Header;
