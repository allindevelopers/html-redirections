#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const [, , json, output] = process.argv

if (!json || !output) {
	console.error('You need to add JSON with redirects and output folder as arguments:\n')
	console.error('\thtml-redirections redirects.json dist')
	process.exit(1)
}

const jsonFile = path.resolve(process.cwd(), json)
const outputDirectory = path.resolve(process.cwd(), output)
const jsonContents = JSON.parse(fs.readFileSync(jsonFile))

const redirects = Array.isArray(jsonContents) ? jsonContents : jsonContents.redirects

if (!redirects) {
	const signature = `Array<{ from: string, to: string, delay?: number }>`
	console.error('Your JSON file should have one of this structures:\n')
	console.error('Direct array in JSON:')
	console.error(`\n\t${signature}\n`)
	console.error('Object with `redirects` field:')
	console.error(`\n\t { redirects: ${signature} }\n`)
	process.exit(1)
}


redirects.forEach(({ from, to, delay = 0, meta = null }) => {
	const pathname = new URL(from, 'https://localhost').pathname
	const directory = path.join(outputDirectory, pathname)

	fs.mkdirSync(directory, { recursive: true })

	let addHtml = `<meta http-equiv="Refresh" content="${delay};url=${encodeURI(to)}">`
	if (meta) {
		meta.forEach(({ name, content }) => {
			addHtml += `<meta name="${name}" content="${content}">`
		})
	}

	fs.writeFileSync(
		path.join(directory, 'index.html'), addHtml
	)
})
