/**
 * index.js 
 * 
 * init express mod ... contains all express init. 
 * required dependencies: 
 *  @requires express server. 
 *  @requires bodyParser for message parsing. 
 *  @requires cors Cross-Origin Resource Sharing. permissions for different servers. 
 *  @requires feedbackRoutes feedback models and routes ... 
 * 
 */

const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors');
const feedbackRoutes = require('./feedback');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/feedback', feedbackRoutes); // API route for feedback

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

