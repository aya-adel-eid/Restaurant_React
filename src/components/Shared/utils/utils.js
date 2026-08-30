export function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
export function InitialisName(name = "Geust") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
