function renderHomeProjects() {
  const grid = document.querySelector("#projectGrid");
  if (!grid) return;

  grid.innerHTML = projects.map((project) => `
    <article class="project-card">
      <a class="project-card-main" href="project.html?id=${project.id}" aria-label="Open ${project.title}">
        <img src="${project.cover}" alt="${project.title} preview" loading="lazy">
        <div class="project-card-body">
          <span>${project.category}</span>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
        </div>
      </a>
    </article>
  `).join("");
}

function renderProjectLinks(project) {
  if (!project.links || project.links.length === 0) return "";

  return project.links.map((link) => `
    <a href="${link.url}"${link.url === "#" ? "" : ' target="_blank" rel="noreferrer"'}>${link.label}</a>
  `).join("");
}

function renderProjectDetail() {
  const detail = document.querySelector("#projectDetail");
  if (!detail) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || projects[0].id;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    detail.innerHTML = `
      <section class="project-hero section-band">
        <div class="container">
          <p class="eyebrow">Project not found</p>
          <h1>This project is not available.</h1>
          <a class="button primary" href="index.html#projects">Back to Projects</a>
        </div>
      </section>
    `;
    return;
  }

  document.title = `${project.title} | Ahmad Abdelhamid`;
  detail.innerHTML = `
    <section class="project-hero section-band">
      <div class="container project-hero-grid">
        <div>
          <a class="back-link" href="index.html#projects">Back to projects</a>
          <p class="eyebrow">${project.category}</p>
          <h1>${project.title}</h1>
          <p class="lead">${project.summary}</p>
          <div class="project-links hero-links">
            ${renderProjectLinks(project)}
          </div>
        </div>
        <img class="project-hero-image" src="${project.cover}" alt="${project.title} main preview">
      </div>
    </section>

    <section class="project-content">
      <div class="container project-content-grid">
        <div>
          <p class="eyebrow">Application Info</p>
          <h2>Overview</h2>
          <p>${project.details}</p>
          <ul class="feature-list">
            ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
          </ul>
        </div>
        <div class="gallery">
          ${project.gallery.map((image, index) => `
            <img src="${image}" alt="${project.title} gallery image ${index + 1}" loading="lazy">
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

renderHomeProjects();
renderProjectDetail();
