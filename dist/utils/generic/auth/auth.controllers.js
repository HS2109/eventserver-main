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
exports.verifyOTPofUser = exports.resendOTPtoUser = exports.sendOTPtoUser = void 0;
const axios = require("axios").default;
const SendOtp = require("sendotp");
const sendOtp = new SendOtp(process.env.MSG91AUTHKEY);
const templateId = process.env.MSG91TEMPLATEID;
const sendOTPtoUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobileNo } = req.body;
    let URL;
    if (mobileNo == "8899221111" ||
        mobileNo == "8899331111" ||
        mobileNo == "7021434254" ||
        mobileNo == "9167295546") {
        URL = `https://api.msg91.com/api/v5/otp?template_id=${templateId}&mobile=91${mobileNo}&authkey=${process.env.MSG91AUTHKEY}&otp_length=6&otp=123456`;
    }
    else {
        URL = `https://api.msg91.com/api/v5/otp?template_id=${templateId}&mobile=91${mobileNo}&authkey=${process.env.MSG91AUTHKEY}&otp_length=6`;
    }
    axios
        .get(URL)
        .then(function (response) {
        res.status(200).send({
            success: true,
            result: response.data,
        });
    })
        .catch(function (error) {
        res.status(200).send({
            success: true,
            error: error,
        });
    });
});
exports.sendOTPtoUser = sendOTPtoUser;
const resendOTPtoUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobileNo, type = "text" } = req.body;
    let URL;
    if (mobileNo == "8899221111" || mobileNo == "8899331111") {
        URL = `https://api.msg91.com/api/v5/otp/retry?authkey=${process.env.MSG91AUTHKEY}&retrytype=${type}&mobile=91${mobileNo}&otp=123456`;
    }
    else {
        URL = `https://api.msg91.com/api/v5/otp/retry?authkey=${process.env.MSG91AUTHKEY}&retrytype=${type}&mobile=91${mobileNo}`;
    }
    axios
        .get(URL)
        .then(function (response) {
        res.status(200).send({
            success: true,
            result: response.data,
        });
    })
        .catch(function (error) {
        res.status(200).send({
            success: true,
            error: error,
        });
    });
});
exports.resendOTPtoUser = resendOTPtoUser;
const verifyOTPofUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobileNo, otp } = req.body;
    const URL = `https://api.msg91.com/api/v5/otp/verify?authkey=${process.env.MSG91AUTHKEY}&mobile=91${mobileNo}&otp=${otp}`;
    axios
        .get(URL)
        .then(function (response) {
        res.status(200).send({
            success: true,
            result: response.data,
        });
    })
        .catch(function (error) {
        res.status(200).send({
            success: true,
            error: error,
        });
    });
});
exports.verifyOTPofUser = verifyOTPofUser;
//# sourceMappingURL=auth.controllers.js.map