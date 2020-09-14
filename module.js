// Github: https://github.com/timi-owo/terminal-char-table
// NPM JS: https://www.npmjs.com/package/terminal-char-table

'use strict';

//------------------------------------------------------------------------------------------------------------------------------------------------------

class CharTable
{
	constructor(option = undefined)
	{
		this.m_metaRows = [];
		this.m_colBaseLen = [];

		this.m_tableOpt =
		{
			...
			{
				column_align: 'left',
				column_fill_length: 2,
				column_empty_drawn: true
			},
			...option
		};

		this.m_cachedTableLines = [];
		this.m_markUpdated = false;
	}

	_fillStr(char, len)
	{
		let str = '';
		while (str.length < len) { str += char; }
		return str;
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

	_buildRowData(fields, align)
	{
		if (align == undefined || (align != 'left' && align != 'center' && align != 'right'))
		{
			// prevent illegal input
			align = this.m_tableOpt.column_align;
		}

		let row_data =
		{
			colFields: [],
			colAlign: align
		};

		for (let i = 0; i < fields.length; i++)
		{
			let charlen = this._measureStrLen(fields[i]);

			if (i < this.m_colBaseLen.length)
			{
				// existed column, update length if current column is bigger.
				this.m_colBaseLen[i] = Math.max(charlen, this.m_colBaseLen[i]);
			}
			else { this.m_colBaseLen.push(charlen); } // new column

			let column =
			{
				colText: fields[i],
				colTextLen: charlen
			};
			row_data.colFields.push(column);
		}
		return row_data;
	}

	_drawTable()
	{
		this.m_cachedTableLines = [];

		for (let row = 0; row < this.m_metaRows.length; row++)
		{
			if (row == 0) { this.m_cachedTableLines.push(this._drawDiv(row, true)); }
			this.m_cachedTableLines.push(this._drawRow(row));
			this.m_cachedTableLines.push(this._drawDiv(row));
		}
	}

	_drawDiv(row, first_line = false)
	{
		let str = '+';
		let columns = this.m_metaRows[row].colFields;

		for (let col = 0; col < this.m_colBaseLen.length; col++)
		{
			if (col < columns.length || this.m_tableOpt.column_empty_drawn)
			{
				let len = this.m_colBaseLen[col] + this.m_tableOpt.column_fill_length * 2;
				str += this._fillStr('-', len);
				str += '+';
			}
			else if (!first_line && this.m_metaRows.length > (row + 1))
			{
				// extend divide line if next row has extra columns
				let columns_next = this.m_metaRows[row + 1].colFields;
				if (columns_next.length > columns.length && col < columns_next.length)
				{
					let len = this.m_colBaseLen[col] + this.m_tableOpt.column_fill_length * 2;
					str += this._fillStr('-', len);
					str += '+';
				}
			}
		}
		return str;
	}

	_drawRow(row)
	{
		let str = '|';
		let columns = this.m_metaRows[row].colFields;
		let align = this.m_metaRows[row].colAlign;

		for (let col = 0; col < this.m_colBaseLen.length; col++)
		{
			if (col < columns.length)
			{
				switch (align)
				{
					case 'left':
					{
						let len = (this.m_colBaseLen[col] - columns[col].colTextLen) + this.m_tableOpt.column_fill_length * 2;
						str += (len < 2 ? '' : ' ') + columns[col].colText;
						str += this._fillStr(' ', len < 2 ? len : len - 1);
						break;
					}
					case 'right':
					{
						let len = (this.m_colBaseLen[col] - columns[col].colTextLen) + this.m_tableOpt.column_fill_length * 2;
						str += this._fillStr(' ', len < 2 ? len : len - 1);
						str += columns[col].colText + (len < 2 ? '' : ' ');
						break;
					}
					case 'center':
					{
						let len = (this.m_colBaseLen[col] - columns[col].colTextLen) / 2;
						str += this._fillStr(' ', Math.floor(len) + this.m_tableOpt.column_fill_length);
						str += columns[col].colText;
						str += this._fillStr(' ', Math.ceil(len) + this.m_tableOpt.column_fill_length);
						break;
					}
				}
				str += '|';
			}
			else if (this.m_tableOpt.column_empty_drawn)
			{
				let len = this.m_colBaseLen[col] + this.m_tableOpt.column_fill_length * 2;
				str += this._fillStr(' ', len);
				str += '|';
			}
		}
		return str;
	}

	/*
	# Get printable string lines.
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
	# Get printable string.
	*/
	string(left_indentation = 0, first_line_break = false)
	{
		let a = first_line_break ? '\n' : '';
		let b = this._fillStr(' ', left_indentation);
		let c = this.lines().join('\n' + this._fillStr(' ', left_indentation));
		return a + b + c;
	}

	/*
	# Add a new row at the top of the table.
	# The optional param 'align' can set the columns alignment of this row independently.
	# Example: CharTable.insert(['xxx', 'xxx', ...], align);
	*/
	insert(columns, align = undefined)
	{
		if (columns.length > 0)
		{
			this.m_metaRows.unshift(this._buildRowData(columns, align));
			this.m_markUpdated = true;
		}
		return this;
	}

	/*
	# Add a new row at the bottom of the table.
	# The optional param 'align' can set the columns alignment of this row independently.
	# Example: CharTable.append(['xxx', 'xxx', ...], align);
	*/
	append(columns, align = undefined)
	{
		if (columns.length > 0)
		{
			this.m_metaRows.push(this._buildRowData(columns, align));
			this.m_markUpdated = true;
		}
		return this;
	}

	/*
	# Set the table rows from given data.
	# The optional param 'align' can set the columns alignment of all rows.
	# Example: CharTable.from([['xxx', 'xxx', ...], ['xxx', ...]], align);
	*/
	from(rows, align = undefined)
	{
		if (rows.length > 0)
		{
			for (let columns of rows) { this.append(columns, align); }
			this.m_markUpdated = true;
		}
		return this;
	}

	/*
	# Set the table rows from given data.
	# The optional prop 'align' in each row object can set the columns alignment of that row.
	# Example: CharTable.from2([{columns: ['xxx', ...], align: 'left'}, {columns: ['xxx', ...], align: 'right'}]);
	*/
	from2(row_objects)
	{
		if (row_objects.length > 0)
		{
			for (let row of row_objects) { this.append(row.columns, row.align); }
			this.m_markUpdated = true;
		}
		return this;
	}

	/*
	# Delete all rows in the table.
	*/
	clear()
	{
		this.m_metaRows = [];
		this.m_colBaseLen = [];
		this.m_cachedTableLines = [];
		this.m_markUpdated = false;
		return this;
	}
}

//------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = CharTable;

//...