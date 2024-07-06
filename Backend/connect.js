import mysql from "mysql"

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
    host: "bidtvtg5r4lv0mrhzcvu-mysql.services.clever-cloud.com",
    user : "ujiadq6a3dtfngxu",
    password : "1WVmSQKpig3RNBeT0QFp",
    database : "bidtvtg5r4lv0mrhzcvu",
    connectionLimit: 10 ,
    connectTimeout: 10000,
    waitForConnections: true ,
    queueLimit: 0 
})