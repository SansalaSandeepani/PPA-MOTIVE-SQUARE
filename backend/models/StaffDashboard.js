import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StaffCalendarPage from './StaffCalendarPage';
import StaffExamPage from './StaffExamPage';
import StaffTaskManagement from './StaffTaskManagement';
import './css/StaffDashboard.css';

const StaffDashboard = ({ onLogout }) => {
    const navigate = useNavigate();
    const [staffData, setStaffData] = useState(null);
    const [activeTab, setActiveTab] = useState('INTERVIEWS');
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const [photoPreview, setPhotoPreview] = useState(null);
    const [filteredInterviews, setFilteredInterviews] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    useEffect(() => {
        const data = localStorage.getItem('staffData');
        if (data) {
            const staffData = JSON.parse(data);
            setStaffData(staffData);
            
            // Use photo from staff data if available
            if (staffData.photo) {
                setPhotoPreview(staffData.photo);
            }

            // Fetch all interviews
            fetchInterviews();
        }
    }, []);

    // Filter interviews when filters or interviews change
    useEffect(() => {
        let filtered = interviews;
        
        if (statusFilter) {
            filtered = filtered.filter(interview => interview.status === statusFilter);
        }
        
        if (typeFilter) {
            filtered = filtered.filter(interview => interview.interviewType === typeFilter);
        }
        
        setFilteredInterviews(filtered);
    }, [interviews, statusFilter, typeFilter]);

    const fetchInterviews = async () => {
        setLoading(true);
        try {
            console.log('Fetching all interviews...');
            const response = await fetch('http://localhost:8070/interview/all');
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            const data = await response.json();
            console.log('Response data:', data);
            
            if (response.ok) {
                setInterviews(data.interviews || []);
                console.log('All interviews loaded:', data.interviews);
            } else {
                console.error('Failed to fetch interviews:', data.message);
                console.error('Response status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching interviews:', error);
            console.error('Error details:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('staffData');
        onLogout();
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // Refresh interviews when switching to INTERVIEWS tab
        if (tab === 'INTERVIEWS') {
            fetchInterviews();
        }
    };

    const handleJoinInterview = (interview) => {
        if (interview.interviewType === 'online' && interview.meetingLink) {
            // Open meeting link in new tab for online interviews
            window.open(interview.meetingLink, '_blank');
        } else if (interview.interviewType === 'in-person') {
            // Show location details for in-person interviews
            alert(`In-Person Interview: ${interview.interviewName}\n\nPlease arrive at the specified location for your interview.`);
        } else {
            // For hybrid or other types
            alert(`Interview: ${interview.interviewName}\n\nPlease check your email for interview details and instructions.`);
        }
    };

    if (!staffData) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="staff-dashboard">
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="logo-section">
                        <div className="logo-container">
                            <span className="logo-text">Motive</span>
                            <span className="logo-subtext">Square</span>
                        </div>
                    </div>
                    <div className="page-title">
                        <h1>
                            {activeTab === 'INTERVIEWS' && 'INTERVIEWS'}
                            {activeTab === 'CALENDAR' && 'CALENDAR'}
                            {activeTab === 'TASKS' && 'TASK MANAGEMENT'}
                            {activeTab === 'FEEDBACK_FORMS' && 'FEEDBACK FORMS'}
                            {activeTab === 'COURSE_FEEDBACK' && 'COURSE FEEDBACK'}
                            {activeTab === 'STUDENT_PROGRESS' && 'STUDENT PROGRESS'}
                            {activeTab === 'ADD_EXAM' && 'ADD EXAM'}
                        </h1>
                    </div>
                    <div className="user-section">
                        <span className="user-role">{staffData.position}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <nav className="navigation-tabs">
                <button 
                    className={`nav-tab ${activeTab === 'INTERVIEWS' ? 'active' : ''}`}
                    onClick={() => handleTabClick('INTERVIEWS')}
                >
                    INTERVIEW
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'CALENDAR' ? 'active' : ''}`}
                    onClick={() => handleTabClick('CALENDAR')}
                >
                    CALENDAR
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'TASKS' ? 'active' : ''}`}
                    onClick={() => handleTabClick('TASKS')}
                >
                    TASKS
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'FEEDBACK_FORMS' ? 'active' : ''}`}
                    onClick={() => handleTabClick('FEEDBACK_FORMS')}
                >
                    FEEDBACK FORMS
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'COURSE_FEEDBACK' ? 'active' : ''}`}
                    onClick={() => handleTabClick('COURSE_FEEDBACK')}
                >
                    COURSE FEEDBACK
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'STUDENT_PROGRESS' ? 'active' : ''}`}
                    onClick={() => handleTabClick('STUDENT_PROGRESS')}
                >
                    STUDENT PROGRESS
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'ADD_EXAM' ? 'active' : ''}`}
                    onClick={() => handleTabClick('ADD_EXAM')}
                >
                    ADD EXAM
                </button>

            </nav>

            <main className="dashboard-main">
                <div className="dashboard-container">
                    {activeTab === 'INTERVIEWS' && (
                        <div className="interviews-content">
                                                                    <div className="interview-actions">
                                            <button 
                                                className="action-btn add-btn"
                                                onClick={() => navigate('/staff/add-interview')}
                                            >
                                                ADD INTERVIEW
                                            </button>
                                        </div>
                            
                            <div className="my-interviews-section">
                                <div className="section-header">
                                    <h3 className="section-title">ALL INTERVIEWS ({filteredInterviews.length} of {interviews.length})</h3>
                                    <div className="header-actions">
                                        <div className="filter-controls">
                                            <select 
                                                className="status-filter"
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                value={statusFilter}
                                            >
                                                <option value="">All Status</option>
                                                <option value="scheduled">Scheduled</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                            <select 
                                                className="type-filter"
                                                onChange={(e) => setTypeFilter(e.target.value)}
                                                value={typeFilter}
                                            >
                                                <option value="">All Types</option>
                                                <option value="online">Online</option>
                                                <option value="in-person">In-Person</option>
                                                <option value="hybrid">Hybrid</option>
                                            </select>
                                            {(statusFilter || typeFilter) && (
                                                <button 
                                                    className="clear-filters-btn"
                                                    onClick={() => {
                                                        setStatusFilter('');
                                                        setTypeFilter('');
                                                    }}
                                                    title="Clear all filters"
                                                >
                                                    🗑️ Clear
                                                </button>
                                            )}
                                        </div>
                                        <button 
                                            className="refresh-btn"
                                            onClick={() => fetchInterviews()}
                                            disabled={loading}
                                        >
                                            🔄 Refresh
                                        </button>
                                    </div>
                                </div>
                                <div className="interviews-list">
                                    {loading ? (
                                        <div className="loading-state">
                                            <div className="loading-spinner"></div>
                                            <p>Loading interviews...</p>
                                        </div>
                                                                    ) : filteredInterviews.length === 0 ? (
                                    <div className="empty-state">
                                        <div className="empty-icon">📅</div>
                                        <h4>No Interviews Found</h4>
                                        <p>{interviews.length === 0 ? 'No interviews have been scheduled yet. Use the "ADD INTERVIEW" button above to create your first interview.' : 'No interviews match the current filters. Try adjusting your filter criteria.'}</p>
                                    </div>
                                ) : (
                                    filteredInterviews.map((interview) => (
                                            <div key={interview._id} className="interview-item">
                                                <div className="interview-info">
                                                    <div className="interview-header">
                                                        <span className="interview-name">{interview.interviewName}</span>
                                                        <span className={`interview-status ${interview.status}`}>
                                                            {interview.status.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="interview-details">
                                                        <div className="detail-row">
                                                            <span className="detail-item">
                                                                <strong>📅 Date:</strong> {new Date(interview.date).toLocaleDateString()}
                                                            </span>
                                                            <span className="detail-item">
                                                                <strong>⏰ Time:</strong> {interview.time}
                                                            </span>
                                                            <span className="detail-item">
                                                                <strong>⏱️ Duration:</strong> {interview.duration} minutes
                                                            </span>
                                                        </div>
                                                        <div className="detail-row">
                                                            <span className="detail-item">
                                                                <strong>🎯 Type:</strong> {interview.interviewType}
                                                            </span>
                                                            {interview.interviewType === 'online' && (
                                                                <span className="detail-item">
                                                                    <strong>💻 Platform:</strong> {interview.platform}
                                                                </span>
                                                            )}
                                                            <span className="detail-item">
                                                                <strong>👥 Max Participants:</strong> {interview.maxParticipants || 'Unlimited'}
                                                            </span>
                                                        </div>
                                                        <div className="detail-row">
                                                            <span className="detail-item">
                                                                <strong>👨‍💼 Created by:</strong> {interview.staffId?.name || 'Unknown Staff'}
                                                            </span>
                                                            <span className="detail-item">
                                                                <strong>📧 Contact:</strong> {interview.staffId?.email || 'No email'}
                                                            </span>
                                                        </div>
                                                        {interview.description && (
                                                            <div className="detail-row">
                                                                <span className="detail-item full-width">
                                                                    <strong>📝 Description:</strong> {interview.description}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="interview-actions">
                                                    {interview.status === 'scheduled' && (
                                                        <button 
                                                            className="join-interview-btn"
                                                            onClick={() => handleJoinInterview(interview)}
                                                            title="Join this interview"
                                                        >
                                                            🚀 JOIN
                                                        </button>
                                                    )}
                                                    <button 
                                                        className="edit-interview-btn"
                                                        onClick={() => navigate(`/staff/edit-interview/${interview._id}`)}
                                                        title="Edit interview details"
                                                    >
                                                        ✏️ EDIT
                                                    </button>
                                                    <button 
                                                        className="cancel-interview-btn"
                                                        onClick={() => navigate(`/staff/remove-interview/${interview._id}`)}
                                                        title="Cancel this interview"
                                                    >
                                                        ❌ CANCEL
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                                            {activeTab === 'CALENDAR' && (
                            <StaffCalendarPage />
                        )}

                        {activeTab === 'TASKS' && (
                            <StaffTaskManagement />
                        )}

                    {activeTab === 'FEEDBACK_FORMS' && (
                        <div className="tab-content">
                            <h2>Feedback Forms</h2>
                            <p>Manage and create feedback forms for students.</p>
                        </div>
                    )}

                    {activeTab === 'COURSE_FEEDBACK' && (
                        <div className="tab-content">
                            <h2>Course Feedback</h2>
                            <p>View and manage course feedback from students.</p>
                        </div>
                    )}

                    {activeTab === 'STUDENT_PROGRESS' && (
                        <div className="tab-content">
                            <h2>Student Progress</h2>
                            <p>Track and monitor student progress and performance.</p>
                        </div>
                    )}

                    {activeTab === 'ADD_EXAM' && (
                        <StaffExamPage />
                    )}
                </div>
            </main>
        </div>
    );
};

export default StaffDashboard;
