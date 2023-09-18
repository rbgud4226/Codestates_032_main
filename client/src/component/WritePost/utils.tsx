import AWS from "aws-sdk";

const ACCESS_KEY = "YOUR_AWS_ACCESS_KEY";
const SECRET_ACCESS_KEY = "YOUR_AWS_SECRET_ACCESS_KEY";
const REGION = "ap-northeast-2";
const S3_BUCKET = "YOUR_S3_BUCKET_NAME";
const FOLDER_NAME = "YOUR_S3_FOLDER_NAME";

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const uploadImageFile = (image: File) => {
  return new Promise<string>((resolve, reject) => {
    if (!image) {
      reject(new Error("이미지가 선택되지 않았습니다."));
      return;
    }

    const params = {
      ACL: "public-read",
      Body: image,
      Bucket: S3_BUCKET,
      Key: FOLDER_NAME + "/" + image.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt: AWS.S3.ManagedUpload.Progress) => {
        // 업로드 진행 상황 모니터링
        console.log(
          `업로드 진행률: ${Math.round((evt.loaded / evt.total) * 100)}%`,
        );
      })
      .send(err => {
        if (err) {
          console.log("이미지 업로드 오류:", err);
          reject(err);
        } else {
          console.log("이미지 업로드 완료");
          // 이미지 URL을 반환
          resolve(
            `https://${S3_BUCKET}.s3.amazonaws.com/${FOLDER_NAME}/${image.name}`,
          );
        }
      });
  });
};
