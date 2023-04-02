import express from "express";
export declare function GetAuthRequest(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
export declare function Callback(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
