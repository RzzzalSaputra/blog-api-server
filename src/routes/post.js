import express from "express";
import {body} from "express-validator"
import { createPost } from "../controllers/post.js";
import { upload } from "../middlewares/upload.js";
import { validateRequest } from "../middlewares/valiadteRequest.js";

const router = express.Router()

router.post('/post',
    upload.single("image"),[
        body('title').not().isEmpty().withMessage('title is required'),
        body('body').not().isEmpty().withMessage('body is required'),
    ],
    validateRequest,
    createPost
)

export default router