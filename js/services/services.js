const postData = async (url, data) => { // async говорит что внитри функции есть асинхронный код
    const res = await fetch(url, { // async будет ждать выполнение этой операции
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: data
    });

    return await res.json();
};
    
const getResource = async (url) => {
    const res = await fetch(url);
        
    if (!res.ok) { // если в запросе пошло что-то не так, в консоль выкидываем ошибку
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export { postData };
export { getResource };
