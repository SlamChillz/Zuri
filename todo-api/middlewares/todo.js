const Todo = require('../controllers/todo');

exports.validateRequest = (req, res, next) => {
    try {
        const path = req.path.replace(/^\/+|\/+$/g, '').split('/');
        if (path[0] == 'todos') {
            if (path.length == 1) {
                if (req.method.toLowerCase() != 'get') {
                    Todo.createError("Allowed method: GET", 405);
                }
            } else {
                Todo.createError("Path not found", 404);
            }
        } else if (path[0] == 'todo') {
            if (path[1] == 'create') {
                if (path.length == 2) {
                    if (req.method.toLowerCase() != "post") {
                        Todo.createError("Allowed method: POST", 405);
                    }
                } else {
                    Todo.createError("Path not found", 404);
                }
            } else if (path[1] == 'update') {
                if (path.length < 3) {
                    Todo.createError(
                        "Missing id parameter for this request",
                        400
                    )
                } else if (path.length == 3) {
                    if (req.method.toLowerCase() != "put") {
                        Todo.createError("Allowed method: PUT", 405);
                    }
                } else {
                    Todo.createError("Path not found", 404);
                }
            } else if (path[1] == 'delete') {
                if (path.length < 3) {
                    Todo.createError(
                        "Missing id parameter for this request",
                        400
                    );
                } else if (path.length == 3) {
                    if (req.method.toLowerCase() != "delete") {
                        Todo.createError("Allowed method: DELETE", 405);
                    }
                } else {
                    Todo.createError("Path not found", 404);
                }
            } else {
                return next();
            }
        }
        next();
    } catch (error) {
        next(error);
    }
}