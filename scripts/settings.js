function updateContextTheme(newBg, newCol) {
  const newSettings = {
    bg: newBg,
    col: newCol,
  };
  localStorage.setItem("contextTheme", JSON.stringify(newSettings));
}
