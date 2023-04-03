import { newsBaseUrl } from "./apiConfig";
import { getToken } from "./authentication";

export const getNews = (searchTerm) => {
  const params = new URLSearchParams();
  params.append('searchTextString', searchTerm);
  return fetch(`${newsBaseUrl}/search?${params.toString()}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": getToken()
    }
  });
}