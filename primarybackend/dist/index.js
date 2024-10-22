"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./router/user");
const zap_1 = require("./router/zap");
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
const PORT = 3000;
app.use((0, cors_1.default)());
app.use('/api/v1/user', user_1.useRouter);
app.use('/api/v1/zap', zap_1.zapRouter);
app.listen(3000);
