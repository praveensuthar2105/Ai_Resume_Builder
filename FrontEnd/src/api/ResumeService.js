import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: "",  // Use relative URLs since we're using Vite proxy
	headers: {
		'Content-Type': 'application/json',
	}
});

export const generateResume = async (resumeData) => {
    try {
        console.log('Sending request to:', '/api/resume/generate');
        console.log('Request data:', { userResumeDescription: resumeData });
        console.log('Full request payload:', JSON.stringify({ userResumeDescription: resumeData }, null, 2));
        
        const response = await axiosInstance.post("/api/resume/generate", {
            userResumeDescription: resumeData  // Match backend ResumeRequest field name
        });

        console.log('Success response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error Details:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers,
            url: error.config?.url,
            requestData: error.config?.data
        });
        
        // Try to log more detailed error information
        if (error.response?.data) {
            console.error('Backend Error Response:', error.response.data);
        }
        
        throw error;
    }
};