import { newsBaseUrl } from "./apiConfig";
import { getToken } from "./authentication";

export const getNews = ({ countries = [], categories = [], languages = [], keyword = '' }) => {
  const params = new URLSearchParams();
  countries?.length     && params.append('countries', countries.join(','));
  categories?.length  && params.append('categories', categories.join(','));
  languages?.length   && params.append('languages', languages.join(','));
  keyword             && params.append('keywords', keyword);
  params.append('sort', 'published_desc');
  console.log(params.toString())
  return fetch(`${newsBaseUrl}/search?${params.toString()}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": getToken()
    }
  });
}