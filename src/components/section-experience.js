const SectionExperience = () => {
  const template = /*html*/ `
    <section id="experience">
      <p class="section__text__p1">Explore My</p>
      <h1 class="title">Experience</h1>
      <div class="experience-details-container">
        <div class="about-containers xp">
          <div class="details-container">
            <h2 class="experience-sub-title">Languages</h2>
            <div class="article-container">
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>JavaScript</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>TypeScript</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>NodeJS</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>Python</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>TypeScript</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>CSS 3</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>HTML 5</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>Dart</h3>
                  <p>Intermidiate</p>
                </div>
              </article>
              <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <h3>Java</h3>
                <p>Intermidiate</p>
              </div>
            </article>
              <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <h3>ReasonML</h3>
                <p>Experienced</p>
              </div>
            </article>
            </div>
          </div>
          <div class="details-container">
            <h2 class="experience-sub-title">Frameworks, Libraries and Technologies</h2>
            <div class="article-container">
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>React.js</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>Next.js</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>Django</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>Flask</h3>
                  <p>Intermidiate</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>Redux</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>Express</h3>
                  <p>Intermidiate</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>Apollo</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>Jest</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>Kubernetes</h3>
                  <p>Intermidiate</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>Docker</h3>
                  <p>Intermidiate</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>GraphQL</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>REST</h3>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <h3>CI/CD</h3>
                  <p>Experienced</p>
                </div>
              </article>
            </div>
          </div>
          <div class="details-container">
          <h2 class="experience-sub-title">Databases</h2>
          <div class="article-container">
            <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <h3>Postgres</h3>
                <p>Experienced</p>
              </div>
            </article>
            <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <h3>MongoDB</h3>
                <p>Experienced</p>
              </div>
            </article>
            <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <h3>SQLite</h3>
                <p>Experienced</p>
              </div>
            </article>
            <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <h3>Snowflake</h3>
                <p>Intermidiate</p>
              </div>
            </article>
            <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <h3>SQL Server</h3>
                <p>Intermidiate</p>
              </div>
            </article>
            <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <h3>MySQL</h3>
                <p>Intermidiate</p>
              </div>
            </article>
          </div>
        </div>
          <img src="./arrow.png" alt="arrow icon" class="icon arrow" onclick="location.href='./#projects'" />
        </div>
      </div>
    </section>
    `;

  return template;
};

export default SectionExperience;
