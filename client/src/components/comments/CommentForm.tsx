import React, { useState } from 'react';
import { createComment } from '../../services/commentService';
import { useAuth } from '../../context/AuthContext';
import './Comments.css';

interface CommentFormProps {
    snippetId: string;
    onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ snippetId, onCommentAdded }) => {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token, isAuthenticated } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token || !content.trim()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await createComment({ content, snippetId }, token);
            setContent('');
            onCommentAdded();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add comment');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="comment-form-container login-prompt">
                <p>Please log in to leave a comment</p>
            </div>
        );
    }

    return (
        <div className="comment-form-container">
            <h4>Add a Comment</h4>
            {error && <div className="comment-error">{error}</div>}
            <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your thoughts..."
                    required
                    rows={3}
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    className="submit-comment-btn"
                    disabled={isSubmitting || !content.trim()}
                >
                    {isSubmitting ? 'Submitting...' : 'Post Comment'}
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
