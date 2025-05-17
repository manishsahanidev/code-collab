import React from 'react';
import { Comment, deleteComment } from '../../services/commentService';
import { useAuth } from '../../context/AuthContext';
import './Comments.css';

interface CommentListProps {
    comments: Comment[];
    onCommentDeleted: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onCommentDeleted }) => {
    const { user, token } = useAuth();

    const handleDelete = async (commentId: string) => {
        if (!token) return;

        try {
            await deleteComment(commentId, token);
            onCommentDeleted(commentId);
        } catch (err) {
            console.error('Failed to delete comment:', err);
        }
    };

    if (comments.length === 0) {
        return <p className="no-comments">No comments yet. Be the first to comment!</p>;
    }

    return (
        <div className="comments-list">
            {comments.map((comment) => (
                <div key={comment._id} className="comment-item">
                    <div className="comment-header">
                        <div className="comment-author">
                            {comment.author.profilePicture ? (
                                <img
                                    src={comment.author.profilePicture}
                                    alt={comment.author.name}
                                    className="author-avatar"
                                />
                            ) : (
                                <div className="author-avatar avatar-placeholder">
                                    {comment.author.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <span className="author-name">{comment.author.name}</span>
                        </div>
                        <div className="comment-meta">
                            <span className="comment-date">
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                            {user && user.id === comment.author._id && (
                                <button
                                    onClick={() => handleDelete(comment._id)}
                                    className="delete-comment-btn"
                                    title="Delete comment"
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                    </div>
                    <p className="comment-content">{comment.content}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
