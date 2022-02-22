<template>
  <div class="create-post">
    <BlogCoverPreview v-show="blogPhotoPreview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, .jpeg"
          />
          <button
            @click="openPreview"
            class="preview"
            :class="{ 'button-inactive': !blogPhotoFileURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ blogCoverPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          useCustomImageHandler
          @image-added="imageHandler"
        />
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }"
          >Post Preview</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Loading from "../components/Loading.vue";
import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "CreatePost",
  components: { Loading, BlogCoverPreview },
  setup() {
    const store = useStore();

    const file = ref(null);
    const blogPhoto = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const errorMsg = ref(null);
    const editorSettings = ref({
      modules: {
        imageResize: {},
      },
    });

    const profileId = computed(() => {
      return store.state.profileId;
    });
    const blogPhotoPreview = computed(() => {
      return store.state.blogPhotoPreview;
    });
    const blogPhotoFileURL = computed(() => {
      return store.state.blogPhotoFileURL;
    });
    const blogCoverPhotoName = computed(() => {
      return store.state.blogPhotoName;
    });
    const blogTitle = computed({
      get() {
        return store.state.blogTitle;
      },
      set(payload) {
        store.commit("updateBlogTitle", payload);
      },
    });
    const blogHTML = computed({
      get() {
        return store.state.blogHTML;
      },
      set(payload) {
        store.commit("newBlogPost", payload);
      },
    });

    const fileChange = () => {
      file.value = blogPhoto.value.files[0];
      const fileName = file.value.name;
      store.commit("fileNameChange", fileName);
      store.commit("createFileURL", URL.createObjectURL(file.value));
    };
    const openPreview = () => {
      store.commit("openPhotoPreview");
    };

    return {
      loading,
      error,
      blogPhoto,
      editorSettings,
      errorMsg,
      profileId,
      blogCoverPhotoName,
      blogPhotoPreview,
      blogPhotoFileURL,
      blogTitle,
      blogHTML,
      fileChange,
      openPreview,
    };
  },
};
</script>

<style>
.create-post {
  position: relative;
  height: 100%;
}
.create-post button {
  margin-top: 0;
}
.router-button {
  text-decoration: none;
  color: #fff;
}
label,
button,
.router-button {
  transition: 0.5s ease-in-out all;
  align-self: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 20px;
  padding: 12px 24px;
  color: #fff;
  background-color: #303030;
  text-decoration: none;
}
.router-button:hover {
  background-color: rgba(48, 48, 48, 0.7);
}
.container {
  position: relative;
  height: 100%;
  padding: 10px 25px 60px;
}

.invisible {
  opacity: 0 !important;
}
.err-message {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  color: #fff;
  margin-bottom: 10px;
  background-color: #303030;
  opacity: 1;
  transition: 0.5s ease all;
}
.err-message p {
  font-size: 14px;
}
.err-message span {
  font-weight: 600;
}
.blog-info {
  display: flex;
  margin-bottom: 32px;
}
.blog-info input:nth-child(1) {
  min-width: 300px;
}
.blog-info input {
  transition: 0.5s ease-in-out all;
  padding: 10px 4px;
  border: none;
  border-bottom: 1px solid #303030;
}
.blog-info input:focus {
  outline: none;
  box-shadow: 0 1px 0 0 #303030;
}
.upload-file {
  flex: 1;
  margin-left: 16px;
  position: relative;
  display: flex;
}
.upload-file input {
  display: none;
}
.preview {
  margin-left: 16px;
  text-transform: initial;
}
.blog-info span {
  font-size: 12px;
  margin-left: 16px;
  align-self: center;
}

.editor {
  height: 60vh;
  display: flex;
  flex-direction: column;
}
.quillWrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.ql-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
}
.ql-editor {
  padding: 20px 16px 30px;
}

.blog-actions {
  margin-top: 32px;
}
.blog-actions button {
  margin-right: 16px;
}
</style>
