import chai, { assert } from 'chai'
chai.use(require('chai-shallow-deep-equal'))
import {
	each,
	map,
	reduce,
	reduceRight,
	find,
} from '../mark'

describe('collection tests', () => {
	const eachFnForArray = array => {
		let iterationCount = 0
		each(array, item => iterationCount++)
		assert.equal(iterationCount, array.length)
	}

	const eachFnForObject = obj => {
		let iterationCount = 0
		each(obj, item => iterationCount++)
		assert.equal(iterationCount, Object.keys(obj).length)
	}

	it('each: number array', () => eachFnForArray(
		[1, 2, 3, 4, 5]
	))

	it('each: object array', () => eachFnForArray(
		[
			{ a: 'a' },
			{ b: 'b' },
			{ c: 'c' },
			{ d: 'd' },
			{ e: 'e' },
		]
	))

	it('each: object', () => eachFnForObject(
		{
			a: 'a',
			b: 'b',
			c: {
				d: 'd',
				e: 'e',
			}
		}
	))

	it('each: empty array', () => eachFnForArray(
		[]
	))

	it('each: empty object', () => eachFnForObject(
		{}
	))

	it('each: null object arg', () =>
		assert.equal(each(null, undefined))
	)

	it('each: undefined arg', () =>
		assert.equal(each(undefined, undefined))
	)

	it('map: check for new array', () => {
		const array = [1, 2, 3, 4, 5]
		const expected = map(array, i => i)
		assert.equal(array === expected, false)
	})

	it('map: number array', () => {
		const array = [1, 2, 3, 4, 5]
		const squaredArray = [1, 4, 9, 16, 25]
		assert.shallowDeepEqual(squaredArray, map(array, i => i * i))
	})

	it('map: object', () => {
		const object = {
			a: 1,
			b: 2,
			c: 3,
			d: { e: 4 },
		}
		const expected = [1, 2, 3, { e: 4}]
		assert.shallowDeepEqual(expected, map(object, i => i))
	})

	it('map: null array', () =>
		assert(map(null) === undefined, true)
	)

	it('map: empty object', () =>
		assert(map({}) === undefined, true)
	)

	it('map: undefined arg', () =>
		assert(map(undefined) === undefined, true)
	)

	it('reduce: simple array', () => {
		const expected = 12
		assert(reduce([1, 2, 3], (memo, num) => memo * num, 2), expected)
	})

	it('reduce: object', () => {
		const expected = 12
		assert(reduce({
			a: 1,
			b: 2,
			c: 3,
		}, (memo, num) => memo * num, 2))
	})

	it('reduce: null arg', () =>
		assert(reduce(null, null, 2), 2)
	)

	it('reduce: undefined arg', () =>
		assert(reduce(undefined, undefined, 2), 2)
	)

	it('reduce: empty array', () =>
		assert(reduce([], (memo, num) => num, 2), 2)
	)

	it('reduce: empty object', () =>
		assert(reduce({}, (memo, num) => num, 2), 2)
	)

	it('reduceRight: reverse flat array', () => {
		const expected = [6, 7, 4, 5, 2, 3]
		const array = [[2, 3], [4, 5], [6, 7]]
		assert(
			reduceRight(array, (memo, array) => memo.concat(array), []),
			expected
		)
	})

	it('reduceRight: simple array', () => {
		const expected = 12
		assert(reduceRight([1, 2, 3], (memo, num) => memo * num, 2), expected)
	})

	it('reduceRight: object', () => {
		const expected = 12
		assert(reduceRight({
			a: 1,
			b: 2,
			c: 3,
		}, (memo, num) => memo * num, 2))
	})

	it('reduceRight: null arg', () =>
		assert(reduceRight(null, null, 2), 2)
	)

	it('reduceRight: undefined arg', () =>
		assert(reduceRight(undefined, undefined, 2), 2)
	)

	it('reduceRight: empty array', () =>
		assert(reduceRight([], (memo, num) => num, 2), 2)
	)

	it('reduceRight: empty object', () =>
		assert(reduceRight({}, (memo, num) => num, 2), 2)
	)

	it('find: array', () =>
		assert(find([1, 4, 5, 6, 7], i => i % 2 === 0), 4)
	)

	it('find: object', () =>
		assert(find({
			a: 1,
			b: 8,
			c: 6,
			d: {
				e: 10,
				f: 12,
			},
		}, i => i % 2 === 0), 8)
	)

	it('find: empty', () => {
		assert(find() === undefined, true)
	})

	it('find: null arg', () => {
		assert(find(null) === undefined, true)
	})

	it('find: empty array', () => {
		assert(find([]) === undefined, true)
	})

	it('find: empty object', () => {
		assert(find({}) === undefined, true)
	})
})
