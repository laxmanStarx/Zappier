"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
// import {  Request, Response } from "express";
const types_1 = require("../types");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SignupData.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect credential",
            errors: parsedData.error.errors
        });
    }
    // const user = await prismaClient.user.findFirst({
    //   where: {
    //       email: parsedData.data.username,
    //       password: parsedData.data.password
    //   }
    // });
    //     if (!user) {
    //       return res.status(403).json({
    //         message: "Sorry credential are incorrect"
    //       })
    //     }
    //     const token = jwt.sign({
    //       id: user.id
    //     }, JWT_PASSWORD);
    //     res.json({
    //       token: token,
    //     })
    const userExists = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });
    if (userExists) {
        return res.status(403).json({
            message: "User already exist"
        });
    }
    yield db_1.prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            //TODO: Don't store text in plain text
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    });
    return res.json({
        message: "Please verify your account by checking your email"
    });
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SigninData.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect credential",
            errors: parsedData.error.errors
        });
    }
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });
    if (!user) {
        return res.status(403).json({
            message: "sorry credential are incorrect"
        });
    }
    //sign the jwt
    const token = jsonwebtoken_1.default.sign({
        id: user.id
    }, config_1.JWT_PASSWORD);
    res.json({
        token: token
    });
}));
//check here
router.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO: Fix the type
    // @ts-ignore
    const id = req.id;
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });
    return res.json({
        user
    });
    //The issue you're encountering arises from the incorrect type assignment for req in the /user route. In Express, the request object req is not of type string but should be of type Request. Here's how to fix the error:
    // Correct the types for req and res in the /user route handler.
    // Ensure the middleware (authMiddleware) is adding the correct user data (like id) to the req object.
    // Here’s an updated version of your code:
}));
exports.useRouter = router;
