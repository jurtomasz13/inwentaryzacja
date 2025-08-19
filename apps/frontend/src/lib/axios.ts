import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNTc4MjRmZC03YjJmLTRhYTMtOGRmMi00MmQ1MmM5MWZmMTEiLCJlbWFpbCI6Imp1cnRvbWFzejEzQGdtYWlsLmNvbSIsIm5hbWUiOiJUb21layIsImlhdCI6MTc1NTM2NTUwNSwiZXhwIjoxNzU3OTU3NTA1fQ.QgZqphB2bWpFDCiyu0xqSFHSMJLsBlf1P2KzrFUCsO8';

    if (token.length && config.headers) {
        config.headers.Authorization =`Bearer ${token}`; 
    }

    return config;
});
