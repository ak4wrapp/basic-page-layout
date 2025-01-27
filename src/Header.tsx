import React from "react";
import "./Header.css"; // Import the header styles
import DownArrow from "./down-arrow.svg"; // Import the SVG down arrow

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
      <img src={DownArrow} alt="Right Arrow" className="submenu-arrow" />
    </div>
  </header>
);

export default Header;
