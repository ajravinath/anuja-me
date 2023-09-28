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
import Papa from "papaparse";

const content = document.getElementById("content");

function toJson() {
  return new Promise((resolve, reject) => {
    Papa.parse("./projects.csv", {
      download: true,
      complete: function (results) {
        resolve(results.data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

const getMyData = async () => {
  try {
    const data = await toJson();
    setData(data);
  } catch (err) {
    console.error("Could not parse json", err);
  }
};

const setData = async (data) => {
  document.myName = "Anuja Ranwalage";
  const elements = `<div class="container">
  ${Nav()}
  ${SideMenu()}
  ${SectionProfile()}
  ${SectionAbout()}
  ${SectionExperience()}
  ${SectionProjects(data)}
  ${SectionContact()}
  ${Footer()}
  </div>`;
  content.innerHTML = elements;
};

getMyData();
