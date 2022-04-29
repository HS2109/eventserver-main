import awsSDK from "aws-sdk";

const S3 = new awsSDK.S3({
  signatureVersion: "v4",
  accessKeyId: process.env.ACCESSKEY!,
  secretAccessKey: process.env.SECRETKEY!,
  region: process.env.REGION,
  apiVersion: "2006-03-01",
});

export const getUploadFileUrl = async (fileName: string) => {
  // const fileNamePrefix = uuid();
  // const extension = extractExtention(fileName);
  return await S3.getSignedUrlPromise("putObject", {
    Bucket: process.env.BUCKETNAME,
    Key: `${getLocaiton()}​/${fileName}​`,
    ACL: "public-read",
    Expires: 6000 * 5,
  });
};

export const uploadToS3Bucket = async (fileName: string, file: any) => {
  let contentType = "";
  if (fileName.split(".")[fileName.split(".").length - 1] == "pdf") {
    contentType = "application/pdf";
  } else if (
    fileName.split(".")[fileName.split(".").length - 1] == "doc" ||
    fileName.split(".")[fileName.split(".").length - 1] == "docx" ||
    fileName.split(".")[fileName.split(".").length - 1] == "csv" ||
    fileName.split(".")[fileName.split(".").length - 1] == "xls" ||
    fileName.split(".")[fileName.split(".").length - 1] == "ods" ||
    fileName.split(".")[fileName.split(".").length - 1] == "xlsx"
  ) {
    contentType = "application/msword";
  } else {
    contentType = `image/${
      fileName.split(".")[fileName.split(".").length - 1]
    }`;
  }
  return new Promise((resolve, reject) => {
    S3.upload(
      {
        Key: fileName,
        Bucket: process.env.BUCKETNAME!,
        ACL: process.env.FILEPERMISSION!,
        Body: file,
        // ContentEncoding: "base64",
        ContentType: contentType,
      },
      (error: Error, data: any) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      }
    );
  });
};
export const deleteFromS3Bucket = async (fileId: string) => {
  return new Promise((resolve, reject) => {
    S3.deleteObject(
      {
        Key: fileId,
        Bucket: process.env.BUCKETNAME!,
      },
      (error: Error, data: any) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      }
    );
  });
};
