"use strict";

const toggler = (state) => ({
	toggleDone: () => state.done = (state.done ? false : true)
})

const emailer = (state) => ({
	email: () => alert(state.email + ' was notified ' + state.title + ' was completed.')
})

const texter = (state) => ({
	text: () => alert(state.recpient + ' was notified ' + state.title + ' was completed.')
})

const adder = (state) => ({
	add: (item) => state.tasks.push(item)
})

const deleter = (state) => ({
	remove: (index) => state.tasks.splice(index, 1)
})

const getter = (state) => ({
	get: (prop) => { return state[prop] }
})

const setter = (state) => ({
	set: (prop, value) => state[prop] = value
})


function baseTodoItem(state) {
	return Object.assign({}, getter(state), setter(state), toggler(state), state);
}

function baseProject(state) {
	return Object.assign({}, baseTodoItem(state), adder(state), deleter(state));
}

export {getters, setters, toggler, emailer, texter, baseTodoItem, baseProject};
