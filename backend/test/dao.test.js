const dao = require('../model/dao');

test('DAO - Query', () => {
    dao.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255));", []);
    
    dao.query("INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4);", [1, "John Doe", "michel@test.fr", "1234"]);

    dao.query("SELECT * FROM users WHERE id = $1;", [1])
        .then((res) => {
            let query = (res.rows[0]);
            expect(query).toStrictEqual({"email": "michel@test.fr", "id": 1, "name": "John Doe", "password": "1234"});
        });

    // close connection after 1 second
    setTimeout(() => {
        dao.end();
    }, 1000);
});
