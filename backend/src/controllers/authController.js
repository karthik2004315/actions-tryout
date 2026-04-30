const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/User");
const generateAccessToken = (user) => {
    return jwt.sign(
        {email: user.email},
        process.env.SECRET_ACCESS,
        {expiresIn: "30m"}
    )
}
const generateRefreshToken = (user) =>{
    return jwt.sign(
        {email: user.email},
        process.env.REFRESH_SECRET,
        {expiresIn: "7d"}
    )
}

exports.register = async (req, res) => {
    try{
    const {email, password} = req.body;
    const existing  = await User.findOne({ email });
    if(existing) return res.status(400).json({msg: "User exists"});
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        password: hashed
    })
    res.status(201).json({message: "User registered successfully"});
}catch(err){
    res.status(500).json({message: "server error", error: err.message});
}
};

exports.login = async ( req, res ) => {
    try{
        const {email, password} = req.body; 
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            return res.status(401).json({message: "Invalid password"})
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        res.json({ accessToken })
    }catch(err){
        res.status(500).json({message: "server error", error: err.message})
    }
};

exports.refresh = async ( req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if(!token){
            return res.sendStatus(401);
        }
        jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
            if(err) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {email: user.email},
                process.env.SECRET_ACCESS,
                {expiresIn: "30m"}
            );
             res.json({accessToken});
        });
    }catch(err){
        res.status(500).json({message: "server error", error: err.message});
    }
}
