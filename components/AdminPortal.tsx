

import React, { useState, useEffect } from 'react';
import { MOCK_TRANSACTIONS, MOCK_PRODUCTS } from '../constants';
import { TransactionStatus, Transaction, Product } from '../types';
import { generateAdminSummary } from '../services/geminiService';

interface AdminPortalProps {
    onNavigate: (page: string) => void;
}

const StatCard: React.FC<{ title: string, value: string | number, color: string }> = ({ title, value, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
);

const AdminPortal: React.FC<AdminPortalProps> = ({ onNavigate }) => {
    const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
    const [products] = useState<Product[]>(MOCK_PRODUCTS);
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const totalSales = transactions
        .filter(t => t.status === TransactionStatus.COMPLETED)
        .reduce((sum, t) => sum + (t.offerPrice || 0), 0);

    const activeTransactions = transactions
        .filter(t => t.status !== TransactionStatus.COMPLETED && t.status !== TransactionStatus.CANCELLED)
        .length;

    const handleGenerateSummary = async () => {
        setIsLoading(true);
        setError('');
        setSummary('');
        try {
            const result = await generateAdminSummary(transactions, products);
            setSummary(result);
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Portal</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Sales" value={`$${totalSales.toLocaleString()}`} color="text-green-500" />
                <StatCard title="Total Products" value={products.length} color="text-blue-500" />
                <StatCard title="Active Transactions" value={activeTransactions} color="text-yellow-500" />
                <StatCard title="Completed Transactions" value={transactions.filter(t => t.status === TransactionStatus.COMPLETED).length} color="text-indigo-500" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Publish & Share</h2>
                <p className="text-gray-600 mb-4">
                    Ready to go live? Use the link below to share your marketplace with the world.
                </p>
                <button
                    onClick={() => onNavigate('publish')}
                    className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                    Get Sharable Link
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">AI-Powered Activity Summary</h2>
                    <button
                        onClick={handleGenerateSummary}
                        disabled={isLoading}
                        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Generating...' : 'Generate Summary'}
                    </button>
                </div>
                {isLoading && <div className="text-center p-4">Loading insights...</div>}
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
                {summary && (
                    <div className="prose max-w-none p-4 bg-gray-50 rounded-lg mt-4 whitespace-pre-wrap font-mono text-sm">
                        {summary}
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">All Transactions</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {transactions.map(t => (
                                <tr key={t.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.product.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.buyer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.seller.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${t.offerPrice || t.product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {t.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPortal;