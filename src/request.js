function parseJson(response){
    return response.json()
}

function checkStatus(response){
    if(response.status>=200 && response.status <300){
        return response
    }
}

export default async function request(url, options){
    const fetchResponse = await fetch(url,options)
    const response = await checkStatus(fetchResponse)

    let jsonResponse;

    try {
        jsonResponse = await parseJson(response)

    }
    catch(e){
        jsonResponse = response;
    }
    return jsonResponse
}