import mysql from "mysql"

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