document.addEventListener("copy", async () => {
  try {
    const text = await navigator.clipboard.readText();

    // Check if the copied text is a URL
    if (/^https?:\/\/[^\s]+$/.test(text)) {
      showNotification(`🔗 Link copied:\n${text}`);
    }
  } catch (err) {
    console.error("Clipboard read failed:", err);
  }
});

// Function to show in-page notification
function showNotification(message) {
  const notif = document.createElement("div");
  notif.textContent = message;
  Object.assign(notif.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#333",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    zIndex: 9999,
    fontSize: "14px",
    whiteSpace: "pre-wrap",
    opacity: "0",
    transition: "opacity 0.3s ease-in-out"
  });

  document.body.appendChild(notif);
  requestAnimationFrame(() => (notif.style.opacity = "1"));

  setTimeout(() => {
    notif.style.opacity = "0";
    setTimeout(() => notif.remove(), 500);
  }, 3000);
}
