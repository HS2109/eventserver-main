import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import {
  EmployeeModel,
  employeeRole,
} from "../../adminModule/employeeManagement/employee.model";
import { UserModel } from "../../appModule/user/User";

export const verifyJwtToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authorization: string = req.headers.authorization || "";

  if (authorization) {
    const token = authorization.split(" ")[1];
    // console.log(req['files']);
    const payload: any = await verify(token, process.env.ACCESS_TOKEN_SECRET!);
    if (payload.type != undefined) {
      const user = await EmployeeModel.findOne({ _id: payload.userId });
      if (user) {
        req.body.user = user._id;
        req.body.accessUserRole = user.role;

        return next();
      } else {
        res.status(401).json({ message: "You are not authenticated." });
      }
    }
    // const userId = payload.userId;
    const user = await UserModel.findById(payload.userId).exec();
    if (user) {
      req.body.user = user._id;
      req.body.accessUserRole = user.userRole;
      return next();
    } else {
      res.status(401).json({ message: "You are not authenticated." });
    }
  } else {
    res.status(401).json({ message: "You are not authenticated." });
  }
  return { user: null };
};
