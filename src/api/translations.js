import axios from 'axios';

export default axios.create({
	baseURL : 'http://127.0.0.1:8000/',
	headers : {
		// Authorization : 'Client-ID vWNY9dt7mGqU4F2N-XVCiAk6lh1B1LYdkztp6YzjV1Qs'
	},
});