import "./styles.css";

import { loadPosts } from "../../utils/loadPosts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { SearchInput } from "../../components/SearchInput";
import { useState, useEffect, useCallback } from "react";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3);
  const [searchValue, setSeachValue] = useState("");

  const filteredPosts =
    searchValue != ""
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

  const HandleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nexPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSeachValue(value);
  };

  const noMorePosts = page + postsPerPage >= allPosts.length;

  useEffect(() => {
    HandleLoadPosts(0, postsPerPage);
  }, [HandleLoadPosts, postsPerPage]);

  return (
    <section className="container">
      <div className="searchInput-container">
        <SearchInput onChange={handleSearchChange} value={searchValue} />

        {filteredPosts.length === 0 && (
          <h3>Não existem posts que correspondem a busca :(</h3>
        )}
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            functionOnClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

// export class Home2 extends Component {

//    state = {
//       posts: [],
//       allPosts: [],
//       page: 0,
//       postsPerPage: 3,
//       searchValue: ""
//    };

//    async componentDidMount() {
//       await this.loadPosts();
//    }

//    render() {

//       return (

//       );
//    }
// }
