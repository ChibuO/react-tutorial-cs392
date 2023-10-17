import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

export const AuthButton = () => {
    const SignInButton = () => (
        <button className="auth-button" onClick={signInWithGoogle}>Sign in</button>
    );

    const SignOutButton = () => (
        <button className="auth-button" onClick={signOut}>Sign out</button>
    );

    const [user] = useAuthState();

    return (
        user ? <SignOutButton /> : <SignInButton />
    );
};