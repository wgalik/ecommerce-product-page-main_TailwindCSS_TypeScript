import { useState } from "react";

import BackgroundDark from "./BackgroundDark";
import CartBtn from "./CartBtn";

const NavigationMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuItems = ["Collections", "Men", "Women", "About", "Contact"];

  const openMenuStyle: string = `left-0`;

  const openMenuBtn = (
    <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z"
        fill="#69707D"
        fill-rule="evenodd"
      />
    </svg>
  );

  const closeMenuBtn = (
    <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
        fill="#69707D"
        fillRule="evenodd"
      />
    </svg>
  );

  const handleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkMenu = () => setIsMenuOpen(false);
  const menu = menuItems.map((item) => (
    <li key={item} onClick={handleLinkMenu}>
      <a href="http:#">{item}</a>
    </li>
  ));
  return (
    <>
      {isMenuOpen && <BackgroundDark />}
      <nav>
        <button id="hamburger-btn" onClick={handleMenu}>
          {isMenuOpen ? closeMenuBtn : openMenuBtn}
        </button>
        <div id="logo"></div>
        <ul id="main-menu" className={isMenuOpen ? openMenuStyle : ""}>
          {menu}
        </ul>
        <CartBtn />
        <div id="avatar"></div>
      </nav>
    </>
  );
};
export default NavigationMenu;
