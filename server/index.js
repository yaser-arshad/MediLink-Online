import express from 'express';
import session from 'express-session';
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
connectDB();


const port = 5000;

const app =express();
app.use(
    cors({
      origin: "http://localhost:3000", 
      credentials: true,
    })
  );
/**
 * Session will expire after 7 days.
 */
app.use(
    session({
      secret: "mysecret",
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    })
  );

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/',(req,res)=>res.send("Server is ready"));
app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`Server Started on port ${port}`));