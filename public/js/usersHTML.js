console.log("first");
const fs = require("fs");
const path = require("path");

function datahandler(req, res, data) {
  const templatePath = path.join(__dirname, "../../views/users.html");
  fs.readFile(templatePath, (err, htmlData) => {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading template");
    }

    let cards = "";
    data.forEach((user) => {
      cards += `<article class="user-card reveal">
          <div class="user-card-header">
            <img
              src="${user.profileImage}"
              alt="${user.name}"
              onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff'"
              class="user-avatar"
            />
            <div class="user-info-top">
              <h3 class="user-name">
                ${user.name}
                <span class="verified-badge" title="Verified">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              </h3>
              <p class="user-username">@${user.username}</p>
            </div>
          </div>

          <div class="user-meta">
            <p class="user-role">
              ${user.role} <span class="user-company">@ ${user.company}</span>
            </p>
            <p class="user-location">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${user.location}
            </p>
            <p class="user-location">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              ${user.email}
            </p>
            <p class="user-location">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                ></path>
              </svg>
              ${user.phone}
            </p>
          </div>

          <p class="user-bio">${user.bio}</p>

          <div class="user-skills">
            <span class="tech-chip">${user.skills}</span>
          </div>

          <div class="user-stats">
            <div class="stat">
              <span class="stat-val">${user.followers}</span>
              <span class="stat-key">Followers</span>
            </div>
            <div class="stat">
              <span class="stat-val">${user.following}</span>
              <span class="stat-key">Following</span>
            </div>
          </div>

          <div class="user-actions">
            <a href="#" class="social-btn" target="_blank">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                ></path>
              </svg>
              GitHub
            </a>
            <a href="#" class="social-btn" target="_blank">
              <svg viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                ></path>
              </svg>
              LinkedIn
            </a>
          </div>
        </article>`;
    });

    const finalHtml = htmlData
      .toString()
      .replace("<!-- CARDS_PLACEHOLDER -->", cards);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(finalHtml);
  });
}

module.exports = { datahandler };
