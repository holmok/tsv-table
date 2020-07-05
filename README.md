# tsv-table

A simple command line node app that will take a tsv that is copied to your clipboard (or even from a tsv file) and prints out an ascii table like:

```
.-------------------------------------------------.
| Value  |     Slug     |          title          |
|--------|--------------|-------------------------|
|      1 | first        | The First Post          |
|      3 | happy        | Happy                   |
|      5 | Lorem_Ipsum  | Lorem Ipsum             |
|   1234 | delete-me    | DELETE ME               |
|      6 | BLOG         | New Post Test           |
|    123 | second       | This is the second post |
| 12.317 | AnotherTest  | Hello                   |
'-------------------------------------------------'
```

Installing:

```
$ npm i -g tsv-table
```

Now go to a spread sheet, select and copy a section, then run:

```
$ tsv-table
```

...and it will print out what you selected in the terminal as an ascii-table.

There are two flags:

* `--no-header` or  `-n` to not make the first row of data the header.
* `--file [path to file]` or `-f [path to file]` for a path to a `.tsv` file to print out rather than what is in the clipboard.