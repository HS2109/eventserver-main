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
exports.deleteFromS3Bucket = exports.uploadToS3Bucket = exports.getUploadFileUrl = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const moment_1 = __importDefault(require("moment"));
const S3 = new aws_sdk_1.default.S3({
    signatureVersion: "v4",
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETKEY,
    region: process.env.REGION,
    apiVersion: "2006-03-01",
});
const getUploadFileUrl = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    // const fileNamePrefix = uuid();
    // const extension = extractExtention(fileName);
    return yield S3.getSignedUrlPromise("putObject", {
        Bucket: process.env.BUCKETNAME,
        Key: `${getLocaiton()}​/${fileName}​`,
        ACL: "public-read",
        Expires: 6000 * 5,
    });
});
exports.getUploadFileUrl = getUploadFileUrl;
function getLocaiton() {
    const yearMonthFolder = (0, moment_1.default)().format("YYYY/MM");
    return `uploads/${yearMonthFolder}`;
}
const uploadToS3Bucket = (fileName, file) => __awaiter(void 0, void 0, void 0, function* () {
    let contentType = "";
    if (fileName.split(".")[fileName.split(".").length - 1] == "pdf") {
        contentType = "application/pdf";
    }
    else if (fileName.split(".")[fileName.split(".").length - 1] == "doc" ||
        fileName.split(".")[fileName.split(".").length - 1] == "docx" ||
        fileName.split(".")[fileName.split(".").length - 1] == "csv" ||
        fileName.split(".")[fileName.split(".").length - 1] == "xls" ||
        fileName.split(".")[fileName.split(".").length - 1] == "ods" ||
        fileName.split(".")[fileName.split(".").length - 1] == "xlsx") {
        contentType = "application/msword";
    }
    else {
        contentType = `image/${fileName.split(".")[fileName.split(".").length - 1]}`;
    }
    return new Promise((resolve, reject) => {
        S3.upload({
            Key: fileName,
            Bucket: process.env.BUCKETNAME,
            ACL: process.env.FILEPERMISSION,
            Body: file,
            // ContentEncoding: "base64",
            ContentType: contentType,
        }, (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
});
exports.uploadToS3Bucket = uploadToS3Bucket;
const deleteFromS3Bucket = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        S3.deleteObject({
            Key: fileId,
            Bucket: process.env.BUCKETNAME,
        }, (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
});
exports.deleteFromS3Bucket = deleteFromS3Bucket;
//# sourceMappingURL=fileUpload.js.map