import { Response, Request, NextFunction } from "express";

import { createAccessToken } from "./auth.middlewares";
import { ErrorResponse } from "../../errorResponse";
import { uploadToS3Bucket } from "../fileUpload";
import { User, UserModel, UserRole } from "../../../appModule/user/User";

const axios = require("axios").default;
const SendOtp = require("sendotp");
const sendOtp = new SendOtp(process.env.MSG91AUTHKEY);
const templateId = process.env.MSG91TEMPLATEID;

export const sendOTPtoUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mobileNo } = req.body;

  let URL;
  if (
    mobileNo == "8899221111" ||
    mobileNo == "8899331111" ||
    mobileNo == "7021434254" ||
    mobileNo == "9167295546"
  ) {
    URL = `https://api.msg91.com/api/v5/otp?template_id=${templateId}&mobile=91${mobileNo}&authkey=${process.env.MSG91AUTHKEY}&otp_length=6&otp=123456`;
  } else {
    URL = `https://api.msg91.com/api/v5/otp?template_id=${templateId}&mobile=91${mobileNo}&authkey=${process.env.MSG91AUTHKEY}&otp_length=6`;
  }

  axios
    .get(URL)
    .then(function (response: any) {
      res.status(200).send({
        success: true,
        result: response.data,
      });
    })
    .catch(function (error: any) {
      res.status(200).send({
        success: true,
        error: error,
      });
    });
};

export const resendOTPtoUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mobileNo, type = "text" } = req.body;
  let URL;
  if (mobileNo == "8899221111" || mobileNo == "8899331111") {
    URL = `https://api.msg91.com/api/v5/otp/retry?authkey=${process.env.MSG91AUTHKEY}&retrytype=${type}&mobile=91${mobileNo}&otp=123456`;
  } else {
    URL = `https://api.msg91.com/api/v5/otp/retry?authkey=${process.env.MSG91AUTHKEY}&retrytype=${type}&mobile=91${mobileNo}`;
  }

  axios
    .get(URL)
    .then(function (response: any) {
      res.status(200).send({
        success: true,
        result: response.data,
      });
    })
    .catch(function (error: any) {
      res.status(200).send({
        success: true,
        error: error,
      });
    });
};

export const verifyOTPofUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mobileNo, otp } = req.body;

  const URL = `https://api.msg91.com/api/v5/otp/verify?authkey=${process.env.MSG91AUTHKEY}&mobile=91${mobileNo}&otp=${otp}`;
  axios
    .get(URL)
    .then(function (response: any) {
      res.status(200).send({
        success: true,
        result: response.data,
      });
    })
    .catch(function (error: any) {
      res.status(200).send({
        success: true,
        error: error,
      });
    });
};
