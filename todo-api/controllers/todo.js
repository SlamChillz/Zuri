const Todos = require('../models/todo');
const { v4: uuid } = require('uuid');

class Todo {
    /**
     * Create a todo
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {JSON}
     */
    static async create(req, res, next) {
        try {
            const { title, description } = req.body;
            if (title.length == 0 || description.length == 0) {
                Todo.createError("Title and description must be provided", 400);
            }
            const newTodo = new Todos({ _id: uuid(), title, description });
            const todo = await newTodo.save();
            todo
                ? res.status(201).send({ status: "New todo created", todo })
                : Todo.createError(
                      "Unable to process request, try again later",
                      500
                  );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update a todo item
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {JSON}
     */
    static async update(req, res, next) {
        try {
            let { id } = req.params;
            id = await Todo.find(id.trim());
            id
                ? (id = req.params.id)
                : Todo.createError("id does not exist", 404);
            const { title, description } = req.body;
            if (title == "" && description == "") {
                Todo.createError("Empty update payload", 400);
            }
            let todoUpdate = {};
            title.length > 0
                    ? (todoUpdate["title"] = title.trim())
                    : todoUpdate;
            description.length > 0
                    ? (todoUpdate["description"] = description.trim())
                    : todoUpdate;
            console.log(todoUpdate);
            let update = await Todos.updateOne(
                { _id: id },
                {
                    $set: { ...todoUpdate },
                }
            );
            update.modifiedCount == 1
                ? res.status(200).send({ status: "Todo updated successfully" })
                : Todo.createError(
                      "Unable to process request, try again later",
                      500
                  );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete a todo
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {JSON}
     */
    static async delete(req, res, next) {
        try {
            let { id } = req.params;
            id = await Todo.find(id.trim());
            id
                ? (id = req.params.id)
                : Todo.createError("id does not exist", 404);
            const deleted = await Todos.deleteOne({ _id: id }, { new: true });
            deleted.deletedCount == 1
                ? res.status(200).send({ status: "Todo deleted successfully" })
                : Todo.createError(
                      "Unable to process request, try again later",
                      500
                  );
        } catch (error) {
            next(error);
        }
    }

    /**
     * List all todos
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {JSON}
     */
    static async all(req, res, next) {
        try {
            const todos = await Todos.find({});
            res.status(200).send(todos);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @param {id} id of request to validate
     * @returns {Boolean} true if id is found else false
     */
    static async find(id) {
        if (id.length == 0) {
            Todo.createError("Incomplete request, missing id", 400);
        }
        try {
            const todo = await Todos.findById({ _id: id });
            return todo ? true : false;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * @param {msg} error message to send to the errorhandler
     * @param {code} status code error
     */
    static createError(msg, code) {
        const error = new Error(msg);
        error.status = code;
        throw error;
    }
}

module.exports = Todo;