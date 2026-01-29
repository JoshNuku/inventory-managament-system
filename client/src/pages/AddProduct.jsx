import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useToast } from '../context/ToastContext';
import { Camera, X } from 'lucide-react';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();
    const { showToast } = useToast();

    const uploadHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const { data } = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImage(data.url);
            setImagePreview(data.url);
            showToast('Image uploaded', 'success');
        } catch (error) {
            console.error('Upload failed', error);
            showToast('Image upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setImage('');
        setImagePreview('');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/products', {
                name,
                price: Number(price),
                category,
                countInStock: Number(countInStock),
                description,
                image,
            });
            showToast('Product added successfully', 'success');
            navigate('/');
        } catch (error) {
            console.error('Error adding product', error);
            showToast('Failed to add product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <div className="container">
                {/* Header */}
                <div className="page-header">
                    <h1 className="ios-large-title">New Product</h1>
                </div>

                <div className="page-content">
                    <form onSubmit={submitHandler}>
                        {/* Basic Info */}
                        <p className="ios-section-header">Basic Information</p>
                        <div className="ios-card">
                            <div className="ios-row">
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    className="ios-input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="ios-row">
                                <input
                                    type="text"
                                    placeholder="Category"
                                    className="ios-input"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Pricing & Stock */}
                        <p className="ios-section-header">Pricing & Stock</p>
                        <div className="ios-card">
                            <div className="ios-row">
                                <span style={{ color: 'var(--text-secondary)', fontSize: 17 }}>$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Price"
                                    className="ios-input"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="ios-row">
                                <input
                                    type="number"
                                    placeholder="Stock Quantity"
                                    className="ios-input"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <p className="ios-section-header">Product Image</p>
                        <div className="ios-card">
                            <div style={{ padding: 16 }}>
                                {imagePreview ? (
                                    <div style={{
                                        position: 'relative',
                                        display: 'inline-block',
                                        borderRadius: 16,
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            style={{
                                                width: 160,
                                                height: 160,
                                                objectFit: 'cover',
                                                display: 'block'
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            style={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                width: 28,
                                                height: 28,
                                                borderRadius: '50%',
                                                background: 'rgba(0,0,0,0.6)',
                                                color: 'white',
                                                border: 'none',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backdropFilter: 'blur(4px)'
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                        <label style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            padding: '12px 0',
                                            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                            color: 'white',
                                            textAlign: 'center',
                                            fontSize: 13,
                                            fontWeight: 500,
                                            cursor: 'pointer'
                                        }}>
                                            Change Photo
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={uploadHandler}
                                                disabled={uploading}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <label style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: 140,
                                        borderRadius: 16,
                                        border: '2px dashed var(--separator)',
                                        cursor: uploading ? 'not-allowed' : 'pointer',
                                        color: 'var(--text-secondary)',
                                        background: 'var(--bg-tertiary)',
                                        transition: 'all 0.2s ease'
                                    }}>
                                        {uploading ? (
                                            <>
                                                <span className="spinner" style={{ width: 28, height: 28 }} />
                                                <span style={{ fontSize: 15, marginTop: 12, fontWeight: 500 }}>
                                                    Uploading...
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <div style={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 12,
                                                    background: 'var(--bg-secondary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginBottom: 12
                                                }}>
                                                    <Camera size={24} />
                                                </div>
                                                <span style={{ fontSize: 15, fontWeight: 500 }}>
                                                    Add Product Photo
                                                </span>
                                                <span style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4 }}>
                                                    Tap to upload an image
                                                </span>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={uploadHandler}
                                            disabled={uploading}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="ios-section-header">Description</p>
                        <div className="ios-card">
                            <div style={{ padding: '12px 16px' }}>
                                <textarea
                                    placeholder="Product description (optional)"
                                    className="ios-input"
                                    style={{
                                        resize: 'none',
                                        height: 80,
                                        display: 'block'
                                    }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div style={{ marginTop: 32 }}>
                            <button
                                type="submit"
                                className="ios-button ios-button-primary"
                                disabled={loading || uploading}
                            >
                                {loading && <span className="btn-spinner" />}
                                {loading ? 'Adding Product...' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
