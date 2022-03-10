<template>
  <div id="commentForm" class="box has-shadow has-background-white">
    <form @keyup.enter="postComment">
      <div class="field has-margin-top">
        <div class="field has-margin-top">
          <label class="label"> Your comment </label>
          <div class="control">
            <textarea
              style="height: 100px"
              name="comment"
              class="input is-medium"
              autocomplete="true"
              v-model="comment.content"
              placeholder="lorem ipsum"
            >
            </textarea>
          </div>
        </div>
        <div class="control has-margin-top">
          <button
            style="background-color: #47b784"
            :class="{ 'is-loading': submit }"
            class="button has-shadow is-medium has-text-white"
            @click.prevent="postComment"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewComment",
  props: {
    currentBlogID: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      submit: false,
      comment: {
        content: "",
      },
    };
  },
  methods: {
    postComment() {
      this.submit = true;
      this.$store
        .dispatch("addComment", {
          content: this.comment.content,
          currentBlogID: this.currentBlogID,
        })
        .then(() => {
          this.submit = false;
        })
        .catch((err) => {
          this.submit = false;
          console.log(err);
        });
    },
  },
  computed: {
    isValid() {
      return this.comment.content !== "";
    },
  },
};
</script>

<style scoped>
.has-margin-top {
  margin-top: 15px;
}
</style>
