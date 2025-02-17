import bcrypt from 'bcryptjs'
const users = [
    {
        name : 'User1',
        email : 'user@one.com',
        password : bcrypt.hashSync('user1', 10),
        isAdmin : true

    },
    {
        name : 'User2',
        email : 'user@two.com',
        password : bcrypt.hashSync('user2', 10),

    },
    {
        name : 'User3',
        email : 'user@three.com',
        password : bcrypt.hashSync('user3', 10),

    }
]

export default users
