import { assert } from 'chai';
import { init } from '../../package/init';
import { h } from '../../package/h';
import { attributesModule } from '../../package/modules/attributes';
var patch = init([
    attributesModule
]);
describe('svg', function () {
    var elm, vnode0;
    beforeEach(function () {
        elm = document.createElement('svg');
        vnode0 = elm;
    });
    it('removes child svg elements', function () {
        var a = h('svg', {}, [
            h('g'),
            h('g')
        ]);
        var b = h('svg', {}, [
            h('g')
        ]);
        var result = patch(patch(vnode0, a), b).elm;
        assert.strictEqual(result.childNodes.length, 1);
    });
    it('adds correctly xlink namespaced attribute', function () {
        var xlinkNS = 'http://www.w3.org/1999/xlink';
        var testUrl = '/test';
        var a = h('svg', {}, [
            h('use', {
                attrs: { 'xlink:href': testUrl }
            }, [])
        ]);
        var result = patch(vnode0, a).elm;
        assert.strictEqual(result.childNodes.length, 1);
        const child = result.childNodes[0];
        assert.strictEqual(child.getAttribute('xlink:href'), testUrl);
        assert.strictEqual(child.getAttributeNS(xlinkNS, 'href'), testUrl);
    });
    it('adds correctly xml namespaced attribute', function () {
        var xmlNS = 'http://www.w3.org/XML/1998/namespace';
        var testAttrValue = 'und';
        var a = h('svg', { attrs: { 'xml:lang': testAttrValue } }, []);
        var result = patch(vnode0, a).elm;
        assert.strictEqual(result.getAttributeNS(xmlNS, 'lang'), testAttrValue);
        assert.strictEqual(result.getAttribute('xml:lang'), testAttrValue);
    });
});
//# sourceMappingURL=htmldomapi.js.map