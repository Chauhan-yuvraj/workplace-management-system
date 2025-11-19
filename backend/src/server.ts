import app from "./app";
import { connectDB } from "./config/db";

const PORT = 3000;
const HOST = '0.0.0.0';

connectDB();

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
    console.log(`Accessible from mobile client via http://192.168.56.1:${PORT}`);
});
