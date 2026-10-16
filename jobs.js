
const categories = [
  {
    id: "it",
    title: "IT & Software Jobs",
    icon: "💻",
    desc: "Software Developer, Web Developer, Testing aur IT jobs.",
    tags: ["IT", "Software", "All India"],
    query: "IT software jobs",
    url: (k, l) =>
      `https://www.naukri.com/${slug(k || "it-jobs")}-jobs${l ? `-in-${slug(l)}` : ""}`
  },
  {
    id: "government",
    title: "Government Jobs",
    icon: "🏛️",
    desc: "Sarkari Naukri, Railway, SSC aur government vacancies.",
    tags: ["Government", "Recruitment", "India"],
    query: "government jobs recruitment official notification",
    url: () => "https://www.ncs.gov.in/"
  },
  {
    id: "sales",
    title: "Sales & Non-Technical",
    icon: "🤝",
    desc: "Sales, Business Development, Customer Support aur Operations.",
    tags: ["Sales", "Non-IT", "Entry level"],
    query: "sales customer support jobs",
    url: (k, l) =>
      `https://www.naukri.com/${slug(k || "sales-executive")}-jobs${l ? `-in-${slug(l)}` : ""}`
  },
  {
    id: "fresher",
    title: "Freshers & Internships",
    icon: "🎓",
    desc: "Freshers, Trainee, Internship aur entry-level jobs.",
    tags: ["Fresher", "Internship", "Entry level"],
    query: "fresher jobs internship",
    url: () => "https://internshala.com/internships/"
  },
  {
    id: "remote",
    title: "Work From Home",
    icon: "🏠",
    desc: "Remote jobs aur Work From Home opportunities.",
    tags: ["Remote", "WFH", "Flexible"],
    query: "work from home remote jobs",
    url: (k, l) =>
      `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(k || "work from home")}&location=${encodeURIComponent(l || "India")}`
  }
];

let active = "all";
let keyword = "";
let jobLocation = "";

function slug(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function render() {
  const cards = document.getElementById("jobCards");

  if (!cards) {
    console.error('Element with id="jobCards" not found');
    return;
  }

  const shown = categories.filter(
    c => active === "all" || c.id === active
  );

  cards.innerHTML = shown.map(c => {
    const searchTerm = keyword || c.query;

    const googleQuery =
      `${searchTerm} jobs ${jobLocation || "India"}`;

    const googleUrl =
      "https://www.google.com/search?q=" +
      encodeURIComponent(googleQuery);

    const portalUrl = c.url(keyword, jobLocation);

    return `
      <article class="card">
        <div class="icon" aria-hidden="true">${c.icon}</div>

        <h3>${c.title}</h3>

        <p>${c.desc}</p>

        <div class="tags">
          ${c.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>

        <p>
          <a
            href="${googleUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔎 Search on Google ↗
          </a>
        </p>

        <p>
          <a
            href="${portalUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            💼 Search on Job Portal ↗
          </a>
        </p>

        <p>
          <a
            href="${portalUrl}"
            target="_blank"
            rel="noopener noreferrer"
            style="display:inline-block;background:#16a34a;color:white;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:bold"
          >
            Apply Now →
          </a>
        </p>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".filter").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === active
    );
  });
}

// Category buttons
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    active = button.dataset.category;
    render();
  });
});

// Search form
const searchForm = document.getElementById("searchForm");

if (searchForm) {
  searchForm.addEventListener("submit", event => {
    event.preventDefault();

    keyword =
      document.getElementById("keyword").value.trim();

    jobLocation =
      document.getElementById("location").value.trim();

    render();
  });
}

console.log("Jobs script loaded");
render();
