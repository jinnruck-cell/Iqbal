import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from './icons';

const PublishPage: React.FC = () => {
    const [copied, setCopied] = useState(false);
    
    // Get the base URL of the site, removing any query parameters for a clean link
    const siteUrl = window.location.href.split('?')[0];

    const handleCopy = () => {
        navigator.clipboard.writeText(siteUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500); // Reset the copied state after 2.5 seconds
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy link. Please copy it manually.');
        });
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-800">Publish Your Marketplace</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Your marketplace is live! Share this link with others to invite them to browse, buy, and sell.
                </p>
            </div>

            <div className="max-w-2xl mx-auto mt-10">
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                    <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Sharable Link
                    </label>
                    <div className="relative">
                        <input
                            id="website-url"
                            type="text"
                            readOnly
                            value={siteUrl}
                            className="block w-full pl-4 pr-32 py-3 border-gray-300 rounded-md bg-gray-50 text-gray-700 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            onClick={(e) => (e.target as HTMLInputElement).select()}
                        />
                        <button
                            onClick={handleCopy}
                            className={`absolute inset-y-0 right-0 flex items-center justify-center w-28 px-4 font-semibold text-sm rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                                copied 
                                ? 'bg-green-500 text-white' 
                                : 'bg-teal-500 text-white hover:bg-teal-600'
                            }`}
                        >
                            {copied ? (
                                <>
                                    <CheckIcon className="w-5 h-5 mr-2" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <ClipboardDocumentIcon className="w-5 h-5 mr-2" />
                                    Copy Link
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublishPage;
