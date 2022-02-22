<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <close @click="closePreview" class="icon" />
      <img :src="this.blogCoverPhoto" alt="" />
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

import Close from "../components/svg/Close.vue";
export default {
  name: "BlogCoverPreview",
  components: { Close },
  setup() {
    const store = useStore();

    const blogCoverPhoto = computed(() => {
      return store.state.blogPhotoFileURL;
    });

    const closePreview = () => {
      store.commit("openPhotoPreview");
    };

    return { blogCoverPhoto, closePreview };
  },
};
</script>

<style scoped>
.modal {
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.modal-content {
  display: flex;
  justify-content: center;
  position: relative;
  border-radius: 12px;
  background-color: #fff;
  height: 400px;
  width: 600px;
  padding: 50px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.modal-content .icon {
  width: 24px;
  height: auto;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 15px;
  right: 15px;
  color: #303030;
}
.modal-content .icon img {
  margin-top: 16px;
  display: block;
  width: auto;
  height: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
