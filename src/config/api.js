let host;
if(process.env.NODE_ENV == "development"){
  host = "http://localhost:5000";
  // host="http://demo.mallbear.com/";
}else{
  host = location.origin;
}
const baseUri = host + "/api/v1/";
export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'auth',
  users: 'users'
};
