class Api {
    constructor(Url) {
        this.URL = Url;
        this.headers = {
            authorization: "97fb1a09-c128-4b7c-b4b1-a7f451921abb",
            'Content-Type': 'application/json'
        };
    }
    

    get() {
        return fetch(this.URL, {
            method: "GET",
            headers: this.headers
        })
            
        .then(res => {
            if (res.ok) {
                return (  
                    console.log(res.status),
                    res.json());                   
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .then(data => {
            console.log(data);
            return data;
        })
            
        .catch(error => console.error('Error:', error));
    }

    createCard(data) {
        return fetch(`${this.URL}cards/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        
        .then(res => {
            if (res.ok) {
                return res.json();  
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
    }

    postOrPatch(data, method) {
        return fetch(this.URL, {
            method: method,
            headers: this.headers,
            body: JSON.stringify(data)
        })

        .then(res => {
            if (res.ok) {
                return res.json();  
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => console.error('Error:', error));
    }

    likeCard(idCard, isLiked) {
        return fetch(`${this.URL}cards/${idCard}/likes/`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: this.headers
        })
        .then(res => {
            res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        })
        .then(data => {
            return data;
        })
        .catch(error => console.error('Error:', error));
    }
    

    cardDelete(idCard) {
        return fetch(`${this.URL}cards/${idCard}/`, {
            method: "DELETE",
            headers: this.headers
        })
        .then(res => {
            return( res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));          
        })
        .then(data => {
            return data;
        })
        .catch(error => console.error('Error:', error));
    }

}

export { Api };