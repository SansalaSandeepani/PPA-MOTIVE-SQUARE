const { ObjectId } = require('mongodb');

//Adding the staff controller functions
const saveStaff = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const collection = db.collection('StaffDetails');
    
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ error: "Username, email, and password are required" });
    }

    // Check if staff already exists
    const newStaff = {
      username,
      email,
      password
    };

    const insertResult = await collection.insertOne(newStaff);
    res.send(insertResult);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to register Staff" });
  }
};

// Update other functions similarly to use req.app.locals.db

// Function to get all staff members
// This function retrieves all staff members from the database
const getAllStaff = async (req, res) => {
  try {
    const db = req.app.locals.db
    const collection = db.collection('StaffDetails')
    
    const Staff = await collection.find({}).toArray()
    
    if (Staff.length === 0) {
      return res.status(404).send({ message: "No Staff found" })
    }
    
    res.send(Staff)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: "Failed to fetch Staff" })
  }
}


// Function to update staff details
// This function updates the details of a specific staff member by ID
const updateStaff = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const collection = db.collection('StaffDetails');
    
    // Validate ID format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "Invalid Staff ID format" });
    }
    
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "No update data provided" });
    }
    
    const updateResult = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    
    // Check if document was actually updated
    if (updateResult.matchedCount === 0) {
      return res.status(404).send({ error: "Staff not found" });
    }
    
    if (updateResult.modifiedCount === 0) {
      return res.status(200).send({ message: "No changes made to Staff" });
    }
    
    res.send({
      message: "Staff updated successfully",
      modifiedCount: updateResult.modifiedCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to update Staff" });
  }
};

// Function to delete a staff member
// This function deletes a specific staff member by ID
const deleteStaff = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const collection = db.collection('StaffDetails');
    
    // Validate ID format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "Invalid Staff ID format" });
    }
    
    const deleteResult = await collection.deleteOne({
      _id: new ObjectId(req.params.id)
    });
    
    // Check if document was actually deleted
    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ error: "Staff not found" });
    }
    
    res.send({
      message: "Staff deleted successfully",
      deletedCount: deleteResult.deletedCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to delete Staff" });
  }
};


// Function to get a staff member by ID
// This function retrieves a specific staff member by ID
const getStaffById = async (req, res) => {
  try {
    const db = req.app.locals.db
    const collection = db.collection('StaffDetails')
    
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "Invalid ID format" })
    }
    
    const Staff = await collection.findOne({ 
      _id: new ObjectId(req.params.id) 
    })
    
    if (!Staff) {
      return res.status(404).send({ error: "Staff not found" })
    }
    
    res.send(Staff)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: "Failed to fetch Staff" })
  }
}


// Exporting the functions to be used in the routes
// This allows the functions to be imported in the routes file
module.exports = {
    saveStaff,
    getAllStaff,
    updateStaff,  
    deleteStaff,
    getStaffById
}
