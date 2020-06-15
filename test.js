'use strict';

const CharTable = require('./module');
let table = new CharTable();

//fill table row by rows
table.append(['1', 'xxx', 'xxx', ':)']);
table.append(['2', 'xxx', 'xxx']);
table.append(['3', 'xxx', 'xxx']);
table.insert(['#', 'column1', 'column2']);

table.clear();

//fill table from array
table.from([['#', 'column1', 'column2'], ['1', 'xxx', 'xxx', ':)'], ['2', 'xxx', 'xxx'], ['3', 'xxx', 'xxx']]);

//output table
console.log(table.string());

//output table line by lines
//let lines = table.lines();
//for (let line of lines) { console.log(line); }

//...