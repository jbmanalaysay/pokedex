const getApi = async (url) => {
    try {
    const response = await fetch(url);
    if(response.status !== 200) {
        throw new Error('Error. Status Code: ' + response.status);
    }
    return response.json();
    }
    catch (e) {
        console.log(e);
    }
}
export default getApi;