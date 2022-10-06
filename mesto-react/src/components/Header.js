import React from "react";
import logoPath from "../images/header-logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logoPath} alt="Логотип Место" className="header__logo" />
    </header>
  );
}

export default Header;
