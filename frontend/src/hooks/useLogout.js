import { useRouter } from 'next/router';

const useLogout = () => {
    const router = useRouter();

    const logout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            router.push('/');
        }
    };

    return logout;
};

export default useLogout;
