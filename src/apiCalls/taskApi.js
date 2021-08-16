
export const apiRequest = async (url, obj = {}) => {
    try{
        const response = await fetch(url, obj);
        if(await response.status === 204 && obj.method === "DELETE"){
            return true;
        }
        const data = await response.json();
        const fetchedData = await data.data;
        return fetchedData;

    }catch(err){
        alert("Server Offline");
        return false;
    }
}

