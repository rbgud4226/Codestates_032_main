import AWS from "aws-sdk";

/* AWS 설정 */
const ACCESS_KEY = "AWS_ACCESS_KEY";
const SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";
const REGION = "ap-northeast-2";
const S3_BUCKET = "AWS에서 만든 S3 BUCKET 이름";
const FOLDER_NAME = "AWS bucket에 만들 folder 이름";

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const uploadImageFile = (image: any, setImage: any) => {
  const params = {
    ACL: "public-read",
    Body: image,
    Bucket: S3_BUCKET,
    Key: FOLDER_NAME + "/" + image.name,
  };

  myBucket
    .putObject(params)
    .on("httpUploadProgress", (evt: any) => {
      setTimeout(() => {
        setImage(null);
      }, 3000);
    })
    .send(err => {
      if (err) console.log("image upload error", err);
    });
};
