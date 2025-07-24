import { hash,verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";
import { PublicClientApplication } from "@azure/msal-node";
import axios from 'axios';

export const register = async (req, res) => {
    try {
        const data = req.body;

        const encryptedPassword = await hash(data.password);

        data.password = encryptedPassword;

        const user = await User.create(data);

        return res.status(201).json({
            message: "User registered succesfully",
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed,check the information",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user || user.status === false) {
            return res.status(400).json({
                message: "Information incorrect",
                error: "check the information"
            });
        };

        const correctPassword = await verify(user.password, password);

        if (!correctPassword) {
            return res.status(400).json({
                message: "Information incorrect",
                error: "check the information"
            });
        }
        const token = await generateJWT(user._id);

        return res.status(200).json({
            message: "Login successful",
            token,
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        });
    }
};

/*
export const microsoftLogin = (req, res) => {
  const authUrl = `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}/oauth2/v2.0/authorize?` +
    new URLSearchParams({
      client_id: process.env.MS_CLIENT_ID,
      response_type: "code",
      redirect_uri: process.env.REDIRECT_URI,
      response_mode: "query",
      scope: "openid profile email User.Read",
    }).toString();

  return res.redirect(authUrl);
};

export const microsoftRedirect = async (req, res) => {
  const code = req.query.code;

  try {
    // 1. Obtener token de Microsoft
    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: process.env.MS_CLIENT_ID,
        scope: "openid profile email User.Read",
        code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
        client_secret: process.env.MS_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = tokenResponse.data;

    // 2. Obtener perfil del usuario
    const profileResponse = await axios.get("https://graph.microsoft.com/v1.0/me", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const { displayName, mail, userPrincipalName } = profileResponse.data;
    const email = mail || userPrincipalName;

    if (!email.endsWith("@kinal.edu.gt")) {
      return res.status(401).json({ message: "Email must be @kinal.edu.gt" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Usuario no existe: crear registro parcial
      user = await User.create({
        name: displayName || "Microsoft User",
        email,
        password: "microsoft_account", // dummy
        status: true
      });

      // Redirige a formulario de completar datos
      return res.redirect(`${process.env.FRONTEND_URL}/register-complete?email=${email}`);
    }

    // Usuario ya existe, login normal
    const token = await generateJWT(user._id);

    return res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);

  } catch (error) {
    console.error("Microsoft Redirect Error:", error.message);
    return res.status(500).json({ message: "Error during Microsoft login", error: error.message });
  }
};
*/
