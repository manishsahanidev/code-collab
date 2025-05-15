import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile, UpdateProfileData, UserProfile } from '../services/userService';
import '../styles/ProfilePage.css';

const ProfilePage: React.FC = () => {
    const { token, isAuthenticated } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [profile, setProfile] = useState<UserProfile>({
        _id: '',
        name: '',
        email: '',
        bio: '',
        website: '',
        location: '',
        profilePicture: '',
        createdAt: '',
        updatedAt: ''
    });

    const [formData, setFormData] = useState<UpdateProfileData>({
        name: '',
        email: '',
        bio: '',
        website: '',
        location: '',
        profilePicture: ''
    });

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;

            try {
                setLoading(true);
                setError(null);
                const data = await getUserProfile(token);
                setProfile(data);
                setFormData({
                    name: data.name || '',
                    email: data.email || '',
                    bio: data.bio || '',
                    website: data.website || '',
                    location: data.location || '',
                    profilePicture: data.profilePicture || ''
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        try {
            setLoading(true);
            setError(null);
            const updatedProfile = await updateUserProfile(formData, token);
            setProfile(updatedProfile);
            setSuccessMessage('Profile updated successfully!');
            setIsEditing(false);

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !profile._id) {
        return (
            <div className="profile-container loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your profile...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="profile-container">
                <div className="error-message">
                    Please log in to view your profile.
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <h1>My Profile</h1>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            {isEditing ? (
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bio">About Me</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Tell us a bit about yourself..."
                            rows={4}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="City, Country"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="website">Website or Social Link</label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="https://your-website.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profilePicture">Profile Picture URL</label>
                        <input
                            type="text"
                            id="profilePicture"
                            name="profilePicture"
                            value={formData.profilePicture || ''}
                            onChange={handleInputChange}
                            placeholder="https://example.com/your-image.jpg"
                        />
                        {formData.profilePicture && (
                            <div className="profile-picture-preview">
                                <img src={formData.profilePicture} alt="Profile Preview" />
                            </div>
                        )}
                    </div>

                    <div className="profile-actions">
                        <button type="submit" className="save-button" disabled={loading}>
                            {loading ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => {
                                setFormData({
                                    name: profile.name || '',
                                    email: profile.email || '',
                                    bio: profile.bio || '',
                                    website: profile.website || '',
                                    location: profile.location || '',
                                    profilePicture: profile.profilePicture || '',
                                });
                                setIsEditing(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="profile-details">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {profile.profilePicture ? (
                                <img src={profile.profilePicture} alt={`${profile.name}'s avatar`} />
                            ) : (
                                <div className="avatar-placeholder">
                                    {profile.name.substring(0, 1).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="profile-info">
                            <h2>{profile.name}</h2>
                            <p className="profile-email">{profile.email}</p>
                            <p className="join-date">Member since {new Date(profile.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                        </div>
                    </div>

                    <div className="profile-body">
                        {profile.bio && (
                            <div className="profile-section">
                                <h3>About Me</h3>
                                <p>{profile.bio}</p>
                            </div>
                        )}

                        {(profile.website || profile.location) && (
                            <div className="profile-section">
                                <h3>Details</h3>
                                {profile.location && (
                                    <p>
                                        <strong>📍 Location:</strong> {profile.location}
                                    </p>
                                )}
                                {profile.website && (
                                    <p>
                                        <strong>🔗 Website:</strong>{' '}
                                        <a href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {profile.website}
                                        </a>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        className="edit-profile-button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
