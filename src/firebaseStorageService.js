import firebase from "./FirebaseConfig";

const storageRef = firebase.storage().ref();

const uploadFile = (file, fullFilePath, progressCallBack) => {
  const uploadTask = storageRef.child(fullFilePath).put(file);
  uploadTask.on(
    "state_changed",
    (snapShot) => {
      const progress = Math.round(
        (snapShot.bytesTransferred / snapShot.totalBytes) * 100
      );
      progressCallBack(progress);
    },
    (error) => {
      throw error;
    }
  );
  return uploadTask.then(async () => {
    const downLoadUrl = await uploadTask.snapshot.ref.getDownloadURL();
    return downLoadUrl;
  });
};
const deleteFile = (fileDownloadUrl) => {
  const decodeUrl = decodeURIComponent(fileDownloadUrl);
  const startIndex = decodeUrl.indexOf("/o/") + 3;
  const endIndex = decodeUrl.indexOf("?");
  const filePath = decodeUrl.substring(startIndex, endIndex);
  return storageRef.child(filePath).delete();
};

const FirebaseStorageService = {
  uploadFile,
  deleteFile,
};

export default FirebaseStorageService;
