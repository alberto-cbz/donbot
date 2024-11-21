const ajaxHeaders=()=> {
    let token=localStorage.getItem('token');
    return {
        headers:{
            'x-donbot-access-token':`${token}`
        }
    };
};