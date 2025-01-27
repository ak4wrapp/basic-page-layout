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

      // Initialize openSubmenus state for all menu items and their submenus
      const initializeSubmenus = (
        data: MenuItem[],
        parentIndex: string = ""
      ) => {
        const newSubmenusState = new Map(openSubmenus);

        data.forEach((item, index) => {
          const key = `${parentIndex}${index}`;
          newSubmenusState.set(key, false); // Initialize parent menu as collapsed

          if (item.submenus) {
            item.submenus.forEach((subItem, subIndex) => {
              const subKey = `${key}-${subIndex}`;
              newSubmenusState.set(subKey, false); // Initialize submenu as collapsed
              if (subItem.submenus) {
                initializeSubmenus(subItem.submenus, `${subKey}-`); // Recursively initialize submenus
              }
            });
          }
        });

        setOpenSubmenus(newSubmenusState);
      };

      initializeSubmenus(data);
    };

    fetchMenuData();
  }, []);

  // Toggle visibility of submenus, and collapse child items when parent is collapsed
  const toggleSubmenu = (parentIndex: string, submenuIndex: string) => {
    setOpenSubmenus((prev) => {
      const newSet = new Map(prev);
      const key = `${parentIndex}-${submenuIndex}`;
      const currentState = newSet.get(key);

      console.log(`Toggling submenu: ${key}, current state: ${currentState}`);

      // Toggle the visibility of the submenu: if it's true (open), set it to false (closed), and vice versa
      newSet.set(key, !currentState); // Toggle the submenu state

      // If a parent item is collapsed, collapse all of its submenus and child submenus recursively
      if (currentState) {
        // Collapse the current item and all its child submenus recursively
        collapseAllChildren(newSet, key);
      }

      return newSet;
    });
  };

  // Helper function to recursively collapse all children and submenus
  const collapseAllChildren = (
    submenusState: Map<string, boolean>,
    parentIndex: string
  ) => {
    submenusState.forEach((value, key) => {
      // Collapse all submenus under the parent index
      if (key.startsWith(parentIndex)) {
        submenusState.set(key, false); // Collapse the submenu
      }
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

          const isOpen = openSubmenus.get(index); // Get the current open state of the submenu

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
                isOpen &&
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
        {menuData.map((item, index) => {
          const itemIndex = `root-${index}`;
          const isOpen = openSubmenus.get(itemIndex); // Get the current open state of the menu item

          return (
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
                isOpen &&
                renderSubmenus(
                  item.submenus,
                  1,
                  itemIndex
                ) // Render submenus for this menu item
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
