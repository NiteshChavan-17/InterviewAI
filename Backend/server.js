import 'dotenv/config';
import app from './src/app.js';
import ConnectDB from './src/config/database.js';

ConnectDB()
.then(()=> {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
