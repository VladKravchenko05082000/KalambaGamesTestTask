import { api } from "api/http-client";

import { ArticleResponse, ArticlesQuery, ArticlesResponse } from "./types";
import { Article } from "lib/interfaces";

export async function listArticles(params: ArticlesQuery = {}): Promise<ArticlesResponse> {
  const { data } = await api.get<ArticlesResponse>("/articles", { params });
  return data;
}

export async function getArticle(slug: string): Promise<Article> {
  const { data } = await api.get<ArticleResponse>(`/articles/${encodeURIComponent(slug)}`);
  return data.article;
}

export async function favoriteArticle(slug: string): Promise<Article> {
  const { data } = await api.post<ArticleResponse>(`/articles/${encodeURIComponent(slug)}/favorite`);
  return data.article;
}

export async function unfavoriteArticle(slug: string): Promise<Article> {
  const { data } = await api.delete<ArticleResponse>(`/articles/${encodeURIComponent(slug)}/favorite`);
  return data.article;
}
