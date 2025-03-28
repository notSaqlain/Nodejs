class ToDo {
    constructor(id, name, description, isCompleted) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._isCompleted = isCompleted;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get isCompleted() {
        return this._isCompleted;
    }

    set name(newName) {
        this._name = newName;
    }

    set id(newId) {
        this._id = newId;
    }

    set description(newDescription) {
        this._description = newDescription;
    }

    set isCompleted(newIsCompleted) {
        this._isCompleted = newIsCompleted;
    }
}

module.exports = ToDo;