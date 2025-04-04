class ToDo {
    #id;
    #name;
    #description;
    #isCompleted;

    constructor(id, name, description, isCompleted) {
        this.#id = id;
        this.#name = name;
        this.#description = description;
        this.#isCompleted = isCompleted;
    }

    get name() {
        return this.#name;
    }

    get id() {
        return this.#id;
    }

    get description() {
        return this.#description;
    }

    get isCompleted() {
        return this.#isCompleted;
    }

    set name(newName) {
        this.#name = newName;
    }

    set id(newId) {
        this.#id = newId;
    }

    set description(newDescription) {
        this.#description = newDescription;
    }

    set isCompleted(newIsCompleted) {
        this.#isCompleted = newIsCompleted;
    }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            isCompleted: this.#isCompleted
        };
    }
}

module.exports = ToDo;