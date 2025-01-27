import React, { useState, useEffect } from "react";
import "./sidebar.css";
import RightArrow from "./right-arrow.svg"; // Import the SVG right arrow

// Type definitions for the menu data
interface Submenu {
  name: string;
  link: string;
  submenus?: Submenu[];
}

interface MenuItem {
  name: string;
  link: string;
  submenus?: Submenu[];
}

interface SidebarProps {
  position: "left" | "right";
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ position, isOpen, onClose }) => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [openSubmenus, setOpenSubmenus] = useState<Map<string, boolean>>(
    new Map()
  );

  // Fetch the menu data from the JSON file
  useEffect(() => {
    const fetchMenuData = async () => {
      const response = await fetch("/menuData.json"); // Adjust path as needed
      const data: MenuItem[] = await response.json();
      setMenuData(data);
    };

    fetchMenuData();
  }, []);

  // Toggle visibility of submenus
  const toggleSubmenu = (parentIndex: string, submenuIndex: string) => {
    setOpenSubmenus((prev) => {
      const newSet = new Map(prev);
      const key = `${parentIndex}-${submenuIndex}`;
      newSet.set(key, !newSet.get(key)); // Toggle the visibility of the submenu
      return newSet;
    });
  };

  // Recursive function to render submenus with dynamic font sizes
  const renderSubmenus = (
    submenus: Submenu[] = [],
    level: number = 1,
    parentIndex: string
  ) => {
    const fontSize = Math.max(10, 14 - level); // Decrease font size per level, with 10px as the minimum

    return (
      <ul className={`submenu submenu-level-${level}`}>
        {submenus.map((submenu, subIndex) => {
          const index = `${parentIndex}-${subIndex}`; // Unique key for each submenu item

          return (
            <li key={index}>
              <a
                href={submenu.link}
                className={`submenu-item submenu-level-${level}`}
                style={{ fontSize: `${fontSize}px` }} // Dynamically set font size
                onClick={(e) => {
                  e.preventDefault(); // Prevent page reload on link click
                  toggleSubmenu(parentIndex, subIndex.toString()); // Toggle visibility of this submenu
                }}
              >
                {submenu.name}
                {submenu.submenus && submenu.submenus.length > 0 && (
                  <img
                    src={RightArrow}
                    alt="Right Arrow"
                    className="submenu-arrow"
                  />
                )}
              </a>
              {submenu.submenus &&
                submenu.submenus.length > 0 &&
                openSubmenus.has(index) &&
                renderSubmenus(
                  submenu.submenus,
                  level + 1,
                  index
                ) // Render child submenus
              }
            </li>
          );
        })}
      </ul>
    );
  };

  const sidebarPositionClass =
    position === "left" ? "left-sidebar" : "right-sidebar";

  return (
    <div className={`sidebar ${sidebarPositionClass} ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        &#10005;
      </button>
      <h2>{position === "left" ? "Left Sidebar" : "Right Sidebar"}</h2>
      <ul>
        {menuData.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              className="menu-item"
              style={{ fontSize: "14px" }} // Main menu items have font size of 14px
              onClick={(e) => {
                e.preventDefault(); // Prevent page reload on link click
                toggleSubmenu("root", index.toString()); // Toggle visibility of top-level submenu
              }}
            >
              {item.name}
              {item.submenus && item.submenus.length > 0 && (
                <img
                  src={RightArrow}
                  alt="Right Arrow"
                  className="submenu-arrow"
                />
              )}
            </a>
            {item.submenus &&
              item.submenus.length > 0 &&
              openSubmenus.has(`root-${index}`) &&
              renderSubmenus(
                item.submenus,
                1,
                `root-${index}`
              ) // Render submenus for this menu item
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
