// const { logout_users } = require("../../../controllers/login/auth");

$(document).ready(function () {
    let queue=$('#queue-input').val();
    let type=$('#type-input').val();
    let job=$('#job-input').val();

    // datatable
    showData(queue, type, job);
});

// HELPERS
const getData=async (queue, job)=> {
    let info=await axios.get(config.URL_API + '/donbot/bull/getJob/'+queue+'/'+job, ajaxHeaders())
        .catch(err=> logout('../../../'));
    // if(info.status!==200) 
    return info.data;
}
const showData=async (queue, type, job)=> {
    let info=await getData(queue, job);
    $('#info-container').html(JSON.stringify(info, null, 4))
}