import aws from 'aws-sdk';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { promisify } from 'util';

process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';

dotenv.config();
const randomBytes = promisify(crypto.randomBytes);


const region=process.env.AWS_REGION;
const accessKeyId=process.env.AWS_ACCESSKEYID;
const secretAccessKey=process.env.AWS_SECRETACCESSKEY;
const bucket_name=process.env.AWS_BUCKETNAME


const s3=new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4"
})

const generateSignedUrl= async ()=>{
    
    const bytes = await randomBytes(16);
    const imageName=bytes.toString('hex');


    const params= {
        Bucket: bucket_name,
        Key: imageName,
        Expires: 60
    }
    const signedUrl=await s3.getSignedUrlPromise('putObject', params);
    return signedUrl;
}
export default generateSignedUrl;