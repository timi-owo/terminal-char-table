# terminal-char-table
📌a simple javascript (node.js) library for drawing ascii tables in the terminal and console.

![screenshot](screenshot.png)

### ⚠️Version belows 2.0.0 is deprecated and not recommend to use.

## Install

```sh
$ npm install terminal-char-table
```

## Example

- Create a simple table with default options.
```js
let table = new CharTable();

// fill the table row by rows
table.append(['1', 'xxx', 'xxx', ':)', '?']);
table.append(['2', 'xxx', 'xxx']);
table.append(['3', 'xxx', 'xxx', ':3']);
table.append(['10', 'xxx', 'xxx', '', 'owo']);

// this row will be the table header
table.insert(['#', 'column1', 'column2']);

// output table with 1 indentation
console.log(table.string(1));
```

## API

### CharTable([option])

Constructor function of `CharTable` class, An object with optional property can be passed in:
- `column_align` : a string to specify default columns alignment, value can be a `left` or `right` or `center`. default `left`.
- `column_fill_length` : an integer to specify how many spaces fill into each columns, bigger value will make the table looks more wider. default `2`.
  - if your align is `left` or `right`, set this value to `2` or higher is recommended.
- `column_empty_drawn` : a boolean that specifies whether empty columns are drawn. default `true`.

### insert(columns[, align])

Add a new row at the top of the table.
- param `columns` : an array of string to build columns of this row left side to right.
- param `align` : a optional string to specify columns alignment of `this row`.

### append(columns[, align])

Add a new row at the bottom of the table.
- param `columns` : an array of string to build columns of this row left side to right.
- param `align` : a optional string to specify columns alignment of `this row`.

### from(rows[, align])

Set the table rows from given data.
- param `rows` : an array include rows to append, each cell is an array of string indicated columns of that row.
- param `align` : a optional string to specify columns alignment of `all rows`.

```js
// table header
table.append(['#', 'data', 'alignment']);

// 1~3 rows (center alignment)
table.from([['1', '-----', 'center'], ['2', '-----', 'center'], ['3', '-----', 'center']], 'center');

// 4~6 rows (default alignment)
table.from([['4', '-----', 'default'], ['5', '-----', 'default'], ['6', '-----', 'default']]);
```

### from2(row_objects)

Set the table rows from given data.
- param `row_objects` : an array of object include rows to append, each object indicated a single row:
  - property `columns` : an array of string to build columns of this row left side to right.
  - property `align` : a optional string to specify columns alignment of `this row`.

```js
table.from2([
	{
		columns: ['#', 'data', 'alignment']
	},
	{
		columns: ['1', '-----', 'left'],
		align: 'left'
	},
	{
		columns: ['2', '-----', 'center'],
		align: 'center'
	},
	{
		columns: ['3', '-----', 'right'],
		align: 'right'
	}
]);
```

### lines()

Get printable string lines. an array of string will be returned.

### string([left_indentation, first_line_break])

Get printable string. wrapped from `lines()` method.
- param `left_indentation` : an optional integer to specify how many spaces fill before each string lines.
- param `first_line_break` : a optional boolean that specifies whether to break the first line.

### clear()

Delete all rows in the table.

## Note

- The complete methods and description can be found in `module.js`
- More example see `demo.js` and run demo using `npm test` command.

