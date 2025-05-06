const envMode = import.meta.env.MODE === "development" ? "http://localhost:8000/api" : "/api"

export const USER_API_END_POINT=`${envMode}/v1/user`;
export const JOB_API_END_POINT=`${envMode}/v1/job`;
export const APPLICATION_API_END_POINT=`${envMode}/v1/application`;
export const COMPANY_API_END_POINT=`${envMode}/v1/company`;