const sql = require("../dataAccess/db");

class Show {
    constructor(show) {
        this.name = show.name;
        this.score = show.score;
    }
    static getAll(result) {
        sql.query("SELECT * FROM shows", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("shows: ", res);
            result(null, res);
        });
    }
    static create(newShow, result) {
        sql.query("INSERT INTO shows SET ?", newShow, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created show: ", { id: res.insertId, ...newShow });
            result(null, { id: res.insertId, ...newShow });
        });
    }
    static update(name, show, result) {
        sql.query(
            "UPDATE shows SET name = ?, score = ? WHERE name = ?",
            [show.name, show.score, name],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found Customer with the name
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated show: ", { name: name, ...show });
                result(null, { name: name, ...show });
            }
        );
    }
    static remove(name, result) {
        sql.query("DELETE FROM shows WHERE name = ?", name, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the name
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted show with name: ", name);
            result(null, res);
        });
    }
}





module.exports = Show;