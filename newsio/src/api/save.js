import { newsBaseUrl } from "./apiConfig";
import { getToken, getEmail } from "./authentication";

export const saveNews = (newsStory) => {

    console.log("EMAIL: " + getEmail());

    return fetch(`${newsBaseUrl}/save`, {
        
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken(),
            "Email" : getEmail()
        },
        body: JSON.stringify(newsStory)
        });
}

export const getSavedNews = () => {

    return fetch(`${newsBaseUrl}/getSavedNews`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken(),
            "Email" : getEmail()
        }
    });
}

export const unsaveNews = (newsStory) => {
    return fetch(`${newsBaseUrl}/unsave`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken(),
            "Email" : getEmail()
        },
        body: JSON.stringify(newsStory)
        });
}