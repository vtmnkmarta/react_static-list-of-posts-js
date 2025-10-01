import './App.scss';

import postsFromServer from './api/posts.json';
import commentsFromServer from './api/comments.json';
import usersFromServer from './api/users.json';
import { PostList } from './components/PostList/PostList';

function getUserById(userId) {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getCommentById(commentId) {
  return commentsFromServer.filter(comment => comment.postId === commentId);
}

export const posts = postsFromServer
  .map(post => ({
    ...post,
    user: getUserById(post.userId),
  }))
  .map(postWithUser => ({
    ...postWithUser,
    comments: getCommentById(postWithUser.id),
  }));

export const App = () => (
  <section className="App">
    <h1 className="App__title">Static list of posts</h1>
    <PostList postList={posts} />
  </section>
);
