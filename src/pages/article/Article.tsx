import type { FC } from "react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useArticle } from "pages/article/hooks/useArticle";

import { CommentForm } from "./components/CommentForm";
import { CommentCard } from "./components/CommentCard";
import { ArticleMeta } from "components/article-meta";
import { Container, Row } from "components/containers";
import { Banner } from "components/banner";

import { COMMENTS } from "./models/comments";
import { renderMarkdown } from "lib/utils/markdown";

export const Article: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, isError } = useArticle(slug);

  const body = useMemo(() => (article ? renderMarkdown(article.body) : ""), [article]);

  return (
    <div className="article-page">
      {isLoading ? (
        <Container isNeedRow={false}>Loading article...</Container>
      ) : isError || !article ? (
        <Container isNeedRow={false}>Failed to load article.</Container>
      ) : (
        <>
          <Banner>
            <h1>{article.title}</h1>
            <ArticleMeta article={article} />
          </Banner>

          <Container isNeedRow={false}>
            <Row additionalClass="article-content">
              <div className="col-md-12" dangerouslySetInnerHTML={{ __html: body }} />
            </Row>

            <hr />

            <div className="article-actions">
              <ArticleMeta article={article} />
            </div>

            <Row>
              <div className="col-xs-12 col-md-8 offset-md-2">
                <CommentForm />

                {COMMENTS.map(comment => (
                  <CommentCard
                    key={comment.id}
                    body={comment.body}
                    authorUsername={comment.authorUsername}
                    authorImage={comment.authorImage}
                    date={comment.date}
                    canModify={comment.canModify}
                  />
                ))}
              </div>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};
