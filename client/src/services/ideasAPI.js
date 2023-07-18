import axios from 'axios';

class IdeasAPI {
	constructor() {
		this._apiURL = 'http://localhost:8000/api/ideas';
	}

    getIdeas() {
        return axios.get(this._apiURL);
    }

    createIdea(data) {
        return axios.post(this._apiURL, data);
    }
}

export default IdeasAPI;
