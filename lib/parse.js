const Clipboardy = require('clipboardy')
const { Parser } = require('tsv')
const Fs = require('fs')

module.exports = async function parse (flags) {
  try {
    let data
    if (flags.f.length > 0) {
      data = Fs.readFileSync(flags.f).toString()
    } else {
      data = await Clipboardy.read()
    }
    const parser = new Parser('\t', { header: flags.n !== true })
    return parser.parse((data || '').trim())
  } catch (err) {
    /* istanbul ignore next */
    console.error('Unable to parse clipboard data.\n', err.message)
    /* istanbul ignore next */
    process.exit(1)
  }
}
