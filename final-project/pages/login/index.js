import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@/hooks/UseMutation'
import Layout from '@/components/Layout';
import Cookies from 'js-cookie';
import Link from 'next/link';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { mutate } = useMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await mutate({
                url: 'https://paace-f178cafcae7b.nevacloud.io/api/login',
                payload: { email, password }
            });
            console.log(result)
            if (result.success) {
                Cookies.set('user_token', result.data.token, {expires:new Date(result.data.expires_at)})
                Cookies.set('isLoggedIn', true)
                router.push('/');
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            setError('An error occurred during login');
        }
    };

    return (
        <div>
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900 py-3 px-4"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-900 py-3 px-4"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <div className="text-red-500">{error}</div>}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Login
                                </button>
                            </div>
                            <div className="text-center mt-4">
                                {/* Tambahkan tautan ke halaman register */}
                                <p className="text-sm font-medium text-gray-600">Belum punya akun?{' '}
                                    <Link href="/register">
                                        Daftar disini
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default LoginPage;
