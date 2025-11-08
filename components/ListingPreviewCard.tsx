import React from 'react';
import { Product } from '../types';
import { GridIcon } from './icons';

type FormData = {
    title: string;
    category: string;
    condition: Product['condition'] | '';
    price: string;
    photoPreviews: string[];
};

interface ListingPreviewCardProps {
    formData: FormData;
    onPublish: () => void;
    isFormValid: boolean;
}

const ListingPreviewCard: React.FC<ListingPreviewCardProps> = ({ formData, onPublish, isFormValid }) => {
    const { title, category, condition, price, photoPreviews } = formData;
    
    // A placeholder image for when no photos are uploaded
    const placeholderImage = "data:image/svg+xml;charset=UTF-8,%3csvg width='600' height='400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400' preserveAspectRatio='none'%3e%3crect width='600' height='400' fill='%23e2e8f0'/%3e%3c/svg%3e";

    return (
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Listing Preview</h3>
            
            <div className="border rounded-lg p-4">
                <div className="grid grid-cols-2 grid-rows-2 gap-2 mb-4 aspect-square">
                    <div className="col-span-2 row-span-2 bg-slate-100 rounded-md overflow-hidden">
                        <img src={photoPreviews[0] || placeholderImage} alt="Main preview" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold text-slate-800 truncate">{title || 'Vintage Leather Jacket'}</h4>
                        <p className="text-sm text-slate-500">{category || 'Fashion'}</p>
                    </div>
                    <p className="text-lg font-bold text-slate-800">${price || '80'}</p>
                </div>
                <div className="flex justify-between items-center mt-2 border-t pt-2">
                     <p className="text-sm text-teal-600 font-medium">{condition || 'Condition'}</p>
                     <GridIcon className="w-5 h-5 text-slate-400"/>
                </div>
            </div>

            <button
                onClick={onPublish}
                disabled={!isFormValid}
                className="w-full mt-6 bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed"
            >
                Publish Listing
            </button>
        </div>
    );
};

export default ListingPreviewCard;
