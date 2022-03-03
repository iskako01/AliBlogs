import { db, storage } from "../firebase/firebase";

export default function useCreatePost(
  blogTitle,
  blogHTML,
  file,
  loading,
  blogCoverPhotoName,
  error,
  errorMsg,
  profileId,
  router,
  store
) {
  const imageHandler = (file, Editor, cursorLocation, resetUploader) => {
    const storageRef = storage.ref();
    const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
    docRef.put(file).on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        const downloadURL = await docRef.getDownloadURL();
        Editor.insertEmbed(cursorLocation, "image", downloadURL);
        resetUploader();
      }
    );
  };
  const uploadBlog = () => {
    if (blogTitle.value.length !== 0 && blogHTML.value.length !== 0) {
      if (file.value) {
        loading.value = true;
        const storageRef = storage.ref();
        const docRef = storageRef.child(
          `documents/BlogCoverPhotos/${blogCoverPhotoName.value}`
        );
        docRef.put(file.value).on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (err) => {
            console.log(err);
            loading.value = false;
          },
          async () => {
            const downloadURL = await docRef.getDownloadURL();
            const timestamp = await Date.now();
            const dataBase = await db.collection("blogPosts").doc();
            console.log(
              blogTitle,
              blogHTML,
              file,
              loading,
              blogCoverPhotoName,
              error,
              errorMsg,
              profileId
            );
            await dataBase.set({
              blogID: dataBase.id,
              blogHTML: blogHTML.value,
              blogCoverPhoto: downloadURL,
              blogCoverPhotoName: blogCoverPhotoName.value,
              blogTitle: blogTitle.value,
              profileId: profileId.value,
              date: timestamp,
            });
            await store.dispatch("getPost");
            loading.value = false;
            router.push({
              name: "ViewBlog",
              params: { blogid: dataBase.id },
            });
          }
        );
        return;
      }
      error.value = true;
      errorMsg.value = "Please ensure you uploaded a cover photo!";
      setTimeout(() => {
        error.value = false;
      }, 5000);
      return;
    }
    error.value = true;
    errorMsg.value = "Please ensure Blog Title & Blog Post has been filled!";
    setTimeout(() => {
      error.value = false;
    }, 5000);
  };

  return { uploadBlog, imageHandler };
}
