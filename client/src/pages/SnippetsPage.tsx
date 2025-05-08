import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface Snippet {
    _id: string;
    title: string;
    code: string;
    language: string;
    description?: string;
    tags: string[];
    owner: string;
    likes: string[];
    createdAt: string;
    updatedAt: string;
}

const SnippetsPage = () => {
    const { isAuthenticated, token } = useAuth();
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSnippets = async () => {
            if (!token) return;

            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/snippet', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch snippets');
                }

                const data = await response.json();
                setSnippets(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch snippets');
            } finally {
                setLoading(false);
            }
        };

        fetchSnippets();
    }, [token]);

    if (!isAuthenticated) {
        return (
            <div className="snippets-page">
                <h2>Please log in to view your snippets</h2>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="snippets-page">
                <h2>Loading snippets...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="snippets-page">
                <h2>Error loading snippets</h2>
                <p className="error-message">{error}</p>
            </div>
        );
    }

    return (
        <div className="snippets-page">
            <h2>My Snippets</h2>
            {snippets.length === 0 ? (
                <p>You haven't created any snippets yet.</p>
            ) : (
                <ul className="snippets-list">
                    {snippets.map(snippet => (
                        <li key={snippet._id} className="snippet-item">
                            <h3>{snippet.title}</h3>
                            <p>{snippet.description}</p>
                            <div className="snippet-meta">
                                <span>Language: {snippet.language}</span>
                                <span>Likes: {snippet.likes.length}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SnippetsPage;
