import express from 'express';

const router = express.Router();

import register from '../api/sessions/register.js';
import login from '../api/sessions/login.js';
import profile from '../api/sessions/profile.js';
import logout from '../api/sessions/logout.js';

router.post('/sessions/register', register);
router.post('/sessions/login', login);
router.get('/sessions/profile', profile);
router.post('/sessions/logout', logout)

export default router;
