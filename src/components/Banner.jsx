import { AuthButton } from './AuthButton';
import { useAuthState } from '../utilities/firebase';

export const Banner = ({ title }) => {
    const [user] = useAuthState();

    return (
        <div className='banner'>
            <h1>{title}</h1>
            {user ? <p>Signed in as <b>{user.displayName}</b></p> : ""}
            <AuthButton />
        </div>
    );
};