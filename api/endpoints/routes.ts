export const Routes= {

    BASE_URL: 'https://api.qaautomationlabs.com/v1',

    AUTH_LOGIN:'/auth/login',
    AUTH_REGISTER:'/auth/register',
    AUTH_ME:'/auth/me',
    GET_USERS:(page:number=1,limit:number=10)=>
        `/users?page=${page}&limit=${limit}`,
    GET_A_USER:(id:number)=>`/users/${id}`
}