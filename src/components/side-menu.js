const SideMenu = () => {
  window.toggleOpen = () => {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  };

  const template = /*html*/ `
    <nav id="hamburger-nav">
        <div class="logo">${document.myName}</div>
        <div class="hamburger-menu">
            <div class="hamburger-icon" onclick="toggleOpen()">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="menu-links">
                <li><a href="#about" onclick="toggleOpen()">About</a></li>
                <li><a href="#experience" onclick="toggleOpen()">Experience</a></li>
                <li><a href="#project" onclick="toggleOpen()">Projects</a></li>
                <li><a href="#contacts" onclick="toggleOpen()">Contact</a></li>
            </div>
        </div>
    </nav>
    `;

  return template;
};

export default SideMenu;
