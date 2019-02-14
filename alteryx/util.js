const alteryxRequest = require('./connection');

const timeout = (s) => new Promise(resolve => setTimeout(resolve, s * 1000));


const checkJobStatus = async (jobId, intervalInSec) => {

    let jobDetail;

    do {
        console.log("request")
        let response = await Promise.all([
            alteryxRequest("GET", `jobs/${jobId}/`),
            timeout(intervalInSec)
        ])

        jobDetail = response[0];
    }
    while (jobDetail.status == 'Running');

    return (jobDetail)
};


module.exports = {

    getWorkflows: () => alteryxRequest("GET", "workflows/subscription/"),

    queueWorkflow: (appId) => alteryxRequest("POST", `workflows/${appId}/jobs/`),

    queueWorkflowAsync: (appId, intervalInSec) => {
        return alteryxRequest("POST", `workflows/${appId}/jobs/`).then(response => {
           return checkJobStatus(response.id, intervalInSec)
        })
    },

    getJob: (jobId) => alteryxRequest("GET", `jobs/${jobId}/`),

};