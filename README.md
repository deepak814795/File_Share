# File Sharing using Presigned URL + AWS S3 Bucket
### [Live Demo](https://j-q6gd.onrender.com/)
###  [Video Demo](https://github.com/deepak814795/File_Share/assets/91387970/6732cea4-4de5-4f40-989a-1ca781d1a4a5)

## Overview

This projects aims to demonstrate how secure file sharing works with presigned URL and AWS . Learn what presigned URLs are, how they differ from regular URLs obtained after uploading files, and the advantages they offer.

## Table of Contents

- [Presigned URL](#presigned-url)
- [Working of Project](#working-of-project-using-example)
- [Security Advantages of Presigned URLs](#security-advantages-of-presigned-urls)
- [Contributing](#contributing)

## Presigned URL

A presigned URL is a time-limited URL that provides secure and temporary access to a specific resource, such as a file in an AWS S3 bucket. It is generated with cryptographic signatures, ensuring its authenticity and tamper-proof nature. Presigned URLs are commonly used for granting controlled access to files without exposing storage credentials.

## Working of Project using Example
### Upload Example
**STEP 1 :**  A user communicates to the server that they intend to upload a file.
![](https://lh5.googleusercontent.com/6qBnC8obpEX97aovqyaBV5aad5I4PkjDYJbhGhZy3yQIqowZds6d1bgOZXVzbEbJxsirXkND4JGy4AO35uGrNgbAG7OEaq7QdQjP-m4EN0LerxBboWyBuAEzCVB-DXMBk0SUoZpHDal-LdbXL7hyl73HS5EeOgm-nxeD_YxQgLmchIESZ-yNiPnOGD55eQ)

**STEP 2 :**  The server recognizes the user and assesses that the user is authorized to perform the upload. Then the server uses its own credentials to generate an S3 pre-signed URL for uploading an object with a predetermined name into a given S3 bucket.
![](https://lh5.googleusercontent.com/H1yf10FIlLEX3aTxBBsCg1v_PD8qG4Jg0Or8O4YZWPGYXTUB5sMy0SxUHNPB6g0sMsZF5fycdkYt3oksiPzyq2WzvSehXAQ3pHqh1EyA8m2VG8ehTNeVmXCq-VYepK6scdXG0Ti8jZVkkPiISg4crZq2B0iZ6rh1vJXhRrtbrm9VkW7XSwi7HOdkzjunXw).

**STEP 3 :**  The user receives the pre-signed URL from the server.
![](https://lh6.googleusercontent.com/atDCmvj9K6IHdlYIDeB6LeMi5YlrLrfN7dvIywVK4CqWPDK5uBDiqLuzu9om-owgV-J8Vt2YN-9SJXWkSm75dRyLj3ZMVPfxYKjORVtCL1oN3qjWEue4FuMMroX-Ak84fyxb913dHtZPmO2uyfbJt1thk8Gm3cD3d6rXpALlGZKDUD969stkjub2gqj_DQ).

**STEP 4 :**  The user makes an HTTP request (PUT or POST) to the received pre-signed URL attaching the file to be uploaded as request payload. Once the request is completed the uploaded file will be available in S3.

### Download Example
**STEP 1:** The user requests the server the file myexpenses.csv.
![](https://lh6.googleusercontent.com/A9lnsVaGhsoiPNJhn4sz5QYZ7G-OyL7LDY8r-PUdbFjROHDA0z3r9eq3pGRStVtAyqp1Elsbf2zaEqDbToSH1zA6f3kK3RfkWE8t-c_TzWERFXXgwcrqJOWwFHWbHlJETkqQI5L3_amKJHfTCQEQsnDtwzZ5m1tTki4NDUboBvXt4yt4zxiJXbQCl0nJnw).

**STEP 2:** The server recognizes the user and somehow verifies that they can have access to myexpenses.csv. Then the server uses its own credentials to generate an S3 pre-signed URL to get myexpenses.csv.
![](https://lh3.googleusercontent.com/YIR5gMA60BW1KlkXpaym4QWboS3ESW-od3TJEGHaEyn1Sjj5_dErRGz0rLQ2zxYhrTHXpBzVOKDUI3XbcJf9mrhlu4UvL-fCeZK6WOOhQsBFefE7eUE-et7m2jhMKszycdqp1dm6qsQQ_Rq5dVZ1qErWbajVZr6gpAK7WZpwE91gn_BxtHP8iL_YjJLYWw).

**STEP 3:** The user receives the pre-signed URL from the server.
![](https://lh6.googleusercontent.com/bJQlDzqycqIlooYJ96naDElUAUy6GB88bCFouhMWCh4tOucNp1uqKIEP-YD1nHzbt4uF0Iwlj3k61-qLW73kAIHui4_CJxEFKBlel-qC_zfabwjYb7WmvhbAdYkljM--tMWI7BvBkrV0A2jd_OaignXVBifsVbgtPLswyK9WkS0wpFI0fIOhhx5b75ZTuQ).

**STEP 4:** The user makes an HTTP request (GET) to the received pre-signed URL to download the file directly from S3.

## Types of presigned URLs

### Get URL
This is probably the most common kind of pre-signed URL that you will see in the wild. As we discussed before, you can use GET pre-signed URLs to allow a user to download a specific object from an S3 bucket without needing them to have valid AWS credentials or to use the AWS SDK. One way to generate this kind of URL is by using the AWS CLI.

### Put URL
Pre-signed PUT URLs can be used to authenticate uploads to S3. These are called PUT requests because they are built on top of regular HTTP PUT requests.

A typical PUT request using a pre-signed URL would look like this:
![](https://fourtheorem.com/wp-content/uploads/2023/01/Screenshot-2023-01-13-at-11.06.52.png).
 In This example, we are sending a PUT request to the S3 server using the pre-signed URL. We are also passing the Content-Length header which specifies the size of the request body (in bytes). The request body contains the raw bytes of the file we are uploading.


## Security Advantages of Presigned URLs

It’s important to appreciate that the server never talks directly to S3. It can generate the pre-signed URLs autonomously by using its own set of AWS credentials (for example the server could be an EC2 instance with an IAM instance profile). 
In other words, the server does not need to talk with S3 (or other AWS services) to be able to generate a pre-signed URL. For this reason, the URL is validated by AWS at request time (i.e. when a user actually makes an HTTP call with that URL). 
AWS will consider this request as if it was performed by the entity that generate the pre-signed URL in the first place. So, if the server is not authorized to perform actions on the given bucket, the user will see a permission error when trying to use the generated URL.

## Usage
Follow these steps to use the Presigned URL Generator:

1. Clone the repository: `git clone https://github.com/yourusername/presigned-url-generator.git`
2. Install dependencies: `npm install`
3. Configure AWS credentials: Set up your AWS credentials using the AWS CLI or environment variables.
4. Run the generator: `node generate-presigned-url.js`

## Contributing

Contributions are welcome! If you have improvements or additional features to suggest, please open an issue or submit a pull request.
