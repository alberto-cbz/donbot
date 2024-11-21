let intervals=[];
let live=false;
let type='orders';

const main=async()=> {
    // crear queues iniciales
    showQueues(type);

    // crear queues al cambiar de seccion
    document.querySelectorAll("input[name='btnradio']").forEach(input=> {
        input.addEventListener('change', e=> {
            type=e.target.value;
            document.getElementById('live-switch').checked=false;
            killIntervals();
            showQueues(type);
        });
    });

    // crear intervalos al encender el switch live
    document.getElementById('live-switch').addEventListener('change', e=> {
        if(e.target.checked) createIntervals();
        else killIntervals();
    });
};

// HELPERS
const getCounts=async queueName=> {
    let counts=await axios.get(config.URL_API+'/donbot/bull/getCounts/'+queueName, ajaxHeaders())
        .catch(err=> logout('./'));
    if(counts.status!==200) logout('./');
    return counts.data;
};
const template=_.template(
    `
    <div class="col">
        <div id="card-<%= queueName %>" class="card bg-primary text-white">
            <div id="card-body-<%= queueName %>" class="card-body pt-1">
                <div class="row mb-2">
                    <div class="col text-center border-bottom border-white">
                        <small class="text-capitalize"><%= queueName.replace('_queue', '').replace(/_/g, ' ') %></small>
                    </div>
                </div>

                <div class="row mb-2">
                    <a href="flows/<%=queueName%>/completed" class="col text-white text-decoration-none">
                        <div class="row py-0 my-0">
                            <div class="col text-center">
                                <strong id="completed-<%=queueName%>"><%= completed %></strong>
                            </div>
                        </div>
                        
                        <div class="row py-0 my-0">
                            <div class="col m-0 text-center">
                                <small class="m-0" style="font-size: 75%;">completed</small>
                            </div>
                        </div>
                    </a>
                    
                    <a href="flows/<%=queueName%>/failed" class="col text-white text-decoration-none">
                        <div class="row py-0 my-0">
                            <div class="col text-center">
                                <strong id="failed-<%=queueName%>"><%= failed %></strong>
                            </div>
                        </div>
                        
                        <div class="row py-0 my-0">
                            <div class="col m-0 text-center">
                                <small class="m-0" style="font-size: 75%;">failed</small>
                            </div>
                        </div>
                    </a>
                </div>

                <div class="row mb-2">
                    <a href="flows/<%=queueName%>/active" class="col text-white text-decoration-none">
                        <div class="row py-0 my-0">
                            <div class="col text-center">
                                <strong id="active-<%=queueName%>" style="font-size: 80%;"><%= active %></strong>
                            </div>
                        </div>
                        
                        <div class="row py-0 my-0">
                            <div class="col m-0 text-center">
                                <small class="m-0" style="font-size: 65%;">active</small>
                            </div>
                        </div>
                    </a>
                    
                    <a href="flows/<%=queueName%>/delayed" class="col text-white text-decoration-none">
                        <div class="row py-0 my-0">
                            <div class="col text-center">
                                <strong id="delayed-<%=queueName%>" style="font-size: 80%;"><%= delayed %></strong>
                            </div>
                        </div>
                        
                        <div class="row py-0 my-0">
                            <div class="col m-0 text-center">
                                <small class="m-0" style="font-size: 65%;">delayed</small>
                            </div>
                        </div>
                    </a>

                    <a href="flows/<%=queueName%>/paused" class="col text-white text-decoration-none">
                        <div class="row py-0 my-0">
                            <div class="col text-center">
                                <strong id="paused-<%=queueName%>" style="font-size: 80%;"><%= paused %></strong>
                            </div>
                        </div>
                        
                        <div class="row py-0 my-0">
                            <div class="col m-0 text-center">
                                <small class="m-0" style="font-size: 65%;">paused</small>
                            </div>
                        </div>
                    </a>

                    <a href="flows/<%=queueName%>/waiting" class="col text-white text-decoration-none">
                        <div class="row py-0 my-0">
                            <div class="col text-center">
                                <strong id="waiting-<%=queueName%>" style="font-size: 80%;"><%= waiting %></strong>
                            </div>
                        </div>
                        
                        <div class="row py-0 my-0">
                            <div class="col m-0 text-center">
                                <small class="m-0" style="font-size: 65%;">waiting</small>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    `
);
const addQueueToHTML=async (queueName, counts)=> {
    counts.queueName=queueName;
    let html=template(counts);
    let container=document.getElementById('queues-container');
    container.innerHTML+=html;
};
const showQueues=async queueType=> {
    let container=document.getElementById('queues-container');
    container.innerHTML='';
    for await(let queueName of queues[queueType]) {
        let counts=await getCounts(queueName);
        addQueueToHTML(queueName, counts);
    }
};
const createIntervals=async ()=> {
    for await(let queueName of queues[type]) {
        let interval=setInterval(async ()=> {
            let counts=await getCounts(queueName);

            document.getElementById('active-'+queueName).innerHTML=counts.active;
            document.getElementById('completed-'+queueName).innerHTML=counts.completed;
            document.getElementById('delayed-'+queueName).innerHTML=counts.delayed;
            document.getElementById('failed-'+queueName).innerHTML=counts.failed;
            document.getElementById('paused-'+queueName).innerHTML=counts.paused;
            document.getElementById('waiting-'+queueName).innerHTML=counts.waiting;
        }, 10000);
        intervals.push(interval);
    }
};
const killIntervals=async ()=> {
    for await(let interval of intervals) {
        clearInterval(interval);
    }
};

window.addEventListener('load', main);