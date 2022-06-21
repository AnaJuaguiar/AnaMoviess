const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzA2ODc0NDJjNTM3MTkwMzI1ODBmZjRjNTdjMDliZSIsInN1YiI6IjYyYWZjNjU5YTZhNGMxMDBmMGFiYWU1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mhL0ufGLkJfKI2grZRzRKONAxf6hdmi1CK71bXnkOO0";
const API_BASE_URL = "https://api.themoviedb.org/3/";

export const apiGet = async(url) => {
    try{
        const finalUrl = API_BASE_URL + url;

        const responsePromiss = await fetch(finalUrl, {
            method: "GET",
            headers: getHeaders()
        });
        const response = await responsePromiss.json();

        return response;
    } catch(error){
        return null;
    }
}

const getHeaders = () => {
    const headers = new Headers();
    headers.append("Authorization", "Bearer "+ API_TOKEN);
    headers.append("Content-Type", "application/json");

    return headers;
}
