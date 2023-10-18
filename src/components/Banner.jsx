import { AuthButton } from './AuthButton';

export const Banner = ({ title, profileState }) => {
    const [profile, profileLoading, profileError] = profileState;

    const ProfileMessage = () => {
        if (profileError) return <p>Error loading profile: {`${profileError}`}</p>;
        if (profileLoading) return <p>Loading user profile</p>;
        if (!profile) return <p>No profile data</p>;
        return profile?.user ? <p>Signed in as <b>{profile.user.displayName}</b></p> : ""
    };

    return (
        <div className='banner'>
            <h1>{title}</h1>
            <ProfileMessage />
            <AuthButton />
        </div>
    );
};