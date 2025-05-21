document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("downloads");

  chrome.downloads.search({ limit: 10, orderBy: ["-startTime"] }, downloads => {
    downloads.forEach(item => {
      const div = document.createElement("div");
      div.className = "download-item";

      const percent = item.totalBytes ? Math.floor((item.bytesReceived / item.totalBytes) * 100) : 0;
      const speed = item.startTime ? ((item.bytesReceived / ((Date.now() - new Date(item.startTime)))).toFixed(2)) : "-";
      const remainingBytes = item.totalBytes - item.bytesReceived;
      const eta = speed > 0 ? (remainingBytes / speed).toFixed(0) : "-";

      const fileName = item.filename.split("\\").pop();

      div.innerHTML = `
        <div class="filename">${fileName}</div>
        <div class="progress-bar">
          <div class="progress" style="width: ${percent}%"></div>
        </div>
        <div class="speed-time">${item.state === "in_progress" ? `⏳ ${speed} KB/s • ETA ${eta}s` : "✅ Completed"}</div>
        <div class="actions"></div>
      `;

      const actions = div.querySelector(".actions");

      const copyBtn = document.createElement("button");
      copyBtn.title = "Copy Link";
      copyBtn.innerHTML = `<i class="fas fa-link"></i>`;
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(item.url);
      });

      const showBtn = document.createElement("button");
      showBtn.title = "Show in Folder";
      showBtn.innerHTML = `<i class="fas fa-folder-open"></i>`;
      showBtn.addEventListener("click", () => {
        chrome.downloads.show(item.id);
      });

      const removeBtn = document.createElement("button");
      removeBtn.title = "Remove";
      removeBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
      removeBtn.addEventListener("click", () => {
        chrome.downloads.erase({ id: item.id });
        div.remove(); // Optional: remove from UI immediately
      });

      actions.appendChild(copyBtn);
      actions.appendChild(showBtn);
      actions.appendChild(removeBtn);

      container.appendChild(div);
    });
  });
});
