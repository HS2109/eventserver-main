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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cros_1 = __importDefault(require("cros"));
const helmet_1 = __importDefault(require("helmet"));
const error_middleware_1 = require("./utils/middleware/error.middleware");
const typegoose_1 = require("@typegoose/typegoose");
const eFileUpload = require("express-fileupload");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const mainRoutes = require("./mainRoutes");
    const app = (0, express_1.default)();
    app.use((0, cros_1.default)({ origin: "*" }));
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json({ limit: "5000mb" }));
    app.use(express_1.default.urlencoded({
        limit: "5000mb",
        extended: true,
        parameterLimit: 50000000,
    }));
    typegoose_1.mongoose
        .connect(process.env.DATABASEURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
        .then(() => {
        console.log("Connected to database!");
    })
        .catch(() => {
        console.log("Connection failed!");
    });
    typegoose_1.mongoose.set("debug", false);
    app.use(eFileUpload());
    app.use("/status", (req, res, next) => {
        res.send({ message: "Success" });
    });
    app.use("/cicd", (req, res, next) => {
        res.send({ message: "CI CD IMPLEMENTED" });
    });
    app.use("/api", mainRoutes);
    app.use(error_middleware_1.errorHandler);
    const port = process.env.PORT || 6033;
    try {
        app.listen(port, () => console.log(`API server started at http://localhost:${port}`));
    }
    catch (err) {
        console.log(err);
    }
}))();
//# sourceMappingURL=index.js.map