import React, { useState, useEffect } from 'react';
import './css/ManageFees.css';

function ManageFees() {
    const [activeTab, setActiveTab] = useState('applied');
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8070/fees/');
            if (response.ok) {
                const data = await response.json();
                setFees(data);
            } else {
                // If no backend, use mock data to show the design
                setFees([
                    {
                        _id: '1',
                        student_id: '0005',
                        student_name: 'SANSALA SANDEEPANI',
                        payment_status: 'PAYMENT SUCCESSFUL'
                    },
                    {
                        _id: '2',
                        student_id: '0006',
                        student_name: 'YASINI YASHADHA',
                        payment_status: 'PAYMENT SUCCESSFUL'
                    }
                ]);
            }
        } catch (error) {
            console.error('Error fetching fees:', error);
            // Use mock data if backend is not available
            setFees([
                {
                    _id: '1',
                    student_id: '0005',
                    student_name: 'SANSALA SANDEEPANI',
                    payment_status: 'PAYMENT SUCCESSFUL'
                },
                {
                    _id: '2',
                    student_id: '0006',
                    student_name: 'YASINI YASHADHA',
                    payment_status: 'PAYMENT SUCCESSFUL'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const getFilteredFees = () => {
        if (activeTab === 'applied') {
            return fees.filter(fee => fee.payment_status === 'PAYMENT SUCCESSFUL');
        } else {
            return fees.filter(fee => fee.payment_status === 'REJECTED');
        }
    };

    return (
        <div className="manage-fees-page">

            {/* Navigation Tabs */}
            <div className="fees-navigation">
                <button 
                    className={`nav-tab ${activeTab === 'applied' ? 'active' : ''}`}
                    onClick={() => handleTabChange('applied')}
                >
                    APPLIED LIST
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'rejected' ? 'active' : ''}`}
                    onClick={() => handleTabChange('rejected')}
                >
                    REJECTED LIST
                </button>
            </div>

            {/* Content Section */}
            <div className="fees-content">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="fees-table-container">
                        <table className="fees-table">
                            <thead>
                                <tr>
                                    <th>STUDENT ID</th>
                                    <th>STUDENT NAME</th>
                                    <th>PAYMENT STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getFilteredFees().length > 0 ? (
                                    getFilteredFees().map((fee) => (
                                        <tr key={fee._id}>
                                            <td>{fee.student_id}</td>
                                            <td>{fee.student_name}</td>
                                            <td>
                                                <span className={`payment-status ${fee.payment_status.toLowerCase().replace(' ', '-')}`}>
                                                    {fee.payment_status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="no-data">
                                            No {activeTab === 'applied' ? 'applied' : 'rejected'} fees found
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

export default ManageFees;
