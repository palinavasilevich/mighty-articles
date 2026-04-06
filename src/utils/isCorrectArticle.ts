export function isCorrectArticle(guess: string, answer: string): boolean {
  return guess.toLowerCase().trim() === answer.toLowerCase().trim();
}
