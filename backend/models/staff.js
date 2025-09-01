const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    staff_id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
        enum: ['Teacher', 'Administrator', 'Support Staff', 'Manager', 'Coordinator']
    },
    department: {
        type: String,
        required: true,
        enum: ['Computer Science', 'Mathematics', 'English', 'Science', 'Administration', 'Support']
    },
    hire_date: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive', 'On Leave', 'Terminated'],
        default: 'Active'
    },
    photo: {
        type: String,
        default: null
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip_code: String,
        country: String
    },
    emergency_contact: {
        name: String,
        relationship: String,
        phone: String
    },
    qualifications: [{
        degree: String,
        institution: String,
        year: Number
    }],
    skills: [String],
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

// Index for better query performance
StaffSchema.index({ staff_id: 1, email: 1, username: 1 });

// Virtual for full name
StaffSchema.virtual('fullName').get(function() {
    return this.name;
});

// Method to get staff info (excluding sensitive data)
StaffSchema.methods.getPublicInfo = function() {
    const staffObject = this.toObject();
    delete staffObject.password;
    return staffObject;
};

// Static method to find active staff
StaffSchema.statics.findActive = function() {
    return this.find({ status: 'Active' });
};

// Static method to find staff by department
StaffSchema.statics.findByDepartment = function(department) {
    return this.find({ department: department, status: 'Active' });
};

const Staff = mongoose.model("Staff", StaffSchema);
module.exports = Staff;

