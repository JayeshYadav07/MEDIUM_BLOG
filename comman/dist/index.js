"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.createSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupSchema = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
    name: zod_1.default.string().optional(),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
});
exports.createSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    published: zod_1.default.boolean().optional(),
});
exports.updateSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
    id: zod_1.default.string(),
});
