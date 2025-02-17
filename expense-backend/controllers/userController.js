import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";

//@desc     Auth user
//@route    POST /api/users/login
//@access   Public

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        
        generateToken(res, user._id)

        res.status(200).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin
        })
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

//@desc     Register user
//@route    POST /api/users
//@access   Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body;

    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400);
        throw new Error('User already exists')
    }

    if(!name || !email || !password){
        res.status(400);
        throw new Error('All fields are required')
    }

    const user = await User.create({
        name,email,password
    })

    if(user){
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name : user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
})

//@desc     Log out user
//@route    POST /api/users/logout
//@access   Private

const logoutUser = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly : true,
        expires : new Date(0)
    });

    res.status(200).json({message : 'Logged out successfully'})
})

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        res.status(200).json({
            _id: user._id,
            name : user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('User not found')
    }
})



//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password;
        }

        const updateUser = await user.save();
        res.status(200).json({
            _id : updateUser._id,
            name: updateUser.name,
            email : updateUser.email,
            isAdmin: updateUser.isAdmin
        })

    } else {
        res.status(400);
        throw new Error('User not found')
    }
})

//@desc     Get all users
//@route    Get /api/users
//@access   Private/admin

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    if(users){
        res.status(200).json(users)
    } else {
        res.status(404)
        throw new Error('Not Found')
    };
})

//@desc     Get all user by id
//@route    Get /api/users/:id
//@access   Private/admin

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error('Not Found')
    };
})

//@desc     Delete users
//@route    Delete /api/users/:id
//@access   Private/admin

const deleteUser = asyncHandler(async (req, res) => {
    res.send("delete user ")
})

//@desc     Update users
//@route    Delete /api/users/:id
//@access   Private/admin

const updateUser = asyncHandler(async (req, res) => {
    res.send("update user")
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}