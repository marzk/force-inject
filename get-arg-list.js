module.exports = function getArgList(func) {
  let left = 0;
  let i = 0;
  let stack = [];
  let isInComment = false;

  const funcStr = func.toString();

  while (true) {
    const char = funcStr.charAt(left);
    if (char === '(') {
      break;
    } else if (char === '=' && funcStr.charAt(left + 1) === '>') {
      // handle single arg arrow function x => x
      return [handleArg(funcStr)];
    } else {
      left++;
    }
  }

  let right = left + 1;

  while (true) {
    const char = funcStr.charAt(right);

    if (char === '(') {
      stack.push(null);
    } else if (char === ')') {
      if (stack.length === 0) {
        break;
      }
      stack.pop(null);
    }

    right++;
  }

  const args = funcStr.slice(left + 1, right);

  left = 0;
  right = 0;
  const argList = [];

  while (true) {
    if (right > args.length - 1) {
      argList.push(handleArg(args.slice(left, right)));
      break;
    }
    const char = args.charAt(right);

    if (char === ',' && stack.length === 0) {
      argList.push(handleArg(args.slice(left, right)));
      left = right + 1;
    } else if (char === '(' || char === '{') {
      stack.push(null);
    } else if (char === ')' || char === '}') {
      stack.pop(null);
    }

    right++;
  }

  argList;

  return argList;
};

function handleArg(arg) {
  return /\w+/.exec(arg)[0] || null;
}
