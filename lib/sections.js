// Muted, restrained section palette — used as the small identifying
// mark on every story (eyebrow dot + left rule on cards).
export const SECTION_COLORS = {
  world: "#16233F",
  politics: "#5B3357",
  technology: "#1F5C57",
  tech: "#1F5C57",
  business: "#2E5339",
  sport: "#B4232C",
  culture: "#9C7A2E",
  science: "#35526E",
  travel: "#8C4A2F",
  environment: "#2E5339",
  general: "#16233F",
};

export function sectionColor(name = "") {
  const key = name.toLowerCase().trim();
  return SECTION_COLORS[key] || "#16233F";
}

export function formatDate(value) {
  if (!value) return "";
  try {
    const date = new Date(value);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase();
  } catch {
    return value;
  }
}
