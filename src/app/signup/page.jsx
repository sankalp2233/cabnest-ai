"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { isValidEmail, isValidPhone, validatePassword, detectIdentifierType } from '@/utils/validation';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function SignupPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        identifier: '',
        password: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState('idle');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Real-time validation
    useEffect(() => {
        const newErrors = {};

        if (touched.name && !formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (touched.identifier) {
            const identifierType = detectIdentifierType(formData.identifier);
            if (identifierType === 'unknown' && formData.identifier.trim()) {
                newErrors.identifier = 'Please enter a valid email or 10-digit phone number';
            } else if (!formData.identifier.trim()) {
                newErrors.identifier = 'Email or phone number is required';
            }
        }

        if (touched.password) {
            const passwordValidation = validatePassword(formData.password);
            if (!passwordValidation.valid) {
                newErrors.password = passwordValidation.errors[0];
            }
        }

        if (touched.confirmPassword) {
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
    }, [formData, touched]);

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    const isFormValid = () => {
        return (
            formData.name.trim() &&
            formData.identifier.trim() &&
            detectIdentifierType(formData.identifier) !== 'unknown' &&
            formData.password.length >= 6 &&
            formData.password === formData.confirmPassword &&
            Object.keys(errors).length === 0
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark all fields as touched
        setTouched({ name: true, identifier: true, password: true, confirmPassword: true });

        if (!isFormValid()) {
            return;
        }

        setStatus('loading');

        // Prepare payload based on identifier type
        const identifierType = detectIdentifierType(formData.identifier);
        const payload = {
            name: formData.name,
            password: formData.password,
        };

        if (identifierType === 'email') {
            payload.email = formData.identifier;
        } else if (identifierType === 'phone') {
            payload.phone = formData.identifier.replace(/\D/g, ''); // Clean phone number
        }

        const result = await register(payload);

        if (result.success) {
            setStatus('success');
            setTimeout(() => {
                router.push('/login');
            }, 1500);
        } else {
            setErrors({ submit: result.error });
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
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Create an account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className={`input-field w-full ${errors.name && touched.name ? 'border-red-500' : ''}`}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            onBlur={() => handleBlur('name')}
                        />
                        {errors.name && touched.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Email or Phone Number"
                            className={`input-field w-full ${errors.identifier && touched.identifier ? 'border-red-500' : ''}`}
                            value={formData.identifier}
                            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                            onBlur={() => handleBlur('identifier')}
                        />
                        {errors.identifier && touched.identifier && (
                            <p className="text-red-500 text-xs mt-1">{errors.identifier}</p>
                        )}
                        {!errors.identifier && touched.identifier && formData.identifier && (
                            <p className="text-green-600 text-xs mt-1">
                                ✓ Valid {detectIdentifierType(formData.identifier)}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password (min 6 characters)"
                            className={`input-field w-full ${errors.password && touched.password ? 'border-red-500' : ''}`}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            onBlur={() => handleBlur('password')}
                        />
                        {errors.password && touched.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={`input-field w-full ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}`}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            onBlur={() => handleBlur('confirmPassword')}
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                        )}
                        {!errors.confirmPassword && touched.confirmPassword && formData.confirmPassword && (
                            <p className="text-green-600 text-xs mt-1">✓ Passwords match</p>
                        )}
                    </div>

                    {errors.submit && (
                        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                            {errors.submit}
                        </div>
                    )}

                    <div className="text-xs text-gray-500">
                        By proceeding, you consent to get calls, WhatsApp or SMS messages from CabNest and its affiliates.
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading' || !isFormValid()}
                        className="btn-primary w-full py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                        {status === 'loading' ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    {status === 'success' && (
                        <div className="text-green-600 text-center font-medium bg-green-50 p-3 rounded-lg animate-fade-in">
                            ✓ Account created! Redirecting to login...
                        </div>
                    )}
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-semibold hover:text-primary-hover underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
