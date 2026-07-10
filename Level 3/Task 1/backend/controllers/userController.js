const User = require("../models/User");


// ==========================
// Create User
// ==========================
const createUser = async (req, res) => {

  try {

    const user = await User.create(req.body);


    // 🔔 Send realtime notification
    if (global.io) {

      global.io.emit("receiveNotification", {

        message: `New user added: ${user.name}`,

        time: new Date().toLocaleTimeString()

      });

    }



    return res.status(201).json({

      success: true,

      message: "User created successfully",

      data: user,

    });


  } catch (error) {

    console.error("CREATE USER ERROR:", error);


    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};




// ==========================
// Get All Users
// ==========================
const getUsers = async (req, res) => {

  try {

    const users = await User.findAll();


    return res.status(200).json({

      success: true,

      count: users.length,

      data: users,

    });


  } catch (error) {

    console.error("GET USERS ERROR:", error);


    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};




// ==========================
// Get User By ID
// ==========================
const getUserById = async (req, res) => {

  try {

    const user = await User.findByPk(req.params.id);



    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found",

      });

    }



    return res.status(200).json({

      success: true,

      data: user,

    });


  } catch (error) {


    console.error("GET USER ERROR:", error);


    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};




// ==========================
// Update User
// ==========================
const updateUser = async (req, res) => {

  try {


    const user = await User.findByPk(req.params.id);



    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found",

      });

    }



    await user.update(req.body);



    return res.status(200).json({

      success: true,

      message: "User updated successfully",

      data: user,

    });



  } catch (error) {


    console.error(error);


    return res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};




// ==========================
// Delete User
// ==========================
const deleteUser = async (req, res) => {

  try {


    const user = await User.findByPk(req.params.id);



    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found",

      });

    }



    await user.destroy();



    return res.status(200).json({

      success: true,

      message: "User deleted successfully",

    });



  } catch (error) {


    console.error("DELETE USER ERROR:", error);



    return res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};



module.exports = {

  createUser,

  getUsers,

  getUserById,

  updateUser,

  deleteUser,

};