const SectionProjects = () => {
  const template = /*html*/ `
    <section id="projects">
      <p class="section__text__p1">Browse My Recent</p>
      <h1 class="title">Projects</h1>
      <div class="experience-details-container pj scroll-shadows">
        <div class="about-containers">
          <div class="details-container color-container">
            <div class="article-container projects">
              <img src="./project-1.png" alt="project 1" class="project-img" />
            </div>
            <h2 class="experience-sub-title project-title"> Years of Experience</h2>
            <div class="btn-container">
              <button class="btn btn-color-2 project-btn" onclick="window.open('https://github.com/ajravinath/years-of-experience', '_blank')">
                Github
              </button>
              <button class="btn btn-color-2 project-btn" onclick="window.open('https://app.project-anuja.xyz/', '_blank')">
                Live Demo
              </button>
            </div>
          </div>
          <div class="details-container color-container">
            <div class="article-container projects">
              <img src="./project-2.png" alt="project 2" class="project-img" />
            </div>
            <h2 class="experience-sub-title project-title">Chattz ⚡️</h2>
            <div class="btn-container">
              <button class="btn btn-color-2 project-btn" onclick="window.open('https://github.com/ajravinath/chattz-client', '_blank')">
                Github
              </button>
              <button class="btn btn-color-2 project-btn" onclick="window.open('http://chattz.surge.sh/login', '_blank')">
                Live Demo
              </button>
            </div>
          </div>
          <div class="details-container color-container">
            <div class="article-container projects">
              <img src="./project-3.png" alt="project 3" class="project-img" />
            </div>
            <h2 class="experience-sub-title project-title">Glamourtique</h2>
            <div class="btn-container">
              <button class="btn btn-color-2 project-btn" onclick="window.open('https://github.com/ajravinath/glamourtique', '_blank')">
                Github
              </button>
              <button disabled class="btn btn-color-2 project-btn" onclick="window.open('https://github.com/ajravinath/glamourtique', '_blank')">
                Live Demo
              </button>
            </div>
          </div>
          <div class="details-container color-container">
            <div class="article-container projects">
              <img src="./project-4.png" alt="project 4" class="project-img" />
            </div>
            <h2 class="experience-sub-title project-title">Covid SL</h2>
            <div class="btn-container">
              <button class="btn btn-color-2 project-btn" onclick="window.open('https://github.com/ajravinath/covid-sl', '_blank')">
                Github
              </button>
              <button class="btn btn-color-2 project-btn" onclick="window.open('https://covid-info-sl.netlify.app/', '_blank')">
                Live Demo
              </button>
            </div>
          </div>
          <div class="details-container color-container">
            <div class="article-container projects">
              <img src="./project-5.png" alt="project 5" class="project-img" />
            </div>
            <h2 class="experience-sub-title project-title">earth-212</h2>
            <div class="btn-container">
              <button class="btn btn-color-2 project-btn" onclick="window.open('https://github.com/ajravinath/earth-212', '_blank')">
                Github
              </button>
              <button disabled class="btn btn-color-2 project-btn" onclick="window.open('https://github.com/ajravinath/earth-212', '_blank')">
                Live Demo
              </button>
            </div>
          </div>
        </div>
        <img src="./arrow.png" alt="arrow icon" class="icon arrow" onclick="location.href='./#contact'" />
      </div>
    </section>
    `;

  return template;
};

export default SectionProjects;
