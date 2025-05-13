import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createSnippet, CreateSnippetData } from '../services/snippetService';
import '../styles/CreateSnippetPage.css';

const CreateSnippetPage = () => {
    const { token, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreateSnippetData>({
        title: '',
        code: '',
        language: '',
        description: '',
        tags: [],
    });
    const [tagsInput, setTagsInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

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

        if (!token) {
            setError("Authentication token not found. Please log in again.");
            return;
        }

        setLoading(true);
        try {
            const snippetData: CreateSnippetData = {
                ...formData,
                tags: tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
            };
            const newSnippet = await createSnippet(snippetData, token);
            setSuccessMessage(`Snippet "${newSnippet.title}" created successfully!`);
            setFormData({ title: '', code: '', language: '', description: '', tags: [] });
            setTagsInput('');
            // Optionally navigate to the new snippet's page or snippets list
            // navigate(`/snippets/${newSnippet._id}`); 
            // For now, let's navigate to the general snippets page after a delay
            setTimeout(() => {
                navigate('/snippets');
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create snippet');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return <p>Redirecting to login...</p>; // Or a loading spinner
    }

    return (
        <div className="create-snippet-container">
            <h2>Create New Snippet</h2>
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
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Snippet'}
                </button>
            </form>
        </div>
    );
};

export default CreateSnippetPage;
