
export const apiRequest = async (url, obj = {}) => {
    try{
        const response = await fetch(url, obj);
        if(await response.status === 204){
            return ;
        }
        const data = await response.json();
        const fetchedData = await data.data;

        return fetchedData;

    }catch(err){
        console.log(err);
    }
}

