fetch("./aayush-sharma.json")
  .then(res => {
    if (!res.ok) throw new Error("Failed to load JSON");
    return res.json();
  })
  .then(data => {

    /* ================= UTIL ================= */
    const el = id => document.getElementById(id);

    /* ================= HERO / NAV ================= */
    const basics = data.basics || {};

    if (el("nav-name"))
      el("nav-name").textContent = basics.personalInfo?.name || "Portfolio";

    if (el("hero-name"))
      el("hero-name").textContent = basics.personalInfo?.name || "";

    if (el("hero-headline"))
      el("hero-headline").textContent = basics.personalInfo?.headline || "";

    if (el("hero-summary"))
      el("hero-summary").textContent = basics.personalInfo?.summary || "";

    if (el("hero-image") && basics.personalInfo?.image)
      el("hero-image").src = basics.personalInfo.image;

    /* ================= SOCIAL LINKS ================= */
    const socialLinks = el("social-links");
    const profiles = basics.profiles || {};

    if (socialLinks) {
      Object.entries(profiles).forEach(([name, url]) => {
        if (url) {
          socialLinks.innerHTML += `
            <a href="${url}" target="_blank"
               class="capitalize px-4 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition">
              ${name}
            </a>
          `;
        }
      });
    }

    /* ================= ABOUT ================= */
    if (el("about-summary")) {
      el("about-summary").textContent =
        data.about?.professionalSummary?.summary ||
        basics.personalInfo?.summary ||
        "";
    }

    /* ================= SKILLS ================= */
    const skillsContainer = el("skills-container");
    const skills =
      data.skills ||
      data.about?.technicalSkills ||
      {};

    if (skillsContainer) {
      Object.entries(skills).forEach(([category, list]) => {
        skillsContainer.innerHTML += `
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 class="font-bold mb-2 capitalize">
              ${category.replace(/([A-Z])/g, " $1")}
            </h3>
            <p class="text-sm text-slate-600">
              ${Array.isArray(list) ? list.join(", ") : ""}
            </p>
          </div>
        `;
      });
    }

    /* ================= EXPERIENCE (TIMELINE) ================= */
    const expContainer = el("experience-container");
    const experience = data.experience || [];

    const formatDate = d => d ? d : "Present";

    if (expContainer && experience.length) {
      experience.forEach((exp, index) => {
        const isLeft = index % 2 === 0;

        expContainer.innerHTML += `
          <div class="timeline-item opacity-0 translate-y-10 transition-all duration-700
                      relative flex flex-col md:flex-row
                      ${isLeft ? "md:justify-start" : "md:justify-end"}">

            <!-- DOT -->
            <div class="absolute left-4 md:left-1/2 -translate-x-1/2
                        w-4 h-4 bg-indigo-600 rounded-full border-4 border-white"></div>

            <!-- CARD -->
            <div class="mt-8 md:mt-0 md:w-5/12
                        ${isLeft ? "md:pr-10 md:text-right" : "md:pl-10"}">
              <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

                <p class="text-sm font-semibold text-indigo-600">
                  ${formatDate(exp.duration?.start)} – ${formatDate(exp.duration?.end)}
                </p>

                <h3 class="text-lg font-bold mt-1">
                  ${exp.jobTitle || ""}
                </h3>

                <p class="text-slate-600 font-medium">
                  ${exp.company?.name || ""}
                  ${exp.location?.city ? `• ${exp.location.city}, ${exp.location.country}` : ""}
                </p>

                ${exp.responsibilities?.length ? `
                  <ul class="mt-3 list-disc list-inside text-sm text-slate-600 space-y-1">
                    ${exp.responsibilities.map(r => `<li>${r}</li>`).join("")}
                  </ul>` : ""}

                ${exp.technologiesUsed?.length ? `
                  <div class="mt-4 flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}">
                    ${exp.technologiesUsed.map(t => `
                      <span class="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                        ${t}
                      </span>
                    `).join("")}
                  </div>` : ""}
              </div>
            </div>
          </div>
        `;
      });
    }

    /* ================= EDUCATION ================= */
    const eduContainer = el("education-container");
    const education = data.education || [];

    if (eduContainer) {
      education.forEach(edu => {
        eduContainer.innerHTML += `
          <div class="bg-white p-6 rounded-xl shadow">
            <h3 class="font-bold text-lg">${edu.degree || ""}</h3>
            <p class="text-indigo-600 font-medium">
              ${edu.institution?.name || ""}
            </p>
            <p class="text-sm text-slate-500">
              ${edu.fieldOfStudy || ""} •
              ${edu.duration?.start || ""} – ${edu.duration?.end || "Present"}
            </p>
            ${edu.score ? `
              <p class="mt-2 text-sm font-medium text-slate-700">
                ${edu.score}
              </p>` : ""}
          </div>
        `;
      });
    }

    /* ================= VOLUNTEERING ================= */
    const volContainer = el("volunteering-container");
    const volunteering = data.volunteering || [];

    if (volContainer) {
      volunteering.forEach(v => {
        volContainer.innerHTML += `
          <div class="bg-slate-50 p-6 rounded-xl shadow">
            <h3 class="font-bold">${v.role || ""}</h3>
            <p class="text-indigo-600 font-medium">
              ${v.organization?.name || ""}
            </p>
            <p class="text-sm text-slate-500">
              ${v.duration?.start || ""} – ${v.duration?.end || "Present"}
            </p>
            ${v.description?.length ? `
              <ul class="mt-3 list-disc list-inside text-sm text-slate-600 space-y-1">
                ${v.description.map(d => `<li>${d}</li>`).join("")}
              </ul>` : ""}
          </div>
        `;
      });
    }

    /* ================= PROJECTS ================= */
    const projectContainer = el("projects-container");
    const projects = data.projects || [];

    if (projectContainer) {
      projects.forEach(p => {
        projectContainer.innerHTML += `
          <div class="bg-white rounded-xl shadow hover:shadow-2xl transition overflow-hidden">
            ${p.image ? `
              <img src="${p.image}" class="h-48 w-full object-cover">` : ""}
            <div class="p-6">
              <h3 class="font-bold text-lg mb-2">${p.title || ""}</h3>
              <p class="text-sm text-slate-600 mb-4">
                ${p.description || ""}
              </p>
              ${p.url ? `
                <a href="${p.url}" target="_blank"
                   class="text-indigo-600 font-semibold">
                  View Project →
                </a>` : ""}
            </div>
          </div>
        `;
      });
    }

    /* ================= CERTIFICATIONS ================= */
    const certContainer = el("certifications-container");
    const certifications = data.certifications || [];

    if (certContainer) {
      certifications.forEach(c => {
        certContainer.innerHTML += `
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center">
            ${c.image ? `
              <img src="${c.image}"
                   class="h-28 mx-auto object-contain mb-4">` : ""}
            <p class="font-semibold text-sm">${c.title || ""}</p>
            <p class="text-xs text-slate-500 mt-1">
              ${c.issuingOrganization?.name || ""}
            </p>
          </div>
        `;
      });
    }

        /* ================= HONORS & AWARDS (MODAL ENABLED) ================= */
    const honorsContainer = el("honors-container");
    const honorsAndAwards = data.honorsAndAwards || [];

    // Modal elements
    const modal = el("award-modal");
    const modalImg = el("award-modal-image");
    const modalTitle = el("award-modal-title");
    const modalIssuer = el("award-modal-issuer");
    const modalDate = el("award-modal-date");
    const modalDesc = el("award-modal-description");
    const modalClose = el("award-modal-close");

    if (honorsContainer && honorsAndAwards.length) {
      honorsAndAwards.forEach((award, index) => {
        honorsContainer.innerHTML += `
          <div class="award-card cursor-pointer bg-white rounded-xl shadow hover:shadow-2xl transition overflow-hidden"
              data-index="${index}">

            ${award.image ? `
              <img src="${award.image}"
                  alt="${award.title}"
                  class="h-52 w-full object-cover">` : ""}

            <div class="p-6">
              <h3 class="font-bold text-lg mb-1">${award.title}</h3>
              <p class="text-sm font-semibold text-indigo-600">${award.issuer}</p>
              <p class="text-xs text-slate-500">${award.date}</p>
            </div>
          </div>
        `;
      });

      /* ===== OPEN MODAL ===== */
      document.querySelectorAll(".award-card").forEach(card => {
        card.addEventListener("click", () => {
          const award = honorsAndAwards[card.dataset.index];

          modalImg.src = award.image || "";
          modalTitle.textContent = award.title || "";
          modalIssuer.textContent = award.issuer || "";
          modalDate.textContent = award.date || "";
          modalDesc.textContent = award.description || "";

          modal.classList.remove("hidden");
          modal.classList.add("flex");
          document.body.style.overflow = "hidden";
        });
      });
    }

    /* ===== CLOSE MODAL ===== */
    const closeModal = () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "";
    };

    modalClose && modalClose.addEventListener("click", closeModal);

    // Close on outside click
    modal && modal.addEventListener("click", e => {
      if (e.target === modal) closeModal();
    });

    // Close on ESC
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
      }
    });



    /* ================= SCROLL ANIMATION ================= */
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      document.querySelectorAll(".timeline-item")
        .forEach(item => observer.observe(item));
    }

    /* ================= MOBILE NAVBAR ================= */
    /* ================= MOBILE NAVBAR (ANIMATED) ================= */
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const lines = document.querySelectorAll(".hamburger-line");

    let menuOpen = false;

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle("hidden");

        if (menuOpen) {
          // Animate to X
          lines[0].classList.add("rotate-45", "top-4");
          lines[1].classList.add("opacity-0");
          lines[2].classList.add("-rotate-45", "top-4");
        } else {
          // Back to hamburger
          lines[0].classList.remove("rotate-45", "top-4");
          lines[1].classList.remove("opacity-0");
          lines[2].classList.remove("-rotate-45", "top-4");
        }
      });

      document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
          menuOpen = false;

          // Reset icon
          lines[0].classList.remove("rotate-45", "top-4");
          lines[1].classList.remove("opacity-0");
          lines[2].classList.remove("-rotate-45", "top-4");
        });
      });
    }



  })
  .catch(err => {
    console.error("Portfolio JSON error:", err);
  });

