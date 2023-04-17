import { newsBaseUrl } from "./apiConfig";
import { getToken } from "./authentication";

export const saveNews = (newsStory) => {

    return fetch(`${newsBaseUrl}/save`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        body: JSON.stringify(newsStory)
        });
}

export const getSavedNews = () => {
    
    return fetch(`${newsBaseUrl}/getSavedNews`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        }
    });
}

export const unsaveNews = (newsStory) => {
    return fetch(`${newsBaseUrl}/unsave`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        },
        body: JSON.stringify(newsStory)
        });
}