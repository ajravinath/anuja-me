const SectionProjects = (data) => {
  document.renderProject = () => {
    // eslint-disable-next-line no-unused-vars
    const [_title, ...restData] = data;
    return restData
      .map((project) => {
        const sourceDisabled = project[2] === "null" ? "disabled" : "";
        const projectDisabled = project[3] === "null" ? "disabled" : "";
        return /*html*/ `
        <div class="details-container color-container">
          <div class="article-container projects">
            <img src="${project[4]}" alt="${project[0]}" class="project-img" />
          </div>
          <h3 class="experience-sub-title project-title">${project[0]}</h3>
          <p class="experience-text project-text clamp-max">${project[1]}</p>
          <div class="btn-container project-buttons">
            <button ${projectDisabled} class="btn btn-color-2 project-btn" onclick="window.open('${project[3]}', '_blank')">
              Show Project
            </button>
            <button ${sourceDisabled} class="btn btn-color-2 project-btn" onclick="window.open('${project[2]}', '_blank')">
              Source
            </button>
          </div>
        </div>`;
      })
      .join("");
  };

  const value = document.renderProject();

  window.scrollProjects = (direction) => {
    const strip = document.querySelector(".about-projects");
    if (!strip) return;
    const card = strip.querySelector(".color-container");
    const step = card ? card.offsetWidth + 24 : strip.clientWidth * 0.8;
    strip.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const template = /*html*/ `
    <section id="projects">
      <p class="section__text__p1">Browse My Recent</p>
      <h2 class="title">Projects</h2>
      <div class="experience-details-container pj">
        <div class="projects-carousel">
          <button class="carousel-btn carousel-prev" type="button" aria-label="Previous projects" onclick="scrollProjects(-1)"><img src="./icons/chevron_left_48dp.png" alt="" /></button>
          <div class="about-containers about-projects">
            ${value}
          </div>
          <button class="carousel-btn carousel-next" type="button" aria-label="Next projects" onclick="scrollProjects(1)"><img src="./icons/chevron_right_48dp.png" alt="" /></button>
        </div>
        <img src="./arrow.png" alt="arrow icon" class="icon arrow" onclick="location.href='./#contact'" />
      </div>
    </section>
    `;

  return template;
};

export default SectionProjects;
