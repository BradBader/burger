var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?")
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    all: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";;
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    update: function(table, objColVals, id, cb) {
        console.log(objColVals)
        if (objColVals.devour === "true") {
            var term = 1;
        } else {
            var term = 0;
        }

        queryString = "UPDATE burgers SET devoured = " + term + " WHERE id = " + id;  
        console.log(queryString)
        // var queryString = "UPDATE " + table;

        // queryString += " SET ";
        // queryString += " devour ";
        // queryString += " WHERE ";
        // queryString += condition;

        // console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);

        });

    },
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM burgers WHERE ";
        queryString += condition;

        connection.query(queryString , function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

module.exports = orm;
