import mysql from "mysql2"
import dotenv from 'dotenv';

dotenv.config();
// export const db = mysql.createConnection({
//     host: "localhost",
//     user : "root",
//     password : "jashroot",
//     database : "adminpanel",
//     connectionLimit: 10 ,
//     connectTimeout: 10000,
//     waitForConnections: true ,
//     queueLimit: 0 
// })

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DBNAME,
    connectionLimit: 10 ,
    connectTimeout: 10000,
    waitForConnections: true ,
    queueLimit: 0 
})