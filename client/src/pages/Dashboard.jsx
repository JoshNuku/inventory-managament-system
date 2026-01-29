import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ConfirmModal from '../components/ConfirmModal';
import { ChevronRight, Plus, Trash2, Package } from 'lucide-react';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
            showToast('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (product) => {
        setConfirmDelete(product);
    };

    const handleConfirmDelete = async () => {
        if (!confirmDelete) return;

        const id = confirmDelete._id;
        setConfirmDelete(null);
        setDeleting(id);

        try {
            await api.delete(`/products/${id}`);
            await fetchProducts();
            showToast('Product deleted', 'success');
        } catch (error) {
            console.error('Failed to delete', error);
            showToast('Failed to delete product');
        } finally {
            setDeleting(null);
        }
    };

    const totalStock = products.reduce((sum, p) => sum + p.countInStock, 0);
    const lowStock = products.filter(p => p.countInStock <= 5).length;

    const hasValidImage = (img) => img && !img.includes('sample');

    if (loading) {
        return (
            <div className="loading-overlay">
                <div className="loading-container">
                    <div className="spinner" />
                    <p className="text-secondary">Loading inventory...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">
                {/* Large Title Header */}
                <div className="page-header">
                    <h1 className="ios-large-title">Inventory</h1>
                </div>

                <div className="page-content">
                    {/* Summary Section */}
                    <p className="ios-section-header">Summary</p>
                    <div className="ios-card">
                        <div className="ios-row">
                            <span style={{ fontSize: 17 }}>Total Products</span>
                            <span className="text-detail">{products.length}</span>
                        </div>
                        <div className="ios-row">
                            <span style={{ fontSize: 17 }}>Total Stock</span>
                            <span className="text-detail">{totalStock}</span>
                        </div>
                        <div className="ios-row">
                            <span style={{ fontSize: 17 }}>Low Stock Items</span>
                            <span className={lowStock > 0 ? 'text-danger' : 'text-detail'}>
                                {lowStock}
                            </span>
                        </div>
                    </div>

                    {/* Products Section */}
                    <p className="ios-section-header">Products</p>
                    {products.length > 0 ? (
                        <div className="ios-card">
                            {products.map((product, index) => (
                                <Link
                                    key={product._id}
                                    to={`/edit-product/${product._id}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        display: 'block'
                                    }}
                                >
                                    <div
                                        className="ios-row"
                                        style={{
                                            borderTop: index > 0 ? '1px solid var(--separator)' : 'none',
                                            cursor: 'pointer',
                                            opacity: deleting === product._id ? 0.5 : 1
                                        }}
                                    >
                                        {/* Product Image */}
                                        <div style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 8,
                                            overflow: 'hidden',
                                            background: 'var(--bg-tertiary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            {hasValidImage(product.image) ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            ) : (
                                                <Package size={24} style={{ color: 'var(--text-tertiary)' }} />
                                            )}
                                        </div>

                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                fontSize: 17,
                                                fontWeight: 500,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {product.name}
                                            </div>
                                            <div style={{
                                                fontSize: 15,
                                                color: 'var(--text-secondary)',
                                                marginTop: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8
                                            }}>
                                                <span>${product.price.toFixed(2)}</span>
                                                <span>·</span>
                                                <span className={
                                                    product.countInStock === 0 ? 'text-danger' :
                                                        product.countInStock <= 5 ? 'text-warning' : ''
                                                }>
                                                    {product.countInStock} in stock
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 12 }}>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleDeleteClick(product);
                                                }}
                                                disabled={deleting === product._id}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: 8,
                                                    cursor: 'pointer',
                                                    color: 'var(--text-tertiary)',
                                                    display: 'flex'
                                                }}
                                            >
                                                {deleting === product._id ? (
                                                    <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                                                ) : (
                                                    <Trash2 size={18} />
                                                )}
                                            </button>
                                            <ChevronRight size={20} style={{ color: 'var(--text-tertiary)' }} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="ios-card">
                            <div style={{ padding: '40px 16px', textAlign: 'center' }}>
                                <p style={{ fontSize: 17, color: 'var(--text-secondary)', margin: 0 }}>
                                    No products yet
                                </p>
                                <p style={{ fontSize: 15, color: 'var(--text-tertiary)', margin: '4px 0 0 0' }}>
                                    Tap + to add your first item
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* FAB */}
            <Link to="/add-product" className="ios-fab">
                <Plus size={28} strokeWidth={2.5} />
            </Link>

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={!!confirmDelete}
                title="Delete Product"
                message={confirmDelete ? `Are you sure you want to delete "${confirmDelete.name}"? This action cannot be undone.` : ''}
                confirmText="Delete"
                cancelText="Cancel"
                isDestructive={true}
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmDelete(null)}
            />
        </div>
    );
};

export default Dashboard;
