const AsciiTable = require('ascii-table')

module.exports = function format (items, flags) {
  /* istanbul ignore next */
  if (items.length === 0) {
    console.error('Clipboard data not a tsv string.')
    process.exit(1)
  }
  const table = AsciiTable.factory()
  const headers = Object.keys(items[0])
  if (flags.n !== true) {
    table.setHeading(...headers)
  }
  items.forEach((i) => {
    table.addRow(headers.map((k) => i[k]))
  })
  return table
}
