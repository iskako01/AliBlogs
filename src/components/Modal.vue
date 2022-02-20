<template>
  <div class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <p>{{ modalMessage }}</p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalMessage: {
      type: String,
      default: "Error",
    },
  },
  emits: ["close-modal"],
  setup(props, { emit }) {
    const closeModal = () => {
      emit("close-modal");
    };

    return { closeModal };
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  width: 300px;
  padding: 40px 30px;
  background-color: #fff;
}
p {
  text-align: center;
}
button {
  align-self: center;
}
</style>
