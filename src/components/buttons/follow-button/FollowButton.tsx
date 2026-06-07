import type { FC } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "context/AuthContext";
import { useToggleFollow } from "hooks/social-action";

import { Profile } from "lib/interfaces";

interface FollowButtonProps {
  profile: Profile;
  className?: string;
}

export const FollowButton: FC<FollowButtonProps> = ({ profile, className }) => {
  const { status, user } = useAuth();
  const history = useHistory();
  const { mutate, isPending } = useToggleFollow(profile.username);

  const isOwnProfile = user?.username === profile.username;

  const handleClick = () => {
    if (status !== "authenticated") {
      history.push("/login");
      return;
    }
    mutate(profile.following);
  };

  return (
    <>
      {!isOwnProfile && (
        <button
          type="button"
          className={`btn btn-sm ${profile.following ? "btn-secondary" : "btn-outline-secondary"}${
            className ? ` ${className}` : ""
          }`}
          onClick={handleClick}
          disabled={isPending}
        >
          <i className="ion-plus-round" />
          &nbsp; {profile.following ? "Unfollow" : "Follow"} {profile.username}
        </button>
      )}
    </>
  );
};
