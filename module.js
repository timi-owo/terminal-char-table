// Original Author: https://github.com/hustcc/word-table
// Github: https://github.com/timi-owo/terminal-char-table

'use strict';

//------------------------------------------------------------------------------------------------------------------------------------------------------

class CharTable
{
	constructor(column_fill_width = 3)
	{
		this.m_rowData = [];
		this.m_colMaxLen = [];
		this.m_colFillWidth = column_fill_width;

		this.m_cachedTableLines = [];
		this.m_markUpdated = false;
	}

	_fillStr(char, len)
	{
		let str = '';
		for (let i = 0; i < len; i++) { str += char; }
		return str;
	}

	_drawDiv()
	{
		let str = '+';
		let len = this.m_colMaxLen.length;

		for (let i = 0; i < len; i++)
		{
			let width = this.m_colMaxLen[i] + this.m_colFillWidth * 2;
			str += this._fillStr('-', width);
			str += '+';
		}
		return str;
	}

	_drawRow(row)
	{
		let str = '|';
		let len = this.m_colMaxLen.length;

		let columns = this.m_rowData[row];
		let columns_len = columns.length;

		for (let i = 0; i < len; i++)
		{
			if (i < columns_len)
			{
				let width = (this.m_colMaxLen[i] - columns[i].colTextLen) / 2;
				str += this._fillStr(' ', Math.floor(width) + this.m_colFillWidth);
				str += columns[i].colText;
				str += this._fillStr(' ', Math.ceil(width) + this.m_colFillWidth);
				str += '|';
			}
			else
			{
				str += this._fillStr(' ', this.m_colMaxLen[i] + this.m_colFillWidth * 2);
				str += '|';
			}
		}
		return str;
	}

	_drawTable()
	{
		this.m_cachedTableLines = [];
		let len = this.m_rowData.length;

		for (let row = 0; row < len; row++)
		{
			if (row == 0) { this.m_cachedTableLines.push(this._drawDiv()); }
			this.m_cachedTableLines.push(this._drawRow(row));
			this.m_cachedTableLines.push(this._drawDiv());
		}
	}

	_buildRowColumns(fields)
	{
		let columns = [];
		let length = fields.length;

		for (let i = 0; i < length; i++)
		{
			let charlen = this._measureStrLen(fields[i]);

			if (this.m_colMaxLen.length > i)
			{
				this.m_colMaxLen[i] = Math.max(charlen, this.m_colMaxLen[i]);
			}
			else { this.m_colMaxLen.push(charlen); }

			let obj =
			{
				colText: fields[i],
				colTextLen: charlen
			};
			columns.push(obj);
		}
		return columns;
	}

	_measureStrLen(str)
	{
		let len = 0;
		for (let i = 0; i < str.length; i++)
		{
			let code = str.charCodeAt(i);
			if (code >= 0 && code <= 128)
			{ len += 1; } else { len += 2; }
		}
		return len;
	}

	/*
	# Get printable string lines in the terminal.
	*/
	lines()
	{
		if (this.m_markUpdated)
		{
			this._drawTable();
			this.m_markUpdated = false;
		}
		return this.m_cachedTableLines;
	}

	/*
	# Get printable string in the terminal.
	*/
	string(left_indentation = 0, first_line_break = false)
	{
		return (first_line_break ? '\n' : '') + this._fillStr(' ', left_indentation) + this.lines().join('\n' + this._fillStr(' ', left_indentation));
	}

	/*
	# Add a new row at the top of the table.
	# Example: CharTable.insert(['xxx', 'xxx', ...]);
	*/
	insert(columns)
	{
		if (columns.length == 0) { return false; }
		this.m_rowData.unshift(this._buildRowColumns(columns));
		this.m_markUpdated = true;
		return true;
	}

	/*
	# Add a new row at the bottom of the table.
	# Example: CharTable.append(['xxx', 'xxx', ...]);
	*/
	append(columns)
	{
		if (columns.length == 0) { return false; }
		this.m_rowData.push(this._buildRowColumns(columns));
		this.m_markUpdated = true;
		return true;
	}

	/*
	# Set table rows from given data.
	# Example: CharTable.from([['xxx', 'xxx', ...], ['xxx', ...]]);
	*/
	from(rows)
	{
		if (rows.length == 0) { return false; }
		for (let columns of rows)
		{
			if (columns.length > 0)
			{ this.m_rowData.push(this._buildRowColumns(columns)); }
		}
		this.m_markUpdated = true;
		return true;
	}

	/*
	# Delete all rows in the table.
	*/
	clear()
	{
		this.m_rowData = [];
		this.m_colMaxLen = [];
		this.m_cachedTableLines = [];
		this.m_markUpdated = false;
		return this;
	}
}

//------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = CharTable;

//...