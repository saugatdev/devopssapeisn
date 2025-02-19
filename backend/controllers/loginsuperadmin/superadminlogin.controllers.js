import asyncHandler from "express-async-handler";
import Superadmin from "../../models/superadmin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//superadmin/loginSuperadmin
export const loginSuperadmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required.",
        });
    }

    const superadmin = await Superadmin.findOne({ email });

    if (!superadmin) {
        return res.status(401).json({
            message: "Invalid email or password.",
        });
    }

    const isPasswordMatch = await bcrypt.compare(password, superadmin.password);
    if (!isPasswordMatch) {
        return res.status(401).json({
            message: "Invalid email or password.",
        });
    }

    const accessToken = jwt.sign(
        {
            email: superadmin.email,
        },
        process.env.SUPERADMIN_TOKEN_SECRET,
        { expiresIn: "88h" }
    );

    return res.status(200).json({
        message: "Login successful",
        accessToken,
    });
});
