class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error();
        }

        this.config = config;
        this.state = config.initial;
        this.states = config.states;
        this.history = [this.state];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.states) {
            this.state = state;
            this.history.push(this.state);
        } else {
            throw new Errow("State doesn't exist");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let newState = this.states[this.state].transitions[event];

        if (newState) {
            this.state = newState;
            this.history.push(this.state);
        } else {
            throw new Error("Event in current state doesn't exist");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let statesArray = [];

        if (event) {            
            for (let state in this.states) {
                let newState = this.states[state].transitions[event];
                
                if (newState) {
                    statesArray.push(state);
                }
            }
        } else {
            for (let state in this.states) {
                statesArray.push(state);
            }
        }

        return statesArray;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length > 1) {
            this.previousState = this.history.pop();
            this.state = this.history[this.history.length - 1];
            
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.previousState) {
            this.state = this.previousState;
            this.history.push(this.state);

            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [this.config.initial];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
