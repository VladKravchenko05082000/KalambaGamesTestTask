import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuth } from "context/AuthContext";

import { followProfile } from "api/endpoints";

import { FollowButton } from "./FollowButton";

import type { Profile } from "lib/interfaces";

const mockPush = jest.fn();

jest.mock("api/endpoints");
jest.mock("context/AuthContext");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({ push: mockPush }),
}));

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockedFollow = followProfile as jest.MockedFunction<typeof followProfile>;

const profile: Profile = {
  username: "alice",
  bio: "",
  image: "",
  following: false,
};

const renderButton = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <FollowButton profile={profile} />
    </QueryClientProvider>
  );

describe("FollowButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls the follow API when an authenticated user clicks", async () => {
    mockedUseAuth.mockReturnValue({
      status: "authenticated",
      user: { username: "bob" },
    } as ReturnType<typeof useAuth>);

    mockedFollow.mockResolvedValue({
      ...profile,
      following: true,
    });

    renderButton();

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockedFollow).toHaveBeenCalledWith("alice");
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

    expect(mockedFollow).not.toHaveBeenCalled();
  });

  it("does not render on the user's own profile", () => {
    mockedUseAuth.mockReturnValue({
      status: "authenticated",
      user: { username: "alice" },
    } as ReturnType<typeof useAuth>);

    renderButton();

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
