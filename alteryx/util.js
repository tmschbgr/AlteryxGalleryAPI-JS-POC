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

    getWorkflowQuestions: (appId) => alteryxRequest("GET", `workflows/${appId}/questions/`),

    queueWorkflow: (appId, questions = []) => alteryxRequest("POST", `workflows/${appId}/jobs/`, { questions }),

    queueWorkflowAsync: (appId, questions = [], intervalInSec) =>
        alteryxRequest("POST", `workflows/${appId}/jobs/`, { questions })
            .then(response =>
                checkJobStatus(response.id, intervalInSec))
            .catch(err => err)
    ,

    getJob: (jobId) => alteryxRequest("GET", `jobs/${jobId}/`),

};