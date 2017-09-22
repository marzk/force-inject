const getArgList = require('./get-arg-list');

// func => context => func
const inject = func => {
  const argList = getArgList(func);

  return context => (...args) => {
    if (args.length > argList.length) return func(...args);

    const leftArgList = argList.slice(args.length);

    const leftArgs = leftArgList.map(arg => {
      return context[arg];
    });

    return func(...args.concat(leftArgs));
  };
};

module.exports = inject['default'] = inject;
