export function createFileName(text: string): string {
  const cleanedText = text.replace(/[^\w\s]/gi, "").replace(/\s+/g, "_");
  const lowercaseText = cleanedText.toLowerCase();
  return lowercaseText.slice(0, 30);
}