/* ================= CONTACT FORM ================= */

const form = document.getElementById("contactForm");

if (form) {

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("status");
    const button = form.querySelector("button");

    status.innerText = "Sending message...";
    button.disabled = true;
    button.innerText = "Sending...";

    /* ---- GET VALUES SAFELY ---- */
    const data = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim()
    };

    /* ---- BASIC VALIDATION ---- */
    if (!data.name || !data.email || !data.message) {
      status.innerHTML = "⚠ Please fill all required fields.";
      button.disabled = false;
      button.innerText = "Send Message";
      return;
    }

    /* ---- DETECT API URL ---- */
    let API_URL = "/api/send-email";

    // If running locally (Live Server)
    if (location.hostname === "127.0.0.1" || location.hostname === "localhost") {
      API_URL = "https://aayush-ki-pehchan.vercel.app/api/send-email";
    }

    try {

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.success) {

        status.innerHTML =
          "<span style='color:green;font-weight:600'>✅ Message sent successfully! Please check your email.</span>";

        form.reset();

      } else {

        status.innerHTML =
          "<span style='color:red;font-weight:600'>❌ Failed to send message. Try again.</span>";
      }

    } catch (err) {

      console.error(err);

      status.innerHTML =
        "<span style='color:red;font-weight:600'>⚠ Cannot connect to server.</span>";
    }

    button.disabled = false;
    button.innerText = "Send Message";
  });
}

