const sql = require("./db");

//constructor
const Student = function (student) {
    this.id = student.id;
    this.name = student.name;
    this.studentid = student.studentid;
    this.major = student.major;
};

Student.getAll = (result) => {
    sql.query("SELECT * FROM student", (err, res) => {
        if (err) {
            console.log("error on Student.getAll: " + err);
            result(null, err);
            return;
        }

        console.log("Student: ", res);
        result(null, res);
    });
};

Student.getByID = (studentID, result) => {
    sql.query(`SELECT * FROM student WHERE id = ${studentID}`, (err, res) => {
        if (err) {
            console.log("error on Student.getByID: " + err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("StudentByID: ", res);
            result(null, res[0]);
        } else {
            result({ message: "not found" }, null);
        }
    });
};

Student.create = (newStudent, result) => {
    sql.query("INSERT INTO student SET ?", newStudent, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newStudent });
    });
};

Student.update = (id, student, result) => {
    console.log(student, id);
    sql.query(
        "UPDATE student SET name = ?, studentid = ?, major = ? WHERE id = ?",
        [student.name, student.studentid, student.major, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { id: id, ...student });
        }
    );
};

Student.delete = (id, result) => {
    sql.query("DELETE FROM student WHERE id = ?", id, (err, res) => {
        result(null, res);
    });
};
module.exports = Student;
