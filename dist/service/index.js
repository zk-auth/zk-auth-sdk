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
exports.Callback = exports.GetAuthRequest = void 0;
const express_1 = __importDefault(require("express"));
const js_iden3_auth_1 = require("@iden3/js-iden3-auth");
const raw_body_1 = __importDefault(require("raw-body"));
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.static("static"));
app.get("/api/sign-in", (req, res) => {
    console.log("get Auth Request");
    GetAuthRequest(req, res);
});
app.post("/api/callback", (req, res) => {
    console.log("callback");
    Callback(req, res);
});
app.listen(port, () => {
    console.log("server running on port 8080");
});
const requestMap = new Map();
function GetAuthRequest(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const hostUrl = "<NGROK_URL>";
        const sessionId = 1;
        const callbackURL = "/api/callback";
        const audience = "did:polygonid:polygon:mumbai:2qDyy1kEo2AYcP3RT4XGea7BtxsY285szg6yP9SPrs";
        const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;
        const request = js_iden3_auth_1.auth.createAuthorizationRequest("test flow", audience, uri);
        request.id = "7f38a193-0918-4a48-9fac-36adfdb8b542";
        request.thid = "7f38a193-0918-4a48-9fac-36adfdb8b542";
        const proofRequest = {
            id: 1,
            circuitId: "credentialAtomicQuerySigV2",
            query: {
                allowedIssuers: ["*"],
                type: "KYCAgeCredential",
                context: "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
                credentialSubject: {
                    birthday: {
                        $lt: 20000101,
                    },
                },
            },
        };
        const scope = (_a = request.body.scope) !== null && _a !== void 0 ? _a : [];
        request.body.scope = [...scope, proofRequest];
        requestMap.set(`${sessionId}`, request);
        return res.status(200).set("Content-Type", "application/json").send(request);
    });
}
exports.GetAuthRequest = GetAuthRequest;
function Callback(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = req.query.sessionId;
        const raw = yield (0, raw_body_1.default)(req);
        const tokenStr = raw.toString().trim();
        const ethURL = "<MUMBAI_RPC_URL>";
        const contractAddress = "0x134B1BE34911E39A8397ec6289782989729807a4";
        const keyDIR = "../keys";
        const ethStateResolver = new js_iden3_auth_1.resolver.EthStateResolver(ethURL, contractAddress);
        const resolvers = {
            ["polygon:mumbai"]: ethStateResolver,
        };
        const authRequest = requestMap.get(`${sessionId}`);
        const verificationKeyloader = new js_iden3_auth_1.loaders.FSKeyLoader(keyDIR);
        const sLoader = new js_iden3_auth_1.loaders.UniversalSchemaLoader("ipfs.io");
        const verifier = new js_iden3_auth_1.auth.Verifier(verificationKeyloader, sLoader, resolvers);
        let authResponse;
        try {
            const opts = {
                acceptedStateTransitionDelay: 5 * 60 * 1000,
            };
            authResponse = yield verifier.fullVerify(tokenStr, authRequest, opts);
        }
        catch (error) {
            return res.status(500).send(error);
        }
        return res
            .status(200)
            .set("Content-Type", "application/json")
            .send("user with ID: " + authResponse.from + " Succesfully authenticated");
    });
}
exports.Callback = Callback;
