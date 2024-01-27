import { useLocation } from 'react-router';

export const VyuflixCloneSearch = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  console.log(keyword);
  return <div>haha</div>;
};
