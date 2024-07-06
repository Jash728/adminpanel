import mysql from "mysql"

export const db = mysql.createConnection({
    host: "viaduct.proxy.rlwy.net",
    user : "root",
    password : "yfLmboAejgnSCdIBvgpGRILwVcoRVkOD",
    database : "railway",
    connectionLimit: 10 ,
    connectTimeout: 10000,
    waitForConnections: true ,
    queueLimit: 0 
})