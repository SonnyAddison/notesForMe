const express = require('express');


const app = express();
const PORT = process.env.PORT || 3001;


// Middleware.
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes.

require('./routers/api')(app);
require('./routers/html')(app);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
