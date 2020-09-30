import axios from "axios";
const instance = axios.create({
  baseURL: "https://5eea03dfb13d0a00164e40ad.mockapi.io/api",
});

const newsApi = {
  /**
   * News tab
   */
  getNewsPost: () => {
    const uri = "/dienanh";
    return instance.get(uri);
  },

  postNews: (newPost) => {
    const uri = "/dienanh";
    return instance.post(uri, newPost);
  },

  deletePost: (id) => {
    const uri = `/dienanh/${id}`;
    return instance.delete(uri);
  },

  updatePost: (id, newPost) => {
    const uri = `/dienanh/${id}`;
    return instance.put(uri, newPost);
  },

  /**
   * Review Tab
   */
  getReviewPost: () => {
    const uri = "/review";
    return instance.get(uri);
  },
  postReviewPost: (newPost) => {
    const uri = "/review";
    return instance.post(uri, newPost);
  },

  /**
   * Review (Discuss) in detail page
   */
  getDiscussPost: () => {
    const uri = "/discuss";
    return instance.get(uri);
  },

  postDiscuss: (newPost) => {
    const uri = "/discuss";
    return instance.post(uri, newPost);
  },
  //update like
  updateDiscuss: (id, newPost) => {
    const uri = `/discuss/${id}`;
    return instance.put(uri, newPost);
  },
};

export default newsApi;
