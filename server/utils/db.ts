import mysql from 'mysql2/promise';
export const createConnection = async () => {
    return mysql.createPool({
        host: 'localhost',
        user: 'erps_u982896924_vue',
        password: '7Slaos@123456789',
        database: 'erps_u982896924_vue',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    // return mysql.createPool({
    //     host: 'localhost',
    //     user: 'root',
    //     password: '',
    //     database: 'nuxt-app',
    //     waitForConnections: true,
    //     connectionLimit: 10,
    //     queueLimit: 0
    // });
};
