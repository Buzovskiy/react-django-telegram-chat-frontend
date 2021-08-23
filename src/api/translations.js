import axios from 'axios';

export default axios.create({
	baseURL : process.env.REACT_APP_CHAT_API_BASE_URL,
	headers : {
		// Authorization : 'Client-ID vWNY9dt7mGqU4F2N-XVCiAk6lh1B1LYdkztp6YzjV1Qs'
	},
});