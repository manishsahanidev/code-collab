import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSnippetById, Snippet, deleteSnippet, likeSnippet } from '../services/snippetService';
import { useAuth } from '../context/AuthContext';
import CodeHighlighter from '../components/CodeHighlighter';
import '../styles/SnippetDetailPage.css';

const SnippetDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const [snippet, setSnippet] = useState<Snippet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    useEffect(() => {
        const fetchSnippet = async () => {
            if (!id) {
                setError("Snippet ID is missing.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                setError(null);
                const data = await getSnippetById(id);
                setSnippet(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch snippet details');
            } finally {
                setLoading(false);
            }
        };

        fetchSnippet();
    }, [id]);

    const handleDelete = async () => {
        if (!token || !id) return;

        try {
            setIsDeleting(true);
            await deleteSnippet(id, token);
            navigate('/snippets');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete snippet');
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    const handleLike = async () => {
        if (!token || !id || !user) return;

        try {
            setIsLiking(true);
            const updatedSnippet = await likeSnippet(id, token);
            setSnippet(updatedSnippet);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to like snippet');
        } finally {
            setIsLiking(false);
        }
    };

    if (loading) {
        return <div className="snippet-detail-container"><p>Loading snippet...</p></div>;
    }

    if (error) {
        return <div className="snippet-detail-container error-message"><p>Error: {error}</p></div>;
    }

    if (!snippet) {
        return <div className="snippet-detail-container"><p>Snippet not found.</p></div>;
    }

    const isOwner = user && snippet.owner === user.id;
    const isLikedByUser = snippet?.likes.includes(user?.id || '');

    return (
        <div className="snippet-detail-container">
            <header className="snippet-header">
                <h1>{snippet.title}</h1>
                <div className="snippet-meta-detail">
                    <span>Language: <strong>{snippet.language}</strong></span>
                    <span>Created: {new Date(snippet.createdAt).toLocaleDateString()}</span>
                </div>
            </header>

            {/* Like section */}
            <div className="snippet-likes-section">
                <button
                    onClick={handleLike}
                    disabled={isLiking || !user}
                    className={`like-button ${isLikedByUser ? 'liked' : ''}`}
                    title={user ? (isLikedByUser ? 'Unlike this snippet' : 'Like this snippet') : 'Please login to like this snippet'}
                >
                    <span className="like-icon">{isLikedByUser ? '❤️' : '🤍'}</span>
                    <span className="like-count">{snippet.likes.length}</span>
                    <span className="like-text">{snippet.likes.length === 1 ? 'Like' : 'Likes'}</span>
                </button>
                {!user && <span className="login-to-like">Login to like this snippet</span>}
            </div>

            {snippet.description && (
                <section className="snippet-description">
                    <h3>Description</h3>
                    <p>{snippet.description}</p>
                </section>
            )}

            <section className="snippet-code-block">
                <h3>Code</h3>
                <CodeHighlighter
                    code={snippet.code}
                    language={snippet.language}
                />
            </section>

            {snippet.tags && snippet.tags.length > 0 && (
                <section className="snippet-tags">
                    <h3>Tags</h3>
                    <div className="tags-list">
                        {snippet.tags.map((tag, index) => (
                            <span key={index} className="tag-item">{tag}</span>
                        ))}
                    </div>
                </section>
            )}

            <div className="snippet-actions">
                <Link to="/snippets" className="back-button">Back to Snippets</Link>
                {isOwner && (
                    <>
                        <Link to={`/snippet/edit/${snippet._id}`} className="edit-button">Edit</Link>
                        <button
                            className="delete-button"
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>

            {showDeleteConfirm && (
                <div className="delete-confirmation-modal">
                    <div className="delete-confirmation-content">
                        <h3>Delete Snippet</h3>
                        <p>Are you sure you want to delete this snippet? This action cannot be undone.</p>
                        <div className="delete-confirmation-actions">
                            <button
                                className="delete-confirm-button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                            <button
                                className="delete-cancel-button"
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SnippetDetailPage;
