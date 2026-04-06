export function getArticleHint(article: string): string {
  if (!article || article.length === 0) return "";

  return article[0] + "_ ".repeat(article.length - 1);
}
