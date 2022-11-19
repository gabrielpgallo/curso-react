
import { Component } from 'react'

import './styles.css';

import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

export class Home extends Component {

   state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 3,
      searchValue: ""
   };

   async componentDidMount() {
      await this.loadPosts();
   }

   loadPosts = async () => {
      const { page, postsPerPage } = this.state;

      const postsAndPhotos = await loadPosts();
      this.setState({
         posts: postsAndPhotos.slice(page, postsPerPage),
         allPosts: postsAndPhotos
      })
   }

   loadMorePosts = () => {

      const { page, postsPerPage, allPosts, posts } = this.state;
      const nextPage = page + postsPerPage;
      const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

      posts.push(...nexPosts);
      this.setState({ posts, page: nextPage });
   }

   handleSearchChange = (e) => {
      const {value} = e.target
      this.setState({searchValue: value});
   }

   render() {
      const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
      const noMorePosts = page + postsPerPage >= allPosts.length;
      const filteredPosts = !!searchValue ? 
         allPosts.filter(post => {
            return post.title.toLowerCase().includes(searchValue.toLowerCase());
         })
         :
         posts;

      return (
         <section className='container'>

            <div className='searchInput-container'>
               <SearchInput onChange={this.handleSearchChange} value={searchValue}/>
               
               {filteredPosts.length === 0 && (
                  <h3>Não existem posts que correspondem a busca :(</h3>
               )}
            </div>

            {filteredPosts.length > 0 && (
               <Posts posts={filteredPosts} />
            )}
            
            <div className='button-container'>
               {!searchValue &&  (
                  <Button text="Load more posts" functionOnClick={this.loadMorePosts} disabled={noMorePosts} />
               )}
            </div>

         </section>
      );
   }
}