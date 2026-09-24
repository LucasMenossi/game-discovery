export function getEnglishDescription(description: string) {
  return description.split("\nEspañol")[0].trim();
}
