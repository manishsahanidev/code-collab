import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSnippetById, updateSnippet } from '../services/snippetService';
import '../styles/CreateSnippetPage.css'; // Reuse same styling

const EditSnippetPage = () => {
    const { id } = useParams<{ id: string }>();
    const { token, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        code: '',
        language: '',
        description: '',
        tags: [] as string[],
    });
    const [tagsInput, setTagsInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchSnippet = async () => {
            if (!id) return;

            try {
                setFetchLoading(true);
                const snippet = await getSnippetById(id);

                // Check if user is the owner of the snippet
                if (user && snippet.owner !== user.id) {
                    setError("You don't have permission to edit this snippet");
                    return;
                }

                setFormData({
                    title: snippet.title,
                    code: snippet.code,
                    language: snippet.language,
                    description: snippet.description || '',
                    tags: snippet.tags || [],
                });

                setTagsInput(snippet.tags.join(', '));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch snippet');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchSnippet();
    }, [id, isAuthenticated, navigate, token, user]);

    const { title, code, language, description } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagsInput(e.target.value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!token || !id) {
            setError("Authentication token not found or snippet ID is missing");
            return;
        }

        setLoading(true);
        try {
            const snippetData = {
                ...formData,
                tags: tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
            };

            await updateSnippet(id, snippetData, token);
            setSuccessMessage(`Snippet "${title}" updated successfully!`);

            // Navigate to the snippet detail page after a delay
            setTimeout(() => {
                navigate(`/snippet/${id}`);
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update snippet');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return <div className="create-snippet-container"><p>Loading snippet...</p></div>;
    }

    if (!isAuthenticated) {
        return <div className="create-snippet-container"><p>Please log in to edit snippets</p></div>;
    }

    if (error && error.includes("permission")) {
        return <div className="create-snippet-container"><div className="error-message">{error}</div></div>;
    }

    return (
        <div className="create-snippet-container">
            <h2>Edit Snippet</h2>
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={onSubmit} className="create-snippet-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                        placeholder="e.g., JavaScript Quick Sort"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="language">Language</label>
                    <input
                        type="text"
                        id="language"
                        name="language"
                        value={language}
                        onChange={onChange}
                        required
                        placeholder="e.g., javascript, python, java"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <textarea
                        id="code"
                        name="code"
                        value={code}
                        onChange={onChange}
                        required
                        rows={10}
                        placeholder="Paste your code here..."
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description (Optional)</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={onChange}
                        rows={3}
                        placeholder="Briefly describe your snippet"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tags (Optional, comma-separated)</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={tagsInput}
                        onChange={onTagsChange}
                        placeholder="e.g., algorithm, sort, utility"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate(`/snippet/${id}`)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditSnippetPage;
