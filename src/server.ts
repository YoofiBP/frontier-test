import app from "./app";
import {submitDataWithPuppet} from "./services/rpa";

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    console.log(`Server running on port: ${port}`);
    try{
        await submitDataWithPuppet();
    } catch (e) {
        console.log(e)
    }
})