const e = require('express');
const mysql = require('mysql2/promise');


async function getConnection() {
    const connection = mysql.createConnection(
        {
            host: 'db4free.net',
            user: 'albertojose00',
            password: 'albertojose00',
            database: 'dawebprueba'
        });
    return connection
}

async function registerContact(connection, name, apellidos, date, mail, password) {
    let result = connection.execute('INSERT INTO `Contactos` SET `nombre` = ?,  `apellidos` = ?,  `fecha_nacimiento` = ?, `mail` = ?, `password` = ?, `highscore`= ?', [name, apellidos, date, mail, password, 0]);
    return result
}

async function getAllContact(connection) {
    const [rows, fields] = await connection.execute('SELECT * FROM `Contactos`');
    return rows
}

async function getContactoPorEmail(connection, mail) {
    const [rows, fields] = await connection.execute('SELECT * FROM `Contactos` WHERE `mail` = ?', [mail]);
    return rows
}

async function getContactoId(connection, mail) {
    const [rows, fields] = await connection.execute('SELECT id FROM `Contactos` WHERE `mail` = ?', [mail]);
    return rows
}

async function updateHighscore(connection, mail, highscore) {
    const [rows, fields] = await connection.execute('UPDATE `Contactos` SET `highscore` = ? WHERE `mail` = ?', [highscore, mail]);
    return rows
}

async function getHighscore(connection, mail) {
    const [rows, fields] = await connection.execute('SELECT highscore FROM `Contactos` WHERE `mail` = ?', [mail]);
    return rows
}



exports.getConnection = getConnection;
exports.registerContact = registerContact;
exports.getAllContact = getAllContact;
exports.getContactoPorEmail = getContactoPorEmail;
exports.getContactoId = getContactoId;
exports.updateHighscore = updateHighscore;
exports.getHighscore = getHighscore;

