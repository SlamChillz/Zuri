const express = require('express');
const TodoRouter = express.Router();
const { validateRequest } = require('../middlewares/todo');
const Todo = require('../controllers/todo');

/* Middleware to validate requests path and methods */
TodoRouter.use(validateRequest);

TodoRouter.get('/todos', Todo.all);
TodoRouter.post('/todo/create', Todo.create);
TodoRouter.put('/todo/update/:id', Todo.update);
TodoRouter.delete('/todo/delete/:id', Todo.delete);

/* Error handlers */

/* Endpoint not found */
TodoRouter.use(async (req, res, next) => {
    const error = new Error("Resource not found");
    error.status = 404;
    next(error);
});

/* Handles display of error messages */
TodoRouter.use(async (err, req, res, next) => {
    res.status(err.status || 500)
        .send({
            error: {
                status: err.status || 500,
                message: err.message || "Server Error..."
            }
        });
    if (!err.status) { next(err) };
});

module.exports = TodoRouter;