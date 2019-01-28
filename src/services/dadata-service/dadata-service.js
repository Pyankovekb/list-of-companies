
export default class DadataService { 
    _apiBase = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
    _apiKey = 'd77c6388b5bc194db5fa9a4ed2eaf963d3c4282c';

    getCompany = (value) => {

        const http = new XMLHttpRequest();

        http.open("POST", "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party", false);
        http.setRequestHeader("Content-Type", "application/json");
        http.setRequestHeader("Authorization", "Token " + this._apiKey);

        const data = "{ \"query\": \"" + value + "\" }";

        http.send(data);
        
        const response = JSON.parse(http.responseText);
        
        return response.suggestions[0];
    };
};