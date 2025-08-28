import React, { useState, useEffect } from 'react';
import './css/ManageCourses.css';

function ManageCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showCoursesList, setShowCoursesList] = useState(false);
    const [formData, setFormData] = useState({
        course_id: '',
        name: '',
        category: '',
        status: 'PUBLISH'
    });

    useEffect(() => {
        fetchCourses();
    }, []);



    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8070/course/');
            const data = await response.json();
            
            if (data.success && Array.isArray(data.data)) {
                setCourses(data.data);
            } else {
                console.error('Invalid courses data structure:', data);
                setCourses([]);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8070/course/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                setFormData({ course_id: '', name: '', category: '', status: 'PUBLISH' });
                setShowAddForm(false);
                fetchCourses();
            }
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const toggleStatus = async (courseId, currentStatus) => {
        const newStatus = currentStatus === 'PUBLISH' ? 'ARCHIVE' : 'PUBLISH';
        try {
            const response = await fetch(`http://localhost:8070/course/update/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            
            if (response.ok) {
                fetchCourses();
            } else {
                console.error('Failed to update course status');
            }
        } catch (error) {
            console.error('Error updating course status:', error);
        }
    };

    return (
        <div className="manage-courses">
            <div className="courses-section">
                <h2>COURSES</h2>
                
                <div className="action-buttons">
                    <button 
                        className="btn btn-primary"
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        ADD COURSES
                    </button>
                    <button 
                        className="btn btn-primary"
                        onClick={() => setShowCoursesList(!showCoursesList)}
                    >
                        COURSES LIST
                    </button>
                </div>

                {showAddForm && (
                    <div className="add-course-form">
                        <h3>Add New Course</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Course ID:</label>
                                <input
                                    type="text"
                                    name="course_id"
                                    value={formData.course_id}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Course Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category:</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Status:</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="PUBLISH">PUBLISH</option>
                                    <option value="ARCHIVE">ARCHIVE</option>
                                </select>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">Add Course</button>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {showCoursesList && (
                    <div className="courses-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>COURSE ID</th>
                                    <th>COURSE NAME</th>
                                    <th>STATUS</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>
                                            Loading courses...
                                        </td>
                                    </tr>
                                ) : Array.isArray(courses) && courses.length > 0 ? (
                                    courses.map((course) => (
                                        <tr key={course._id}>
                                            <td>{course.course_id}</td>
                                            <td>{course.name}</td>
                                            <td>
                                                <span className={`status ${course.status.toLowerCase()}`}>
                                                    {course.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-small"
                                                    onClick={() => toggleStatus(course._id, course.status)}
                                                >
                                                    {course.status === 'PUBLISH' ? 'Archive' : 'Publish'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>
                                            No courses found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageCourses;
