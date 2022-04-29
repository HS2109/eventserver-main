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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const employee_model_1 = require("../../adminModule/employeeManagement/employee.model");
const User_1 = require("../../appModule/user/User");
const verifyJwtToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers.authorization || "";
    if (authorization) {
        const token = authorization.split(" ")[1];
        // console.log(req['files']);
        const payload = yield (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET);
        if (payload.type != undefined) {
            const user = yield employee_model_1.EmployeeModel.findOne({ _id: payload.userId });
            if (user) {
                req.body.user = user._id;
                req.body.accessUserRole = user.role;
                return next();
            }
            else {
                res.status(401).json({ message: "You are not authenticated." });
            }
        }
        // const userId = payload.userId;
        const user = yield User_1.UserModel.findById(payload.userId).exec();
        if (user) {
            req.body.user = user._id;
            req.body.accessUserRole = user.userRole;
            return next();
        }
        else {
            res.status(401).json({ message: "You are not authenticated." });
        }
    }
    else {
        res.status(401).json({ message: "You are not authenticated." });
    }
    return { user: null };
});
exports.verifyJwtToken = verifyJwtToken;
//# sourceMappingURL=verify-jwt-token.js.map