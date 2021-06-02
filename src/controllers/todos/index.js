import pool from "../config";

const todosList = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM todos ORDER BY id`);
    res.render("todos", {
      favorite: "Eta",
      name: "Hendi",
      todos: rows,
      user: req.session.email,
      role: req.session.role,
    });
  } catch (err) {
    console.log(err);
  }
};

const todosViewCreate = (req, res) => {
  res.render("todos/create", {
    name: "Hendi",
    user: req.session.email,
    role: req.session.role,
  });
};

const todosActionCreate = async (req, res) => {
  try {
    const payload = {
      activity: "",
      status: "",
    };
    if (!req.body.status) {
      payload.activity = req.body.activity;
      payload.status = false;
    } else {
      payload.activity = req.body.activity;
      payload.status = true;
    }
    //validate
    if (payload.activity.length > 20) {
      res.render("todos/create", {
        err: 0,
        msg: `Activity field can't more than 20 character`,
        name: "Hendi",
      });
    } else if (payload.activity === "") {
      res.render("todos/create", {
        err: 1,
        msg: `Activity field must be filled`,
        name: "Hendi",
      });
    } else {
      const query = {
        text: `INSERT INTO todos(activity, status) VALUES($1, $2)`,
        values: [payload.activity, payload.status],
      };
      await pool.query(query);
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
};

const todosViewUpdate = async (req, res) => {
  try {
    const query = {
      text: `SELECT * FROM todos WHERE id = $1`,
      values: [req.params.id],
    };
    const { rows } = await pool.query(query);
    res.render("todos/update", {
      name: "Hendi",
      todo: rows[0],
      user: req.session.email,
      role: req.session.role,
    });
  } catch (err) {
    console.log(err);
  }
};

const todosActionUpdate = async (req, res) => {
  try {
    const payload = {
      activity: "",
      status: "",
    };
    if (!req.body.status) {
      payload.activity = req.body.activity;
      payload.status = false;
    } else {
      payload.activity = req.body.activity;
      payload.status = true;
    }
    const query = {
      text: `UPDATE todos SET activity = $1, status = $2 WHERE id = $3`,
      values: [payload.activity, payload.status, req.params.id],
    };
    await pool.query(query);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const todosDestroy = async (req, res) => {
  try {
    const query = {
      text: `DELETE FROM todos WHERE id = $1`,
      values: [req.params.id],
    };
    await pool.query(query);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

export {
  todosList,
  todosViewCreate,
  todosActionCreate,
  todosViewUpdate,
  todosActionUpdate,
  todosDestroy,
};
