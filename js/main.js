fetch("./aayush-sharma.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load JSON");
    return res.json();
  })
  .then((data) => {
    const el = (id) => document.getElementById(id);
    const basics = data.basics || {};

    const safeArray = (value) => (Array.isArray(value) ? value : []);
    const safeText = (value, fallback = "") => (value ? value : fallback);

    const formatDate = (value) => {
      if (!value) return "Present";
      const parts = value.split("-");
      if (parts.length === 2) {
        const [year, month] = parts;
        const date = new Date(`${year}-${month}-01`);
        return date.toLocaleString("en-US", { month: "short", year: "numeric" });
      }
      return value;
    };

    const actionButtonBase =
      "hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition shadow-sm";

    const setActionButton = (button, type, href) => {
      if (!button || !href) {
        if (button) {
          button.className = "hidden";
          button.removeAttribute("href");
        }
        return;
      }

      button.href = href;
      button.className = actionButtonBase;

      if (type === "live") {
        button.classList.add("bg-indigo-600", "text-white", "hover:bg-indigo-700");
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 3h7v7"></path>
            <path d="M10 14 21 3"></path>
            <path d="M21 14v7h-7"></path>
            <path d="M3 10V3h7"></path>
            <path d="M3 21l7-7"></path>
          </svg>
          <span>View Live</span>
        `;
      } else if (type === "image") {
        button.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <path d="M21 15l-5-5L5 21"></path>
          </svg>
          <span>View Image</span>
        `;
      } else {
        button.classList.add("bg-slate-900", "text-white", "hover:bg-slate-700");
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 3h7v7"></path>
            <path d="M10 14 21 3"></path>
            <path d="M5 7v12h12"></path>
          </svg>
          <span>Visit Issuer</span>
        `;
      }

      button.classList.remove("hidden");
    };

    if (el("nav-name")) el("nav-name").textContent = basics.personalInfo?.name || "Portfolio";
    if (el("hero-name")) el("hero-name").textContent = basics.personalInfo?.name || "";
    if (el("hero-headline")) el("hero-headline").textContent = basics.personalInfo?.headline || "";
    if (el("hero-summary")) el("hero-summary").textContent = basics.personalInfo?.summary || "";
    if (el("hero-image") && basics.personalInfo?.image) {
      el("hero-image").src = basics.personalInfo.image;
    }

    const socialLinks = el("social-links");
    const profiles = basics.profiles || {};

    const profileConfig = {
      linkedin: {
        label: "LinkedIn",
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3ZM20.44 12.44c0-3.46-1.85-5.07-4.32-5.07-1.99 0-2.88 1.1-3.38 1.87V8.5H9.37c.04.49 0 11.5 0 11.5h3.37v-6.42c0-.34.03-.68.13-.92.27-.68.9-1.38 1.95-1.38 1.38 0 1.93 1.04 1.93 2.57V20h3.38v-7.56Z"/>
          </svg>
        `
      },
      github: {
        label: "GitHub",
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.3 9.43 7.88 10.96.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.76.4-1.27.73-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.59.23 2.77.11 3.06.73.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A11.54 11.54 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5Z"/>
          </svg>
        `
      },
      leetcode: {
        label: "LeetCode",
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.58 3.52a1 1 0 0 1 1.41 0l4.49 4.49a1 1 0 0 1 0 1.41l-4.49 4.49a1 1 0 1 1-1.41-1.41L19.37 9 15.58 5.22a1 1 0 0 1 0-1.7ZM8.42 20.48a1 1 0 0 1-1.41 0L2.52 16a1 1 0 0 1 0-1.41l4.49-4.49a1 1 0 1 1 1.41 1.41L4.63 15l3.79 3.78a1 1 0 0 1 0 1.7ZM8 11h8a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2Z"/>
          </svg>
        `
      },
      hackerrank: {
        label: "HackerRank",
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 3.34 7v10L12 22l8.66-5V7L12 2Zm1.2 15.2v-4.1h-2.4v4.1H8.9V6.8h1.9v4h2.4v-4h1.9v10.4h-1.9Z"/>
          </svg>
        `
      },
      twitter: {
        label: "Twitter",
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.25l-4.9-6.4L6.45 22H3.34l7.24-8.28L1 2h6.4l4.43 5.85L18.9 2Zm-1.1 18h1.73L6.46 3.9H4.6L17.8 20Z"/>
          </svg>
        `
      },
      instagram: {
        label: "Instagram",
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 1.8A3.96 3.96 0 0 0 3.8 7.75v8.5a3.96 3.96 0 0 0 3.95 3.95h8.5a3.96 3.96 0 0 0 3.95-3.95v-8.5a3.96 3.96 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z"/>
          </svg>
        `
      }
    };

    if (socialLinks) {
      socialLinks.innerHTML = "";

      Object.entries(profiles).forEach(([name, url]) => {
        if (!url || !profileConfig[name]) return;

        socialLinks.innerHTML += `
          <a
            href="${url}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white text-slate-700 border border-slate-200 rounded-lg hover:border-indigo-300 hover:text-indigo-700 hover:shadow-md transition"
          >
            ${profileConfig[name].icon}
            <span>${profileConfig[name].label}</span>
          </a>
        `;
      });

      if (basics.contactInfo?.website) {
        socialLinks.innerHTML += `
          <a
            href="${basics.contactInfo.website}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M2 12h20"></path>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"></path>
            </svg>
            <span>Portfolio</span>
          </a>
        `;
      }
    }

    if (el("about-summary")) {
      el("about-summary").textContent =
        data.about?.professionalSummary?.summary || basics.personalInfo?.summary || "";
    }

    const skillsContainer = el("skills-container");
    const skills = data.skills || data.about?.technicalSkills || {};
    if (skillsContainer) {
      skillsContainer.innerHTML = "";
      Object.entries(skills).forEach(([category, list]) => {
        skillsContainer.innerHTML += `
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 class="font-bold mb-2 capitalize">${category.replace(/([A-Z])/g, " $1")}</h3>
            <p class="text-sm text-slate-600">${Array.isArray(list) ? list.join(", ") : ""}</p>
          </div>
        `;
      });
    }

    const expContainer = el("experience-container");
    const experience = safeArray(data.experience);
    if (expContainer) {
      expContainer.innerHTML = "";

      experience.forEach((exp, index) => {
        const isLeft = index % 2 === 0;
        const city = exp.location?.city ? `${exp.location.city}, ${exp.location?.country || ""}` : "";
        const companyLine = [safeText(exp.company?.name), city].filter(Boolean).join(" • ");

        expContainer.innerHTML += `
          <div class="timeline-item opacity-0 translate-y-10 transition-all duration-700 relative flex flex-col md:flex-row ${isLeft ? "md:justify-start" : "md:justify-end"}">
            <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white z-10"></div>

            <div class="mt-8 md:mt-0 md:w-5/12 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}">
              <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <p class="text-sm font-semibold text-indigo-600">
                  ${formatDate(exp.duration?.start)} – ${formatDate(exp.duration?.end)}
                </p>

                <h3 class="text-lg font-bold mt-1">${safeText(exp.jobTitle)}</h3>
                <p class="text-slate-600 font-medium">${companyLine}</p>

                ${
                  exp.employmentType || exp.location?.workType
                    ? `<p class="text-xs text-slate-500 mt-1">${[safeText(exp.employmentType), safeText(exp.location?.workType)].filter(Boolean).join(" • ")}</p>`
                    : ""
                }

                ${
                  safeArray(exp.responsibilities).length
                    ? `
                  <ul class="mt-3 list-disc list-inside text-sm text-slate-600 space-y-1">
                    ${safeArray(exp.responsibilities)
                      .map((r) => `<li>${r}</li>`)
                      .join("")}
                  </ul>
                `
                    : ""
                }

                ${
                  safeArray(exp.technologiesUsed).length
                    ? `
                  <div class="mt-4 flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}">
                    ${safeArray(exp.technologiesUsed)
                      .map(
                        (t) =>
                          `<span class="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">${t}</span>`
                      )
                      .join("")}
                  </div>
                `
                    : ""
                }
              </div>
            </div>
          </div>
        `;
      });
    }

    const eduContainer = el("education-container");
    const education = safeArray(data.education);
    if (eduContainer) {
      eduContainer.innerHTML = "";
      education.forEach((edu) => {
        eduContainer.innerHTML += `
          <div class="bg-white p-6 rounded-xl shadow">
            <h3 class="font-bold text-lg">${safeText(edu.degree)}</h3>
            <p class="text-indigo-600 font-medium">${safeText(edu.institution?.name)}</p>
            <p class="text-sm text-slate-500">${safeText(edu.fieldOfStudy)} • ${formatDate(edu.duration?.start)} – ${formatDate(edu.duration?.end)}</p>
            ${edu.score ? `<p class="mt-2 text-sm font-medium text-slate-700">${edu.score}</p>` : ""}
          </div>
        `;
      });
    }

    const volContainer = el("volunteering-container");
    const volunteering = safeArray(data.volunteering);
    if (volContainer) {
      volContainer.innerHTML = "";
      volunteering.forEach((v) => {
        volContainer.innerHTML += `
          <div class="bg-slate-50 p-6 rounded-xl shadow">
            <h3 class="font-bold">${safeText(v.role)}</h3>
            <p class="text-indigo-600 font-medium">${safeText(v.organization?.name)}</p>
            <p class="text-sm text-slate-500">${formatDate(v.duration?.start)} – ${formatDate(v.duration?.end)}</p>
            ${
              safeArray(v.description).length
                ? `
              <ul class="mt-3 list-disc list-inside text-sm text-slate-600 space-y-1">
                ${safeArray(v.description).map((d) => `<li>${d}</li>`).join("")}
              </ul>
            `
                : ""
            }
          </div>
        `;
      });
    }

    const projectContainer = el("projects-container");
    const projects = safeArray(data.projects);

    const projectModal = el("project-modal");
    const projectModalImg = el("project-modal-image");
    const projectModalTitle = el("project-modal-title");
    const projectModalDesc = el("project-modal-description");
    const projectModalObjectives = el("project-modal-objectives");
    const projectModalOutcomes = el("project-modal-outcomes");
    const projectModalTech = el("project-modal-tech");
    const projectModalLink = el("project-modal-link");
    const projectModalClose = el("project-modal-close");
    const projectObjectivesWrapper = el("project-objectives-wrapper");
    const projectOutcomesWrapper = el("project-outcomes-wrapper");
    const projectTechWrapper = el("project-tech-wrapper");

    if (projectContainer) {
      projectContainer.innerHTML = "";

      projects.forEach((p, index) => {
        projectContainer.innerHTML += `
          <div class="project-card cursor-pointer bg-white rounded-xl shadow hover:shadow-2xl transition overflow-hidden" data-index="${index}">
            ${p.image ? `<img src="${p.image}" alt="${p.title}" class="h-48 w-full object-cover">` : ""}
            <div class="p-6">
              <h3 class="font-bold text-lg mb-2">${safeText(p.title)}</h3>
              <p class="text-sm text-slate-600 mb-4 line-clamp-4">${safeText(p.description)}</p>
              <p class="text-indigo-600 font-semibold text-sm">Click to view details</p>
            </div>
          </div>
        `;
      });

      document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("click", () => {
          const project = projects[card.dataset.index];

          projectModalImg.src = project.image || "";
          projectModalImg.alt = project.title || "Project Preview";
          projectModalTitle.textContent = safeText(project.title, "Project");
          projectModalDesc.textContent = safeText(project.description, "No description available.");

          if (safeArray(project.objectives).length) {
            projectModalObjectives.innerHTML = safeArray(project.objectives)
              .map((item) => `<li>${item}</li>`)
              .join("");
            projectObjectivesWrapper.classList.remove("hidden");
          } else {
            projectModalObjectives.innerHTML = "";
            projectObjectivesWrapper.classList.add("hidden");
          }

          if (safeArray(project.outcomes).length) {
            projectModalOutcomes.innerHTML = safeArray(project.outcomes)
              .map((item) => `<li>${item}</li>`)
              .join("");
            projectOutcomesWrapper.classList.remove("hidden");
          } else {
            projectModalOutcomes.innerHTML = "";
            projectOutcomesWrapper.classList.add("hidden");
          }

          if (safeArray(project.technologiesUsed).length) {
            projectModalTech.innerHTML = safeArray(project.technologiesUsed)
              .map(
                (tech) =>
                  `<span class="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">${tech}</span>`
              )
              .join("");
            projectTechWrapper.classList.remove("hidden");
          } else {
            projectModalTech.innerHTML = "";
            projectTechWrapper.classList.add("hidden");
          }

          if (project.url) {
            setActionButton(projectModalLink, "live", project.url);
          } else if (project.image) {
            setActionButton(projectModalLink, "image", project.image);
          } else {
            setActionButton(projectModalLink, "", "");
          }

          projectModal.classList.remove("hidden");
          projectModal.classList.add("flex");
          document.body.style.overflow = "hidden";
        });
      });
    }

    const certContainer = el("certifications-container");
    const certifications = safeArray(data.certifications);

    const certModal = el("certificate-modal");
    const certModalImg = el("certificate-modal-image");
    const certModalTitle = el("certificate-modal-title");
    const certModalIssuer = el("certificate-modal-issuer");
    const certModalDate = el("certificate-modal-date");
    const certModalCredential = el("certificate-modal-credential");
    const certModalExpiry = el("certificate-modal-expiry");
    const certModalDesc = el("certificate-modal-description");
    const certModalSkills = el("certificate-modal-skills");
    const certModalLink = el("certificate-modal-link");
    const certModalClose = el("certificate-modal-close");
    const certCredentialRow = el("certificate-credential-row");
    const certExpiryRow = el("certificate-expiry-row");
    const certSkillsWrapper = el("certificate-skills-wrapper");

    if (certContainer) {
      certContainer.innerHTML = "";
      certifications.forEach((c, index) => {
        certContainer.innerHTML += `
          <div class="certificate-card cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-2xl transition text-center border border-slate-100" data-index="${index}">
            ${c.image ? `<img src="${c.image}" alt="${c.title}" class="h-28 mx-auto object-contain mb-4 rounded-lg" />` : ""}
            <p class="font-semibold text-sm text-slate-800">${safeText(c.title)}</p>
            <p class="text-xs text-slate-500 mt-1">${safeText(c.issuingOrganization?.name)}</p>
            <p class="text-xs text-indigo-600 mt-2 font-medium">Click to view details</p>
          </div>
        `;
      });

      document.querySelectorAll(".certificate-card").forEach((card) => {
        card.addEventListener("click", () => {
          const cert = certifications[card.dataset.index];

          certModalImg.src = cert.image || "";
          certModalImg.alt = cert.title || "Certificate Preview";
          certModalTitle.textContent = safeText(cert.title, "Certificate");
          certModalIssuer.textContent = safeText(cert.issuingOrganization?.name, "Not available");
          certModalDate.textContent = formatDate(cert.issueDate) || "Not available";
          certModalDesc.textContent = safeText(cert.description, "No description available.");

          if (cert.credentialID) {
            certModalCredential.textContent = cert.credentialID;
            certCredentialRow.classList.remove("hidden");
          } else {
            certCredentialRow.classList.add("hidden");
          }

          if (cert.expirationDate) {
            certModalExpiry.textContent = formatDate(cert.expirationDate);
            certExpiryRow.classList.remove("hidden");
          } else {
            certExpiryRow.classList.add("hidden");
          }

          if (safeArray(cert.skills).length) {
            certModalSkills.innerHTML = safeArray(cert.skills)
              .map(
                (skill) =>
                  `<span class="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">${skill}</span>`
              )
              .join("");
            certSkillsWrapper.classList.remove("hidden");
          } else {
            certModalSkills.innerHTML = "";
            certSkillsWrapper.classList.add("hidden");
          }

          if (cert.image) {
            setActionButton(certModalLink, "image", cert.image);
          } else if (cert.issuingOrganization?.url) {
            setActionButton(certModalLink, "issuer", cert.issuingOrganization.url);
          } else {
            setActionButton(certModalLink, "", "");
          }

          certModal.classList.remove("hidden");
          certModal.classList.add("flex");
          document.body.style.overflow = "hidden";
        });
      });
    }

    const honorsContainer = el("honors-container");
    const honorsAndAwards = safeArray(data.honorsAndAwards);

    const awardModal = el("award-modal");
    const awardModalImg = el("award-modal-image");
    const awardModalTitle = el("award-modal-title");
    const awardModalIssuer = el("award-modal-issuer");
    const awardModalDate = el("award-modal-date");
    const awardModalDesc = el("award-modal-description");
    const awardModalLink = el("award-modal-link");
    const awardModalClose = el("award-modal-close");

    if (honorsContainer) {
      honorsContainer.innerHTML = "";

      honorsAndAwards.forEach((award, index) => {
        honorsContainer.innerHTML += `
          <div class="award-card cursor-pointer bg-white rounded-xl shadow hover:shadow-2xl transition overflow-hidden" data-index="${index}">
            ${award.image ? `<img src="${award.image}" alt="${award.title}" class="h-52 w-full object-cover">` : ""}
            <div class="p-6">
              <h3 class="font-bold text-lg mb-1">${safeText(award.title)}</h3>
              <p class="text-sm font-semibold text-indigo-600">${safeText(award.issuer)}</p>
              <p class="text-xs text-slate-500">${formatDate(award.date)}</p>
              <p class="text-xs text-indigo-600 mt-2 font-medium">Click to view details</p>
            </div>
          </div>
        `;
      });

      document.querySelectorAll(".award-card").forEach((card) => {
        card.addEventListener("click", () => {
          const award = honorsAndAwards[card.dataset.index];

          awardModalImg.src = award.image || "";
          awardModalImg.alt = award.title || "Award Preview";
          awardModalTitle.textContent = safeText(award.title, "Award");
          awardModalIssuer.textContent = safeText(award.issuer);
          awardModalDate.textContent = formatDate(award.date);
          awardModalDesc.textContent = safeText(award.description, "No description available.");

          if (award.image) {
            setActionButton(awardModalLink, "image", award.image);
          } else {
            setActionButton(awardModalLink, "", "");
          }

          awardModal.classList.remove("hidden");
          awardModal.classList.add("flex");
          document.body.style.overflow = "hidden";
        });
      });
    }

    const closeProjectModal = () => {
      if (!projectModal) return;
      projectModal.classList.add("hidden");
      projectModal.classList.remove("flex");
      document.body.style.overflow = "";
    };

    const closeCertificateModal = () => {
      if (!certModal) return;
      certModal.classList.add("hidden");
      certModal.classList.remove("flex");
      document.body.style.overflow = "";
    };

    const closeAwardModal = () => {
      if (!awardModal) return;
      awardModal.classList.add("hidden");
      awardModal.classList.remove("flex");
      document.body.style.overflow = "";
    };

    if (projectModalClose) projectModalClose.addEventListener("click", closeProjectModal);
    if (certModalClose) certModalClose.addEventListener("click", closeCertificateModal);
    if (awardModalClose) awardModalClose.addEventListener("click", closeAwardModal);

    if (projectModal) {
      projectModal.addEventListener("click", (e) => {
        if (e.target === projectModal) closeProjectModal();
      });
    }

    if (certModal) {
      certModal.addEventListener("click", (e) => {
        if (e.target === certModal) closeCertificateModal();
      });
    }

    if (awardModal) {
      awardModal.addEventListener("click", (e) => {
        if (e.target === awardModal) closeAwardModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (projectModal && !projectModal.classList.contains("hidden")) closeProjectModal();
        if (certModal && !certModal.classList.contains("hidden")) closeCertificateModal();
        if (awardModal && !awardModal.classList.contains("hidden")) closeAwardModal();
      }
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("opacity-0", "translate-y-10");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      document.querySelectorAll(".timeline-item").forEach((item) => observer.observe(item));
    }

    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const lines = document.querySelectorAll(".hamburger-line");
    let menuOpen = false;

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle("hidden");

        if (menuOpen && lines.length >= 3) {
          lines[0].classList.add("rotate-45", "top-4");
          lines[1].classList.add("opacity-0");
          lines[2].classList.add("-rotate-45", "top-4");
        } else if (lines.length >= 3) {
          lines[0].classList.remove("rotate-45", "top-4");
          lines[1].classList.remove("opacity-0");
          lines[2].classList.remove("-rotate-45", "top-4");
        }
      });

      document.querySelectorAll(".mobile-link").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
          menuOpen = false;

          if (lines.length >= 3) {
            lines[0].classList.remove("rotate-45", "top-4");
            lines[1].classList.remove("opacity-0");
            lines[2].classList.remove("-rotate-45", "top-4");
          }
        });
      });
    }
  })
  .catch((err) => console.error("Portfolio JSON error:", err));

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("status");
    const button = form.querySelector("button");

    status.innerText = "Sending message...";
    button.disabled = true;
    button.innerText = "Sending...";

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      status.innerHTML = "Please fill all required fields.";
      button.disabled = false;
      button.innerText = "Send Message";
      return;
    }

    let APIURL = "/api/send-email";

    if (location.hostname === "127.0.0.1" || location.hostname === "localhost") {
      APIURL = "https://aayush-ki-pehchan.vercel.app/api/send-email";
    }

    try {
      const res = await fetch(APIURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        status.innerHTML =
          '<span style="color:green;font-weight:600;">Message sent successfully! Please check your email.</span>';
        form.reset();
      } else {
        status.innerHTML =
          '<span style="color:red;font-weight:600;">Failed to send message. Try again.</span>';
      }
    } catch (err) {
      console.error(err);
      status.innerHTML =
        '<span style="color:red;font-weight:600;">Cannot connect to server.</span>';
    }

    button.disabled = false;
    button.innerText = "Send Message";
  });
}