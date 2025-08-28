import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ManageCoursesPage.css';

const ManageCoursesPage = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8070/course/');
            if (response.ok) {
                const data = await response.json();
                setCourses(data.data || []);
            } else {
                setError('Failed to fetch courses');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToAdmin = () => {
        navigate('/admin/dashboard');
    };

    const handleAddCourse = () => {
        navigate('/admin/add-course');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="manage-courses-page">
                <div className="loading-container">
                    <div className="loading">Loading courses...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="manage-courses-page">
                <div className="error-container">
                    <div className="error-message">{error}</div>
                    <button onClick={fetchCourses} className="retry-button">Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="manage-courses-page">
            <div className="page-header">
                <div className="header-content">
                    <h1>Course Management</h1>
                    <p>Manage and monitor all courses in the system</p>
                </div>
                <div className="header-actions">
                    <button className="add-course-btn" onClick={handleAddCourse}>
                        <span className="btn-icon">+</span>
                        Add New Course
                    </button>
                    <button className="back-button" onClick={handleBackToAdmin}>
                        ← Back to Admin
                    </button>
                </div>
            </div>

            <div className="courses-container">
                {courses.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📚</div>
                        <h3>No courses found</h3>
                        <p>Get started by adding your first course to the system.</p>
                        <button className="add-course-btn" onClick={handleAddCourse}>
                            Add Your First Course
                        </button>
                    </div>
                ) : (
                    <div className="courses-grid">
                        {courses.map((course) => (
                            <div key={course.id} className="course-card">
                                <div className="course-header">
                                    <div className="course-id">{course.course_id}</div>
                                    <div className="course-status">{course.status}</div>
                                </div>

                                <div className="course-content">
                                    <h3 className="course-name">{course.name}</h3>
                                    <p className="course-description">{course.description}</p>
                                    
                                    <div className="course-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Instructor:</span>
                                            <span className="meta-value">{course.instructor}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Duration:</span>
                                            <span className="meta-value">{course.duration}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Level:</span>
                                            <span className="meta-value">{course.level}</span>
                                        </div>
                                    </div>

                                    <div className="course-dates">
                                        <div className="date-item">
                                            <span className="date-label">Starts:</span>
                                            <span className="date-value">{formatDate(course.start_date)}</span>
                                        </div>
                                        <div className="date-item">
                                            <span className="date-label">Ends:</span>
                                            <span className="date-value">{formatDate(course.end_date)}</span>
                                        </div>
                                    </div>

                                    <div className="course-stats">
                                        <div className="stat-item">
                                            <span className="stat-value">{course.max_students}</span>
                                            <span className="stat-label">Max Students</span>
                                        </div>
                                    </div>

                                    <div className="course-price">
                                        <span className="price-amount">{formatPrice(course.price)}</span>
                                    </div>
                                </div>

                                <div className="course-actions">
                                    <button className="action-btn edit-btn">Edit</button>
                                    <button className="action-btn view-btn">View Details</button>
                                    <button className="action-btn delete-btn">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageCoursesPage;

