---
title: "Big file upload"
excerpt: "How to upload a big file in node.js express server"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2020-03-16T05:35:07.322Z"
author:
  name: Ameer Hamza
  picture: "/assets/blog/authors/joe.jpeg"
  role: "Backend Developer"
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas at amet, vulputate viverra facilisis et fringilla duis convallis."
technologies: ["nodejs", "react"]
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

### Big file upload

File upload has two features in our implementation.

1. File upload is done in chunks. Size of the chunk is determined by frontend.
2. If file upload is cancelled by some reason from frontend, next time the file is uploaded it will be resumed from the same byte.

### Execution

**uniqueFileId**:

We declared a global object named `uploads` in the [uploads file](https://github.com/d2x-addup/back-end/blob/84c9d4b3afad2d969fb33a13e70f228e688da103/src/routes/upload.ts#L16). This object will keep track of the uploaded bytes that have been uploaded for a particular file. We identify every file with a unique file name (passed by the frontend) i.e. `<file-size>-<user-id>-<original-file-name>` . The `uploads` object has the following interface.

```javascript
interface IUploads {
  uniqueFileId: {
    bytesReceived: number,
  };
}
```

If `uniqueFileId` is not found in the `uploads` object then it means either the user is uploading a new file or file has already been uploaded.

**already uploaded file**

We store the uploaded files in the `uploads/` folder. Before user starts uploading the file, we check this folder if the file is already been uploaded.

Three api routes are made for the upload process(used sequencially):

| Route                | Headers                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| /api/upload/status   | `x-file-name`, `file-size`                  | Check the status of file before upload. We check for **already uploaded file**, **resumed upload** and **new file**. <br><br> **1.** If file exists in the `uploads/` directory that means the file has already been completely uploaded. <br> **2.** If `uniqueFileId` property exists in `uploads` object then that means the file is being resumed and in that case we return the number of bytes that have been uploaded in response to frontend. <br> **3.** If above both cases don't pass then that means we are uploading a new file and we let frontend know in response                |
| /api/upload/files    | `x-file-name`, `content-range`, `file-size` | In this route we upload the chunk sent from frontend to backend. The upload is done by using a `fileStream`. If user is uploading a new file then we create a `writable file stream` and if it's not then we create a `appendable file stream` in the `tmp/` directory. [content-range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range) header is used to let the backend know from which byte it should start writing or appending. After successful write or append we update the number of `bytesReceived` in the `uploads` object.                                  |
| /api/upload/complete | `x-file-name`, `x-orig-file-name`           | This api lets backend do **post-upload** actions. <br><br> **1.** We check the format of the original file name. Original file name format is `{vehicle name}_{timestamp:HHMMSS}_{date:YYMMDD}.dat` // 1_115431_210224.dat <br> **2.** If file name is correct then we create a drive record and attach the respective vehicle with it. Otherwise we simply create a drive record. <br> **3.** We remove the `uniqueFileId` reference from the `uploads` object to mark the file upload complete. <br> **4.** At the end we move the uploaded file from `tmp/` directory to `uploads/` directory |

<br><hr>
