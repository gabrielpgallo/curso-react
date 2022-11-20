import P from "prop-types";
import "./styles.css";

export const PostCard = ({ post }) => (
  <div className="post">
    <img src={post.cover} alt={post.title} />
    <div className="post-content">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  </div>
);

PostCard.propTypes = {
  post: P.arrayOf({
    title: P.string.isRequired,
    cover: P.string.isRequired,
    body: P.string.isRequired,
  }),
};
