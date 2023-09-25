import "./index.scss";
import "./media.scss";
import Nav from "./components/nav";
import SideMenu from "./components/side-menu";
import SectionProfile from "./components/section-profile";
import SectionAbout from "./components/section-about";
import SectionExperience from "./components/section-experience";
import SectionProjects from "./components/section-projects";
import SectionContact from "./components/section-contact";
import Footer from "./components/footer";

const content = document.getElementById("content");
const getMyData = async () => {
  const response = await fetch("https://api.github.com/users/ajravinath");
  const data = await response.json();
  setData(data);
};

const setData = async (data) => {
  console.log("data:", data);
  document.myName = "Anuja Ranwalage";
  const elements = `<div class="container">
  ${Nav()}
  ${SideMenu()}
  ${SectionProfile()}
  ${SectionAbout()}
  ${SectionExperience()}
  ${SectionProjects()}
  ${SectionContact()}
  ${Footer()}
  </div>`;
  content.innerHTML = elements;
};

getMyData();
