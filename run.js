require('dotenv').config();


const alteryxUtil = require('./alteryx/util');

    
alteryxUtil.getWorkflows().then(response => console.log(response)).catch(err => console.log(err))
