import { fetchSources } from './get-sources';
import { fetchArticles } from './get-articles';
import AT from './types';

console.log('========');
console.log(AT);
console.log('========');

export default {
  
  saveArticles: articles => (
    { type: AT.SAVE_ARTICLES, articles }
  ),
  
  
  
  fetchArticles,
  fetchSources,
  
};
