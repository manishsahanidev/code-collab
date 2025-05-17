import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getSnippets } from '../services/snippetService';
import CodeHighlighter from '../components/CodeHighlighter';
import '../styles/SnippetsPage.css';

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
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
        const fetchSnippets = async () => {
            if (!token) return;

            try {
                setLoading(true);
                const data = await getSnippets();
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

    // Get unique languages for the filter dropdown
    const languages = [...new Set(snippets.map(snippet => snippet.language))];

    // Filter snippets based on search term and selected language
    const filteredSnippets = snippets.filter(snippet => {
        const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (snippet.description && snippet.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesLanguage = selectedLanguage === '' || snippet.language === selectedLanguage;
        return matchesSearch && matchesLanguage;
    });

    return (
        <div className="snippets-page-container">
            <div className="snippets-header">
                <h2>My Code Snippets</h2>
                <Link to="/create-snippet" className="create-button">
                    Create New Snippet
                </Link>
            </div>

            <div className="snippets-filters">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search snippets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>

                <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="language-filter"
                >
                    <option value="">All Languages</option>
                    {languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                    ))}
                </select>
            </div>

            {filteredSnippets.length === 0 ? (
                <div className="empty-state">
                    {snippets.length === 0 ? (
                        <>
                            <div className="empty-icon">📝</div>
                            <h3>You haven't created any snippets yet</h3>
                            <p>Create your first code snippet to share with others!</p>
                            <Link to="/create-snippet" className="create-first-button">
                                Create Your First Snippet
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="empty-icon">🔍</div>
                            <h3>No matching snippets found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedLanguage('');
                                }}
                                className="clear-filters-button"
                            >
                                Clear Filters
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <div className="snippets-grid">
                    {filteredSnippets.map(snippet => (
                        <Link to={`/snippet/${snippet._id}`} className="snippet-card-link" key={snippet._id}>
                            <div className="snippet-card">
                                <div className="snippet-card-header">
                                    <span className="language-badge">{snippet.language}</span>
                                    <span className="likes-badge">
                                        ❤️ {snippet.likes.length}
                                    </span>
                                </div>
                                <h3 className="snippet-title">
                                    {snippet.title}
                                </h3>
                                <div className="snippet-preview">
                                    <CodeHighlighter
                                        code={snippet.code.length > 100 ? `${snippet.code.substring(0, 100)}...` : snippet.code}
                                        language={snippet.language}
                                        showLineNumbers={false}
                                    />
                                </div>
                                {snippet.description && (
                                    <p className="snippet-description">{snippet.description.length > 120 ?
                                        `${snippet.description.substring(0, 120)}...` : snippet.description}</p>
                                )}
                                <div className="snippet-footer">
                                    <div className="snippet-tags">
                                        {snippet.tags.slice(0, 3).map((tag, index) => (
                                            <span key={index} className="snippet-tag">{tag}</span>
                                        ))}
                                        {snippet.tags.length > 3 && <span className="more-tags">+{snippet.tags.length - 3}</span>}
                                    </div>
                                    <span className="snippet-date">{new Date(snippet.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SnippetsPage;
