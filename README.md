# 📦 **terminal-char-table**
📌a simple javascript (node.js) library for drawing ascii tables in the terminal and console.

![screenshot](screenshot.png)

### ⚠️Version belows 2.0.0 is deprecated and not recommend to use.

<br>

## Install

```sh
$ npm install terminal-char-table
```

## Example

- Create a simple char table with default options.
```js
const CharTable = require('terminal-char-table');
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

### **CharTable([option])**

*Constructor function of `CharTable` class, An object with optional propertys can be passed in:*
- @string `column_align` : default alignment of columns, value can be a `left` or `right` or `center`. default `left`.
- @number `column_fill_length` : an integer to specify how many spaces fill into each columns. default `2`.
  - bigger value will make the table looks more wider, if alignment is `left` or `right`, set this value to `2` or higher is recommended.
- @boolean `column_empty_drawn` : specify whether empty columns are drawn. default `true`.

### **insert(columns[, align])**

*Add a new row at the top of the table.*
- @string[] `columns` : an array of string to build columns of this row left side to right.
- @string `align` : columns alignment of this row, value can be a `left` or `right` or `center`.

### **append(columns[, align])**

*Add a new row at the bottom of the table.*
- @string[] `columns` : an array of string to build columns of this row left side to right.
- @string `align` : columns alignment of this row, value can be a `left` or `right` or `center`.

### **from(rows[, align])**

*Set the table rows from given data.*
- @string[] `rows` : an array include rows to append, each cell is columns of that row.
- @string `align` : columns alignment of each rows, value can be a `left` or `right` or `center`.

```js
// table header
table.append(['#', 'data', 'alignment']);

// 1~3 rows (center alignment)
table.from([['1', '-----', 'center'], ['2', '-----', 'center'], ['3', '-----', 'center']], 'center');

// 4~6 rows (default alignment)
table.from([['4', '-----', 'default'], ['5', '-----', 'default'], ['6', '-----', 'default']]);
```

### **from2(row_objects)**

*Set the table rows from given data.*
- @object[] `row_objects` : an array of object that include rows to append, each object indicated a single row:
  - @string[] `columns` : an array of string to build columns of that row left side to right.
  - @string? `align` : columns alignment of that row, value can be a `left` or `right` or `center`.

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

### **lines()**

*Get printable string lines. an array of string will be returned.*

### **string([left_indentation, first_line_break])**

*Get printable string. wrapped from `lines()` method.*
- @number `left_indentation` : an integer to specify how many spaces filling before each string lines. default `0`.
- @boolean `first_line_break` : specify whether add a line break before the first line. default `false`.

### **clear()**

*Delete all rows in the table.*

## Note

- The complete methods and description can be found in `module.js`
- More example see `demo.js` and run demo using `npm test` command.

