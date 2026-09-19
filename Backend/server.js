import 'dotenv/config';
import app from './src/app.js';
import ConnectDB from './src/config/database.js';
console.log("google/genai version:", require('@google/genai/package.json').version);

ConnectDB()
.then(()=> {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
