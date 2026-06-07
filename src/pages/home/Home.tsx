import type { FC } from "react";
import { useArticles } from "./hooks/useArticles";

import { ArticlePreview } from "./components/ArticlePreview";
import { FeedToggle } from "./components/FeedToggle";
import { Sidebar } from "components/sidebar";
import { Banner } from "components/banner";
import { Container } from "components/containers";

export const Home: FC = () => {
  const { data, isLoading, isError } = useArticles();

  return (
    <div className="home-page">
      <Banner>
        <h1 className="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </Banner>

      <Container>
        <div className="col-md-9">
          <FeedToggle />

          {isLoading && <div className="article-preview">Loading articles...</div>}

          {isError && <div className="article-preview">Failed to load articles.</div>}

          {data && data.articles.length === 0 && <div className="article-preview">No articles are here... yet.</div>}

          {data?.articles.map(article => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </div>

        <div className="col-md-3">
          <Sidebar />
        </div>
      </Container>
    </div>
  );
};
