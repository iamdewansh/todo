import { Router } from "express";
import { forgotPassword, login, loginWithGoogle, logout, oauthCallback, refreshAccessToken, resetCallback, resetPassword, signUp } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { addTodo, deleteTodo, editTodo, toggleCompletionStatus, viewTodos } from "../controllers/Todo.controller.js";
const router:Router  =Router()

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);

// Refreshing tokens 
router.post('/refresh-tokens', refreshAccessToken);

// Forgot password routes
router.get('/forgot-password', forgotPassword);
router.get('/auth/reset/callback', resetCallback);
router.post('/reset-password', resetPassword);

// Google OAuth routes
router.get('/auth/google', loginWithGoogle);
router.get('/auth/callback', oauthCallback);
