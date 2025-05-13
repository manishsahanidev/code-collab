import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSnippetById, Snippet } from '../services/snippetService';
import { useAuth } from '../context/AuthContext';
import '../styles/SnippetDetailPage.css';
const SnippetDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { token, user } = useAuth();
    const [snippet, setSnippet] = useState<Snippet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="snippet-detail-container">
            <header className="snippet-header">
                <h1>{snippet.title}</h1>
                <div className="snippet-meta-detail">
                    <span>Language: <strong>{snippet.language}</strong></span>
                    <span>Created: {new Date(snippet.createdAt).toLocaleDateString()}</span>
                </div>
            </header>

            {snippet.description && (
                <section className="snippet-description">
                    <h3>Description</h3>
                    <p>{snippet.description}</p>
                </section>
            )}

            <section className="snippet-code-block">
                <h3>Code</h3>
                <pre>
                    <code>{snippet.code}</code>
                </pre>
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
                        {/* Future: Link to Edit Snippet Page */}
                        {/* <Link to={`/snippet/edit/${snippet._id}`} className="edit-button">Edit</Link> */}
                        {/* Future: Delete Snippet Button */}
                        {/* <button className="delete-button">Delete</button> */}
                    </>
                )}
            </div>
        </div>
    );
};

export default SnippetDetailPage;
