export const each = (obj, iteratee) => {
	if (!iteratee || !obj)
		return
	if (Array.isArray(obj)) {
		const length = obj.length
		for (let index = 0; index < length; index++)
			iteratee(obj[index], index)
		return
	}

	Object.keys(obj).forEach(iteratee)
}

export const map = (obj, iteratee) => {
	if (!iteratee || !obj)
		return
	const array = []
	if (Array.isArray(obj)) {
		const length = obj.length
		for (let index = 0; index < length; index++)
			array.push(iteratee(obj[index], index))
		return array
	}
	const objArray = Object.keys(obj)
	const length = objArray.length
	for (let index = 0; index < length; index++)
		array.push(iteratee(obj[objArray[index]], index))
	return array
}

export const reduce = (obj, iteratee, memo) => {
	if (!iteratee || !obj)
		return memo
	if (Array.isArray(obj)) {
		const length = obj.length
		for (let index = 0; index < length; index++)
			memo = iteratee(memo, obj[index])
		return memo
	}
	const objArray = Object.keys(obj)
	const length = objArray.length
	for (let index = 0; index < length; index++)
		memo = iteratee(memo, obj[objArray[index]])
	return memo
}

export const reduceRight = (obj, iteratee, memo) => {
	if (!iteratee || !obj)
		return memo
	if (Array.isArray(obj)) {
		const length = obj.length
		for (let index = length - 1; index >= 0; index--)
			memo = iteratee(memo, obj[index])
		return memo
	}
	const objArray = Object.keys(obj)
	const length = objArray.length
	for (let index = length - 1; index >=0; index--)
		memo = iteratee(memo, obj[objArray[index]])
	return memo
}

export const find = (obj, predicate) => {
	if (!predicate || !obj)
		return
	if (Array.isArray(obj)) {
		const length = obj.length
		for (let index = 0; index < length; index++)
			if (predicate(obj[index]))
				return obj[index]
		return
	}
	const objArray = Object.keys(obj)
	const length = objArray.length
	for (let index = 0; index < length; index++) {
		const val = obj[objArray[index]]
		if (predicate(val))
			return val
	}
}

export default {
	each,
	map,
	reduce,
	reduceRight,
	find,
}
