/**
 * @format
 */
const toggler = state => ({
  toggleDone: () => { state.done = (!state.done); },
});

const emailer = state => ({
  email: () => { alert(`${state.email} was notified ${state.title} was completed.`); },
});

const texter = state => ({
  text: () => { alert(`${state.recpient} was notified ${state.title} was completed.`); },
});

const getter = state => ({
  get: prop => state[prop],
});

const setter = state => ({
  set: (prop, value) => { state[prop] = value; },
});

const exporter = state => ({
  exportState: () => Object.assign({}, state),
});


function baseTodoItem(state) {
  return Object.assign({}, getter(state), setter(state), toggler(state), exporter(state));
}

export { getter, setter, toggler, emailer, texter, baseTodoItem };
