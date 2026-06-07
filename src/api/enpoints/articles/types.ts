import { Article } from "lib/interfaces";

export type ArticleResponse = {
  article: Article;
};

export type ArticlesResponse = {
  articles: Article[];
  articlesCount: number;
};

export type ArticlesQuery = {
  author?: string;
  favorited?: string;
  tag?: string;
  limit?: number;
  offset?: number;
};
