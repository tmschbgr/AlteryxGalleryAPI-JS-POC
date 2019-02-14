require('dotenv').config();


const alteryxUtil = require('./alteryx/util');

// alteryxUtil.getWorkflowQuestions("5c64beda2fc61232e0817bd6", [{name:"Text Box (2)",value:5},{name:"Text Box (3)",value:98}]).then(response => {
//     console.log(response);
// });

alteryxUtil.queueWorkflowAsync("5c64beda2fc61232e0817bd6", [{ name: "Text Box (2)", value: 5 }, { name: "Text Box (3)", value: 98 }], 1).then(response => {
    console.log(response);
});

