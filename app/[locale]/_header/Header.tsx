import React from "react";
import LocaleSwitcher from "./LocaleSwitcher";
import Nav from "./_nav/Nav";

async function Header() {
  return (
    <header>
      <LocaleSwitcher />
      <nav>
        <Nav />
      </nav>
    </header>
  );
}

export default Header;
