import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import routes from "./routes/index.js";
import auth from "./auth/authController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors(
  {
    origin : 'http://localhost:3000',
    credentials : true,
  }
));

// Routes
app.use('/', routes); 
app.use('/api/auth', auth); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});