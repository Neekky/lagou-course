import { assert } from 'chai';
// workaround linter issue
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from '../../package/jsx';
import '../../package/jsx-global';
describe('snabbdom', function () {
    describe('jsx', function () {
        it('can be used as a jsxFactory method', function () {
            const vnode = jsx("div", { title: "Hello World" }, "Hello World");
            assert.deepStrictEqual(vnode, {
                sel: 'div',
                data: { title: 'Hello World' },
                children: undefined,
                elm: undefined,
                text: 'Hello World',
                key: undefined
            });
        });
        it('creates text property for text only child', function () {
            const vnode = jsx("div", null, "foo bar");
            assert.deepStrictEqual(vnode, {
                sel: 'div',
                data: {},
                children: undefined,
                elm: undefined,
                text: 'foo bar',
                key: undefined
            });
        });
        it('creates an array of children for multiple children', function () {
            const vnode = jsx("div", null,
                'foo',
                'bar');
            assert.deepStrictEqual(vnode, {
                sel: 'div',
                data: {},
                children: [
                    {
                        sel: undefined,
                        data: undefined,
                        children: undefined,
                        elm: undefined,
                        text: 'foo',
                        key: undefined
                    },
                    {
                        sel: undefined,
                        data: undefined,
                        children: undefined,
                        elm: undefined,
                        text: 'bar',
                        key: undefined
                    },
                ],
                elm: undefined,
                text: undefined,
                key: undefined
            });
        });
        it('flattens children', function () {
            const vnode = (jsx("section", null,
                jsx("h1", null, "A Heading"),
                "some description",
                ['part1', 'part2'].map(part => jsx("span", null, part))));
            assert.deepStrictEqual(vnode, {
                sel: 'section',
                data: {},
                children: [
                    {
                        sel: 'h1',
                        data: {},
                        children: undefined,
                        elm: undefined,
                        text: 'A Heading',
                        key: undefined
                    },
                    {
                        sel: undefined,
                        data: undefined,
                        children: undefined,
                        elm: undefined,
                        text: 'some description',
                        key: undefined
                    },
                    {
                        sel: 'span',
                        data: {},
                        children: undefined,
                        elm: undefined,
                        text: 'part1',
                        key: undefined
                    },
                    {
                        sel: 'span',
                        data: {},
                        children: undefined,
                        elm: undefined,
                        text: 'part2',
                        key: undefined
                    },
                ],
                elm: undefined,
                text: undefined,
                key: undefined
            });
        });
        it('removes falsey children', function () {
            const showLogin = false;
            const showCaptcha = false;
            const loginAttempts = 0;
            const userName = '';
            const profilePic = undefined;
            const isLoggedIn = true;
            const vnode = (jsx("div", null,
                "Login Form",
                showLogin && jsx("login-form", null),
                showCaptcha ? jsx("captcha-form", null) : null,
                userName,
                profilePic,
                "Login Attempts: ",
                loginAttempts,
                "Logged In: ",
                isLoggedIn));
            assert.deepStrictEqual(vnode, {
                sel: 'div',
                data: {},
                children: [
                    {
                        sel: undefined,
                        data: undefined,
                        children: undefined,
                        elm: undefined,
                        text: 'Login Form',
                        key: undefined
                    },
                    {
                        sel: undefined,
                        data: undefined,
                        children: undefined,
                        elm: undefined,
                        text: 'Login Attempts: ',
                        key: undefined
                    },
                    {
                        sel: undefined,
                        data: undefined,
                        children: undefined,
                        elm: undefined,
                        text: '0',
                        key: undefined
                    },
                    {
                        sel: undefined,
                        data: undefined,
                        children: undefined,
                        elm: undefined,
                        text: 'Logged In: ',
                        key: undefined
                    },
                    {
                        sel: undefined,
                        data: undefined,
                        children: undefined,
                        elm: undefined,
                        text: 'true',
                        key: undefined
                    },
                ],
                elm: undefined,
                text: undefined,
                key: undefined
            });
        });
        it('works with a function component', function () {
            // workaround linter issue
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const Part = ({ part }) => jsx("span", null, part);
            const vnode = (jsx("div", null,
                jsx("a", { attrs: { href: 'https://github.com/snabbdom/snabbdom' } }, "Snabbdom"),
                "and tsx",
                ['work', 'like', 'a', 'charm!'].map(part => jsx(Part, { part: part })),
                '💃🕺🎉'));
            assert.deepStrictEqual(vnode, {
                sel: 'div',
                data: {},
                children: [
                    {
                        sel: 'a',
                        data: { attrs: { href: 'https://github.com/snabbdom/snabbdom' } },
                        children: undefined,
                        elm: undefined,
                        text: 'Snabbdom',
                        key: undefined
                    },
                    {
                        sel: undefined,
                        data: undefined,
                        children: undefined,
                        elm: undefined,
                        text: 'and tsx',
                        key: undefined
                    },
                    {
                        sel: 'span',
                        data: {},
                        children: undefined,
                        elm: undefined,
                        text: 'work',
                        key: undefined
                    },
                    {
                        sel: 'span',
                        data: {},
                        children: undefined,
                        elm: undefined,
                        text: 'like',
                        key: undefined
                    },
                    {
                        sel: 'span',
                        data: {},
                        children: undefined,
                        elm: undefined,
                        text: 'a',
                        key: undefined
                    },
                    {
                        sel: 'span',
                        data: {},
                        children: undefined,
                        elm: undefined,
                        text: 'charm!',
                        key: undefined
                    },
                    {
                        sel: undefined,
                        data: undefined,
                        children: undefined,
                        elm: undefined,
                        text: '💃🕺🎉',
                        key: undefined
                    },
                ],
                elm: undefined,
                text: undefined,
                key: undefined
            });
        });
    });
});
//# sourceMappingURL=jsx.js.map