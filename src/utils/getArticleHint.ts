export function getArticleHint({
  article,
  position,
}: {
  article: string;
  position: number;
}): string {
  if (!article || article.length === 0) return "";

  return (
    (position === 0 ? article[0].toLocaleUpperCase() : article[0]) +
    "_ ".repeat(article.length - 1)
  );
}
