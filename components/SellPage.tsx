import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { CameraIcon, XMarkIcon } from './icons';
import HowItWorksBanner from './HowItWorksBanner';
import ListingPreviewCard from './ListingPreviewCard';

interface SellPageProps {
    onProductAdd: (newProductData: Omit<Product, 'id' | 'seller'>) => void;
}

const CATEGORIES = ['Electronics', 'Home Goods', 'Fashion', 'Books', 'Sports', 'Other'];
const CONDITIONS: Product['condition'][] = ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'];
const MAX_PHOTOS = 5;

const SellPage: React.FC<SellPageProps> = ({ onProductAdd }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState<Product['condition'] | ''>('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const [allowLocalPickup, setAllowLocalPickup] = useState(false);
    const [photos, setPhotos] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        // Validate form
        const isValid = title.trim() !== '' &&
                        category !== '' &&
                        condition !== '' &&
                        description.trim() !== '' &&
                        parseFloat(price) > 0 &&
                        photos.length > 0;
        setIsFormValid(isValid);
    }, [title, category, condition, description, price, photos]);

    useEffect(() => {
        // Create previews for photos
        const newPreviews = photos.map(file => URL.createObjectURL(file));
        setPhotoPreviews(newPreviews);

        // Cleanup function to revoke object URLs
        return () => {
            newPreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [photos]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const remainingSlots = MAX_PHOTOS - photos.length;
            const filesToAdd = files.slice(0, remainingSlots);
            setPhotos(prev => [...prev, ...filesToAdd]);
        }
    };
    
    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const handlePublish = () => {
        if (!isFormValid) return;
        
        onProductAdd({
            title,
            category,
            condition: condition as Product['condition'],
            description,
            price: parseFloat(price),
            imageUrl: photoPreviews[0], // Use first photo as main image
            // Note: In a real app, you'd upload photos and get back URLs.
        });
    };
    
    const formData = { title, category, condition, price, photoPreviews };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-800">Sell Your Second-Hand Treasures</h1>
                    <p className="text-lg text-slate-500 mt-2">List your items easily and connect with buyers securely.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Item Details */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Item Details</h2>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="item-name" className="block text-sm font-medium text-slate-700 mb-1">Item Name</label>
                                    <input type="text" id="item-name" value={title} onChange={e => setTitle(e.target.value)} className="w-full border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="w-full border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500">
                                        <option value="" disabled>Select a category</option>
                                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Condition</label>
                                    <div className="flex flex-wrap gap-4">
                                        {CONDITIONS.map(cond => (
                                            <label key={cond} className="flex items-center space-x-2 cursor-pointer">
                                                <input type="radio" name="condition" value={cond} checked={condition === cond} onChange={() => setCondition(cond)} className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-slate-300" />
                                                <span className="text-slate-700">{cond}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Shipping */}
                        <div className="bg-white p-8 rounded-lg shadow-md">
                             <h2 className="text-2xl font-semibold text-slate-800 mb-6">Pricing & Shipping</h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Photo Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Upload up to {MAX_PHOTOS} photos</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <CameraIcon className="mx-auto h-12 w-12 text-slate-400" />
                                            <div className="flex text-sm text-slate-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handlePhotoChange} disabled={photos.length >= MAX_PHOTOS} />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-slate-500">PNG, JPG up to 10MB</p>
                                        </div>
                                    </div>
                                    {photoPreviews.length > 0 && (
                                        <div className="mt-4 grid grid-cols-5 gap-2">
                                            {photoPreviews.map((preview, index) => (
                                                <div key={index} className="relative">
                                                    <img src={preview} alt={`Preview ${index}`} className="h-20 w-20 object-cover rounded-md" />
                                                    <button onClick={() => removePhoto(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                                                        <XMarkIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Pricing fields */}
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1">Starting Price ($)</label>
                                        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                                    </div>
                                     <div>
                                        <label htmlFor="shipping" className="block text-sm font-medium text-slate-700 mb-1">Shipping Cost ($)</label>
                                        <input type="number" id="shipping" value={shippingCost} onChange={e => setShippingCost(e.target.value)} placeholder="0.00" className="w-full border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="local-pickup" name="local-pickup" type="checkbox" checked={allowLocalPickup} onChange={e => setAllowLocalPickup(e.target.checked)} className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="local-pickup" className="font-medium text-gray-700">Allow Local Pickup</label>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>

                    </div>
                    {/* Preview Section */}
                    <div className="lg:col-span-1">
                        <ListingPreviewCard formData={formData} onPublish={handlePublish} isFormValid={isFormValid} />
                    </div>
                </div>

                <div className="mt-16">
                   <HowItWorksBanner />
                </div>
            </div>
        </div>
    );
};

export default SellPage;
