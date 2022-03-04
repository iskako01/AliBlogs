import { db, storage } from "../firebase/firebase";

export default function useEditBlog(
  blogTitle,
  blogHTML,
  file,
  loading,
  blogCoverPhotoName,
  error,
  errorMsg,
  routeID,
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
  const updateBlog = async () => {
    const dataBase = await db.collection("blogPosts").doc(routeID.value);
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
            await dataBase.update({
              blogHTML: blogHTML.value,
              blogCoverPhoto: downloadURL,
              blogCoverPhotoName: blogCoverPhotoName.value,
              blogTitle: blogTitle.value,
            });
            await store.dispatch("updatePost", routeID.value);
            loading.value = false;
            router.push({
              name: "ViewBlog",
              params: { blogid: dataBase.id },
            });
          }
        );
        return;
      }
      loading.value = true;
      await dataBase.update({
        blogHTML: blogHTML.value,
        blogTitle: blogTitle.value,
      });
      await store.dispatch("updatePost", routeID.value);
      loading.value = false;
      router.push({ name: "ViewBlog", params: { blogid: dataBase.id } });
      return;
    }
    error.value = true;
    errorMsg.value = "Please ensure Blog Title & Blog Post has been filled!";
    setTimeout(() => {
      error.value = false;
    }, 5000);
  };

  return { updateBlog, imageHandler };
}
