import 'dotenv/config';
import app from './src/app.js';
import ConnectDB from './src/config/database.js';

import { readFileSync } from 'fs';

try {
    const genaiPkg = JSON.parse(readFileSync('./node_modules/@google/genai/package.json', 'utf-8'));
    console.log("google/genai version:", genaiPkg.version);
} catch (err) {
    console.log("Could not read genai version:", err.message);
}

ConnectDB()
.then(()=> {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
