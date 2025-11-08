import React from 'react';
import { HandshakeIcon } from './icons';

const HowItWorksBanner: React.FC = () => {
    return (
        <section>
            <div className="bg-teal-100/50 border border-teal-200 rounded-lg p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="flex-shrink-0 bg-white p-4 rounded-full shadow">
                    <HandshakeIcon className="w-10 h-10 text-teal-500" />
                </div>
                <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-slate-800">How It Works:</h3>
                    <p className="text-slate-600 mt-1 text-lg">Payment is Held Securely Until You Confirm Receipt.</p>
                </div>
                <button className="mt-4 md:mt-0 flex-shrink-0 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
                    Explore More
                </button>
            </div>
        </section>
    );
};

export default HowItWorksBanner;
