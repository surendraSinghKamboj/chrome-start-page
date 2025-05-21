document.addEventListener("DOMContentLoaded", () => {
  const historyList = document.getElementById("historyList");
  const searchInput = document.getElementById("searchInput");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const exportBtn = document.getElementById("exportBtn");
  const clearBtn = document.getElementById("clearBtn");
  const themeSwitch = document.getElementById("themeSwitch");

  // Load theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeSwitch.checked = true;
  }

  themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", themeSwitch.checked ? "dark" : "light");
  });

  // Fetch history
  function fetchHistory() {
    const query = searchInput.value;
    const start = startDate.value ? new Date(startDate.value).getTime() : 0;
    const end = endDate.value ? new Date(endDate.value).getTime() + 86400000 : Date.now();

    chrome.history.search({
      text: query,
      startTime: start,
      endTime: end,
      maxResults: 100
    }, (results) => {
      renderHistory(results);
    });
  }

  function renderHistory(data) {
    historyList.innerHTML = "";
    data.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="history-item">
          <a href="${item.url}" target="_blank">${item.title || item.url}</a>
          <small>${new Date(item.lastVisitTime).toLocaleString()}</small>
          <div class="history-actions">
            <button class="copy-btn" title="Copy link">
              <i class="fas fa-link"></i>
            </button>
            <button class="delete-btn" title="Remove from history">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      `;
      
      // Add copy functionality
      const copyBtn = li.querySelector('.copy-btn');
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(item.url).then(() => {
          // Show copied feedback
          const originalIcon = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="fas fa-check"></i>';
          copyBtn.title = "Copied!";
          setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
            copyBtn.title = "Copy link";
          }, 2000);
        });
      });
      
      // Add delete functionality
      const deleteBtn = li.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        chrome.history.deleteUrl({ url: item.url }, () => {
          li.remove();
        });
      });
      
      historyList.appendChild(li);
    });
  }

  // CSV Export
  exportBtn.addEventListener("click", () => {
    chrome.history.search({
      text: searchInput.value,
      startTime: startDate.value ? new Date(startDate.value).getTime() : 0,
      endTime: endDate.value ? new Date(endDate.value).getTime() + 86400000 : Date.now(),
      maxResults: 100
    }, (results) => {
      const rows = [["Title", "URL", "Last Visited"]];
      results.forEach(item => {
        rows.push([item.title, item.url, new Date(item.lastVisitTime).toLocaleString()]);
      });
      const csvContent = rows.map(e => e.map(a => `"${a.replace(/"/g, '""')}"`).join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "history.csv";
      link.click();
    });
  });

  // Clear history list (not actual browser history)
  clearBtn.addEventListener("click", () => {
    historyList.innerHTML = "";
  });

  searchInput.addEventListener("input", fetchHistory);
  startDate.addEventListener("change", fetchHistory);
  endDate.addEventListener("change", fetchHistory);

  fetchHistory(); // initial fetch
});