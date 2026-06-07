import type { FC } from "react";

import { useProfile } from "../hooks/useProfile";

import { FollowButton } from "components/buttons";

const DEFAULT_AVATAR = "https://static.productionready.io/images/smiley-cyrus.jpg";

interface ProfileInfoProps {
  username: string;
}

export const ProfileInfo: FC<ProfileInfoProps> = ({ username }) => {
  const { data: profile, isLoading, isError } = useProfile(username);

  return (
    <div className="col-xs-12 col-md-10 offset-md-1">
      {isLoading ? (
        "Loading profile..."
      ) : isError || !profile ? (
        "Failed to load profile."
      ) : (
        <>
          <img src={profile.image || DEFAULT_AVATAR} className="user-img" alt={profile.username} />
          <h4>{profile.username}</h4>
          {profile.bio && <p>{profile.bio}</p>}
          <FollowButton profile={profile} className="action-btn" />
        </>
      )}
    </div>
  );
};
