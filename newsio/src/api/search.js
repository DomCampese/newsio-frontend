import { newsBaseUrl } from "./apiConfig";
import { getToken } from "./authentication";

export const getNews = ({ sources = '', categories = '', languages = '', keywords = '', date = '', sort = '', limit = '', offset = '' }) => {
  const params = new URLSearchParams();
  sources     && params.append('sources', sources);
  categories  && params.append('categories', categories);
  languages   && params.append('languages', languages);
  keywords    && params.append('keywords', keywords);
  date        && params.append('date', date);
  sort        && params.append('sort', sort);
  limit       && params.append('limit', limit);
  offset      && params.append('offset', offset);
  return fetch(`${newsBaseUrl}/search?${params.toString()}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": getToken()
    }
  });
}