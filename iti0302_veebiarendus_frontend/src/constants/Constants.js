export const DEVELOPMENT_API_URL = "http://localhost:8080/api";
export const PRODUCTION_API_URL = "http://193.40.156.155/api";
export const API_BASE_URL = window.location.port === "3000" ? DEVELOPMENT_API_URL : PRODUCTION_API_URL;

export const FRIENDS_PAGE_SIZE = 5;