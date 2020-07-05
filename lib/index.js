#!/usr/bin/env node

const Parse = require('./parse')
const Format = require('./format')

// set up command lilne arguments.
const Args = require('args')
Args.option('no-header', 'First row is not a header do not include a header.')
Args.option('file', 'A path to a tsv file to convert, otherwise what is copied to clipboard.', '')

const flags = Args.parse(process.argv)

async function run () {
  // get items from clip board or file
  const items = await Parse(flags)

  // format them as a table
  const table = Format(items, flags)

  // output table
  console.log(table.toString())
}

run().catch(console.error)
