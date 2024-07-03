import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    password : "jashroot",
    database : "adminpanel",
    connectionLimit: 10 ,
    connectTimeout: 10000,
    waitForConnections: true ,
    queueLimit: 0 
})