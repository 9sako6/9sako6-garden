<template>
  <div class="container">
    <Pagination
      :total-posts-count="posts.length"
      :now-page="pageNum.toString()"
      :post-num-per-page="postNumPerPage"
    />
    <div v-for="post in $options.nonReactivePosts" :key="post.id">
      <Card
        :title="post.fields.title"
        :description="post.fields.description"
        :created-at="post.sys.createdAt"
        :link="`/posts/${post.fields.slug}`"
        :tags="post.fields.tags"
        :img-link="getEyeCatch(post).url"
        :category="post.fields.category ? post.fields.category.fields.slug : ''"
      />
    </div>
    <Pagination
      :total-posts-count="posts.length"
      :now-page="pageNum.toString()"
      :post-num-per-page="postNumPerPage"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Card from '~/components/Card';
import Pagination from '~/components/Pagination';

export default {
  components: {
    Card,
    Pagination
  },
  asyncData ({ params }) {
    if (params.id === undefined) {
      params.id = 1;
    }
    return { pageNum: params.id };
  },
  data: () => ({
    postNumPerPage: 7
  }),
  computed: {
    ...mapState(['posts']),
    ...mapGetters(['getEyeCatch'])
  },
  created () {
    this.$options.nonReactivePosts = this.posts.slice((this.pageNum - 1) * this.postNumPerPage, this.pageNum * this.postNumPerPage);
  },
  nonReactivePosts: null,
  head () {
    return {
      titleTemplate: '',
      meta: [],
      link: this.$options.nonReactivePosts.map(post => ({ rel: 'preload', href: this.getEyeCatch(post).url, as: 'image' }))
    };
  }
};
</script>
