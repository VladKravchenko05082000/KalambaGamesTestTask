import { Article } from "./interfaces";

export type LoginCredentials = {
  email: string;
  password: string;
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
