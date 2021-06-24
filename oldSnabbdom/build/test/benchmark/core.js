var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'core-js/stable/array/fill';
import faker from 'faker';
import { h } from '../../package/h';
import { init as curInit } from '../../package/init';
import { init as refInit } from 'latest-snabbdom-release/init';
import { assert } from 'chai';
import pReduce from 'p-reduce';
import pMapSeries from 'p-map-series';
import { std, mean } from 'mathjs';
const RUNS = 5;
const PATCHES_PER_RUN = 100;
const WARM_UP_RUNS = 1;
const REQUEST_ANIMATION_FRAME_EVERY_N_PATCHES = 1;
const BENCHMARK_TIMEOUT_MINUTES = 10;
const REQUIRED_PRECISION = 0.02;
/* eslint-enable @typescript-eslint/no-unused-vars */
const ALLOWED_REGRESSION = 0.03;
describe('core benchmark', () => {
    it('does not regress', function Benchmark() {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(BENCHMARK_TIMEOUT_MINUTES * 1000 * 60);
            faker.seed(0);
            const inputs = Array(PATCHES_PER_RUN).fill(null).map(() => {
                return new Array(faker.random.number(20))
                    .fill(null)
                    .map(() => ({
                    name: faker.company.companyName(),
                    catchPhrase: faker.company.catchPhrase(),
                    suffix: faker.company.companySuffix(),
                    products: Array(faker.random.number(3))
                        .fill(null)
                        .map(() => ({
                        name: faker.commerce.productName(),
                        color: faker.commerce.color(),
                        price: faker.commerce.price() + faker.finance.currencySymbol(),
                    })),
                    founded: faker.date.past()
                }));
            });
            const view = (companies) => h('table', [
                h('caption', ['Companies']),
                h('thead', [
                    h('tr', [
                        'Details',
                        'Products',
                    ].map((th) => h('th', [th])))
                ]),
                h('tbody', companies.map(function companyView(company) {
                    return h('tr', [
                        h('td', [
                            h('div', [
                                h('b', [company.name]),
                                company.suffix && `\xa0${company.suffix}`
                            ]),
                            h('div', h('i', [company.catchPhrase])),
                            h('td', [
                                h('dt', ['Founded']),
                                h('dd', [company.founded.toLocaleDateString()])
                            ])
                        ]),
                        h('td', [h('ul', company.products.map(function productView(product) {
                                return h('li', [h('dl', [
                                        h('dt', ['Name']),
                                        h('dd', [product.name]),
                                        h('dt', ['Color']),
                                        h('dd', [product.color]),
                                        h('dt', ['Price']),
                                        h('dd', [product.price]),
                                    ])]);
                            }))])
                    ]);
                }))
            ]);
            const subjectToResult = (subject, subjectId) => __awaiter(this, void 0, void 0, function* () {
                yield new Promise((resolve) => {
                    requestAnimationFrame(resolve);
                });
                const markName = `mark:${subjectId}`;
                const measureName = `measure:${subjectId}`;
                performance.mark(markName);
                const lastVnode = yield pReduce(inputs, function subjectToResultReducer(acc, input, i) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const vnode = view(input);
                        // @ts-expect-error
                        subject(acc, vnode);
                        if (i % REQUEST_ANIMATION_FRAME_EVERY_N_PATCHES === 0) {
                            yield new Promise((resolve) => {
                                requestAnimationFrame(resolve);
                            });
                        }
                        return vnode;
                    });
                }, document.body.appendChild(document.createElement('section')));
                performance.measure(measureName, markName);
                if (!('elm' in lastVnode))
                    throw new Error();
                if (!lastVnode.elm)
                    throw new Error();
                document.body.removeChild(lastVnode.elm);
                const measure = performance.getEntriesByName(measureName)[0];
                performance.clearMarks(markName);
                performance.clearMeasures(measureName);
                return measure.duration;
            });
            const singleRun = (_, runI) => __awaiter(this, void 0, void 0, function* () {
                const cur = yield subjectToResult(curInit([]), `cur:${runI}`);
                const ref = yield subjectToResult(refInit([]), `ref:${runI}`);
                return { i: runI, cur, ref };
            });
            const runResults = (yield pMapSeries(Array(RUNS + WARM_UP_RUNS).fill(null), singleRun))
                .slice(WARM_UP_RUNS);
            __karma__.info({ benchmark: runResults });
            const results = {
                ref: runResults.map((result) => result.ref),
                cur: runResults.map((result) => result.cur),
            };
            const means = {
                ref: mean(results.ref),
                cur: mean(results.cur),
            };
            const stds = {
                ref: std(results.ref, 'uncorrected'),
                cur: std(results.cur, 'uncorrected'),
            };
            ['ref', 'cur'].forEach((subject) => {
                const stdRatio = stds[subject] / means[subject];
                assert.isAtMost(stdRatio, REQUIRED_PRECISION, `${subject} not precise enough`);
            });
            assert.isAtMost(means.cur, means.ref * (1 + ALLOWED_REGRESSION));
        });
    });
});
//# sourceMappingURL=core.js.map