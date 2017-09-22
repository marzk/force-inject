import test from 'ava';
import inject from '../';

const context = {
  state: {
    a: 1,
  },
  api() {
    return 'api';
  },
};

test('function', t => {
  const func = inject(function(state) {
    return state.a;
  })(context);

  t.is(func(), 1);
});

test('generator', t => {
  const func = inject(function*(state) {
    yield state.a;
  })(context);

  const gen = func();

  t.is(gen.next().value, 1);
});

test('async function', async function(t) {
  const func = inject(async function(state, api) {
    return api() + state.a;
  })(context);

  const value = await func();
  t.is(value, 'api1');
});

test('arrow function', t => {
  const func = inject(state => state.a)(context);

  t.is(func(), 1);
});

test('arrow function with default value', t => {
  const func = inject((state = { a: 2 }) => state.a)(context);

  t.is(func(), 1);

  t.is(func({ a: 0 }), 0);
});

test('arrow function with rest spread(but useless)', t => {
  const func = inject((state, ...rest) => state.a)(context);

  t.is(func(), 1);
});

test('arrow function with destruct', t => {
  const func = inject(({ a = 1 } = {}, state) => a + state.a)(context);

  t.is(func(), 2);

  t.is(func({ a: 3 }), 4);
  t.is(func({ a: 3 }, { a: 4 }), 7);
});
