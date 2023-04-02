"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInWithZkAuthButton = exports.ZkAuthLogo = void 0;
var logo_1 = require("./logo");
Object.defineProperty(exports, "ZkAuthLogo", { enumerable: true, get: function () { return __importDefault(logo_1).default; } });
__exportStar(require("./logo"), exports);
var button_1 = require("./button");
Object.defineProperty(exports, "SignInWithZkAuthButton", { enumerable: true, get: function () { return __importDefault(button_1).default; } });
__exportStar(require("./button"), exports);
