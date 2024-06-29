import { storage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// Helper function to create an input for file selection
export const filePicker = (callback: any, value: any, meta: any) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*,video/*");
  input.onchange = function () {
    const file = input.files![0];
    const reader = new FileReader();

    reader.onload = function (e) {
      callback(e.target!.result, {
        alt: file.name,
      });
    };

    reader.readAsDataURL(file);
  };

  input.click();
};

// Helper function to generate the storage path based on the upload type
const getStoragePath = (type: string, fileName: string): string => {
  switch (type) {
    case 'certification':
      return `DoctorCertifications/${fileName}`;
    case 'profilePicture':
      return `UserProfilePictures/${fileName}`;
    case 'postImage':
    case 'postVideo':
      return `PostMedia/${fileName}`;
    case 'blogImage':
      return `BlogImages/${fileName}`;
    case 'chatImage':
      return `ChatImages/${fileName}`;
    default:
      return `Misc/${fileName}`;
  }
};

// Generalized image upload handler function
export const uploadFile = async (
  file: File,
  uploadType: string
): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const storagePath = getStoragePath(uploadType, file.name);
    const fileRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(uploadProgress)
      },
      (error) => {
        console.error('Upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
