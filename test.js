'use strict';

const CharTable = require('./module');

function demo1()
{
	console.log('\n> Demo1: Create a simple table with default options.');

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
}

function demo2()
{
	console.log('\n> Demo2: Only drawing the columns if it\'s not empty.');

	let table = new CharTable({ column_empty_drawn: false });

	// table header
	table.append(['#', 'column1', 'column2']);

	// table body
	table.from([['1', 'xxx', 'xxx', ':)', '?'], ['2', 'xxx', 'xxx'], ['3', 'xxx', 'xxx', ':3']]);

	// output table with 1 indentation
	console.log(table.string(1));
}

function demo3()
{
	console.log('\n> Demo3: Apply a different alignment to each rows.');

	// make columns to center alignment by default and looks more wider
	let table = new CharTable({ column_align: 'center', column_fill_length: 4 });

	// table header (left alignment)
	table.append(['#', 'data', 'alignment'], 'left');

	// 1~3 rows (left alignment)
	table.from([['1', '-----', 'left'], ['2', '-----', 'left'], ['3', '-----', 'left']], 'left');

	// 4~6 rows (center alignment by default)
	table.from([['4', '-----', 'center'], ['5', '-----', 'center'], ['6', '-----', 'center']]);

	// 7~9 rows (right alignment)
	table.from([['7', '-----', 'right'], ['8', '-----', 'right'], ['9', '-----', 'right']], 'right');

	// another way to make this work (Uncomment if you want to try)
	/*
	table.from2([
		{
			columns: ['111', '-----', 'left'],
			align: 'left'
		},
		{
			columns: ['222', '-----', 'center'],
		},
		{
			columns: ['333', '-----', 'right'],
			align: 'right'
		}
	]);
	*/

	// output table with 1 indentation
	console.log(table.string(1));
}

demo1();
demo2();
demo3();

//...