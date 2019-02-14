require('dotenv').config();


const alteryxUtil = require('./alteryx/util');

alteryxUtil.queueWorkflowAsync("5c64beda2fc61232e0817bd6", 1).then(response => {
    console.log(response);
});

