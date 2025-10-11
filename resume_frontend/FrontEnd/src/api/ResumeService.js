import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/resume';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for sending session cookies
});

const ResumeService = {
    generateResume: async (resumeData) => {
        try {
            console.log('Sending request to:', '/api/resume/generate');
            console.log('Request data:', { userResumeDescription: resumeData });
            console.log('Full request payload:', JSON.stringify({ userResumeDescription: resumeData }, null, 2));
            
            const response = await apiClient.post("/generate", { // Corrected endpoint
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
            
            if (error.response?.data) {
                console.error('Backend Error Response:', error.response.data);
            }
            
            throw error;
        }
    },

    checkAtsScore: async (pdfFile) => {
        try {
            const formData = new FormData();
            formData.append('file', pdfFile);
    
            const response = await apiClient.post('/ats-score', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('ATS Score Success response:', response.data);
            return response.data;
        } catch (error) {
            console.error('ATS Score API Error Details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
            throw error;
        }
    },

    getAuthenticatedUser: () => {
        return axios.get('http://localhost:8080/api/user', { withCredentials: true });
    },

    logout: () => {
        return axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
    },
};

export default ResumeService;