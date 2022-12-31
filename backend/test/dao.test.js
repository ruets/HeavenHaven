const dao = require('../model/dao');

test('DAO - Query', () => {
    dao.query("create table if not exists users (id serial primary key, name varchar(255), email varchar(255), password varchar(255))", []);
    dao.query("insert into users (id, name, email, password) values ($1, $2, $3, $4)", [1568, "John Doe", "michel@test.fr", "1234"]);
    let query = dao.query("SELECT * FROM users WHERE id = $1", [1]);

    query.then((res) => {
        let result = (res.rows[0]);
        expect(result).toStrictEqual({"email": "michel@test.fr", "id": 1, "name": "John Doe", "password": "1234"});
    });

    // close connection after 1 second
    setTimeout(() => {
        dao.end();
    }, 1000);
});
