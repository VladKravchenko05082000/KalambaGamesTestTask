import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuth } from "context/AuthContext";

import { favoriteArticle } from "api/enpoints";

import { FavoriteButton } from "./FavoriteButton";

import type { Article } from "lib/interfaces";

const mockPush = jest.fn();

jest.mock("api/enpoints");
jest.mock("context/AuthContext");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({ push: mockPush }),
}));

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockedFavorite = favoriteArticle as jest.MockedFunction<typeof favoriteArticle>;

const article: Article = {
  slug: "test-article",
  title: "Test",
  description: "desc",
  body: "body",
  tagList: [],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  favorited: false,
  favoritesCount: 5,
  author: {
    username: "alice",
    bio: "",
    image: "",
    following: false,
  },
};

const renderButton = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <FavoriteButton article={article} />
    </QueryClientProvider>
  );

describe("FavoriteButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls the favorite API when an authenticated user clicks", async () => {
    mockedUseAuth.mockReturnValue({
      status: "authenticated",
      user: { username: "bob" },
    } as ReturnType<typeof useAuth>);

    mockedFavorite.mockResolvedValue({
      ...article,
      favorited: true,
      favoritesCount: 6,
    });

    renderButton();

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockedFavorite).toHaveBeenCalledWith("test-article");
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("redirects anonymous users to login without calling the API", async () => {
    mockedUseAuth.mockReturnValue({
      status: "anonymous",
      user: null,
    } as ReturnType<typeof useAuth>);

    renderButton();

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });

    expect(mockedFavorite).not.toHaveBeenCalled();
  });
});
