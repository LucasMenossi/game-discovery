export function getEnglishDescription(description: string) {
  return description
    .split(/\r?\nEspañol\r?\n/)[0]
    .trim()
    .split(/\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
