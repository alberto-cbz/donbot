const manualLogout=async (level)=> {
    console.log('logout', level);

    let logout=await axios.post('../../auth/logout', {token:localStorage.getItem('token')}, ajaxHeaders())
        .catch(err=> console.log('##LOGOUT ERR', err))
        .finally(()=> {
            localStorage.clear();
            window.location=`${level}login`;
        });
};
const logout=(level)=> {
    localStorage.clear();
    window.location=`${level}login`;
};