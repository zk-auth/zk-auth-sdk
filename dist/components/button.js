"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_qr_code_1 = __importDefault(require("react-qr-code"));
const logo_1 = __importDefault(require("./logo"));
const BASE_URL = window.location.origin + window.location.pathname;
const styles = {
    fontFamily: "Nunito",
    border: "none",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    alignItems: "center",
    height: "40px",
    borderRadius: "20px",
    padding: "0 20px",
    background: "black",
};
const SignInWithZkAuthButton = ({ onSuccess, onError, }) => {
    const [value, setValue] = react_1.default.useState("");
    const handlerOnClick = () => {
        fetch(`${BASE_URL}/api/sign-in`)
            .then((r) => Promise.all([Promise.resolve(r.headers.get("x-id")), r.json()]))
            .then(([id, data]) => {
            console.log(data);
            setValue(data);
            return id;
        })
            .catch((err) => console.log(err));
    };
    return (react_1.default.createElement("div", null, value == "" ? (react_1.default.createElement("button", { onClick: handlerOnClick, className: `${styles}`, style: styles },
        react_1.default.createElement(logo_1.default, null),
        "Sign in with ZK Auth")) : (react_1.default.createElement("div", { style: {
            height: "auto",
            margin: "0 auto",
            maxWidth: 64,
            width: "100%",
        } },
        react_1.default.createElement(react_qr_code_1.default, { size: 256, style: { height: "auto", maxWidth: "100%", width: "100%" }, value: value, viewBox: `0 0 256 256` })))));
};
exports.default = SignInWithZkAuthButton;
