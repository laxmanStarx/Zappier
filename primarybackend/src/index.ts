import express from "express"
import { useRouter } from "./router/user";
import { zapRouter } from "./router/zap";

const app = express();
import cors from 'cors'

app.use(express.json())
const PORT = 3000;
app.use(cors())


app.use('/api/v1/user', useRouter);
app.use('/api/v1/zap', zapRouter);

app.listen(3000)