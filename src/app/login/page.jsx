"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { detectIdentifierType } from '@/utils/validation';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ identifier: '', password: '' });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setError('');

        // Validate identifier
        const identifierType = detectIdentifierType(credentials.identifier);
        if (identifierType === 'unknown') {
            setError('Please enter a valid email or phone number');
            setStatus('error');
            return;
        }

        const result = await login(credentials);

        if (result.success) {
            setStatus('success');
            // router.push('/') handled in context
        } else {
            setError(result.error);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4">
            <Link href="/" className="mb-8 flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary/10">
                    <Image
                        src="/logo.jpg"
                        alt="CabNest Logo"
                        fill
                        className="object-cover"
                    />
                </div>
                <span className="text-3xl font-bold text-white tracking-tight">CabNest</span>
            </Link>

            <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-premium">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Welcome back</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Email or Phone Number"
                            required
                            className="input-field w-full"
                            value={credentials.identifier}
                            onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="input-field w-full"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="text-gray-500 hover:text-primary transition-colors">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn-primary w-full py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                        {status === 'loading' ? 'Signing in...' : 'Sign In'}
                    </button>

                    {status === 'success' && (
                        <div className="text-green-600 text-center font-medium bg-green-50 p-3 rounded-lg animate-fade-in">
                            ✓ Login successful! Redirecting...
                        </div>
                    )}
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-500">
                        New to CabNest?{' '}
                        <Link href="/signup" className="text-primary font-semibold hover:text-primary-hover underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
