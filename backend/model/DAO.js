const { Client } = require('pg');
const db = require('../config/db');

class DAO {
    #dao = null;
    constructor() {
        if (this.#dao == null) {
            this.#dao = new Client(db.client);
            console.log("DAO created");

            this.#dao.connect((err) => {
                if (err) {
                    console.error('Connection error', err.stack)
                    this.#dao = null;
                }
            });

            return this.#dao;
        } else {
            console.error("DAO already exists");
            return this.#dao;
        }
    }

    // get() {
        // new DAO();
    // }

    // destroy() {
        // this.#dao.end();
        // this.#dao = null;
    // }

    // async query(query, params) {
        // return await this.#dao.query(query, params)
        // .catch((e) => { console.error(e.stack) });
    // }

}

module.exports = new DAO();