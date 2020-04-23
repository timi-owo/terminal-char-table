'use strict';

const terminal = require('./module');
//let table = new terminal.CharTable();
let table = new terminal.CharTable(5);

table.append(['1', 'xxx', 'xxx', ':)']);
table.append(['2', 'xxx', 'xxx']);
table.append(['3', 'xxx', 'xxx']);
table.insert(['#', 'column1', 'column2']);

table.clear();
table.from([['#', 'column1', 'column2'], ['1', 'xxx', 'xxx', ':)'], ['2', 'xxx', 'xxx'], ['3', 'xxx', 'xxx']]);

/*
let lines = table.lines();
for (let line of lines) { console.log(line); }
*/

//console.log(table.string());
console.log(table.string(1, false));

//...