// Github: https://github.com/jquast/wcwidth/blob/master/wcwidth/wcwidth.py
// This is an implementation of wcwidth() and wcswidth().

const WIDE_EASTASIAN = require('./res-table-wide');
const ZERO_WIDTH = require('./res-table-zero');

/*
# NOTE: created by hand, there isn't anything identifiable other than
# general Cf category code to identify these, and some characters in Cf
# category code are of non-zero width.
# Also includes some Cc, Mn, Zl, and Zp characters.
*/
const ZERO_WIDTH_CF = [
	0,		// Null (Cc)
	0x034F,	// Combining grapheme joiner (Mn)
	0x200B,	// Zero width space
	0x200C,	// Zero width non-joiner
	0x200D,	// Zero width joiner
	0x200E,	// Left-to-right mark
	0x200F,	// Right-to-left mark
	0x2028,	// Line separator (Zl)
	0x2029,	// Paragraph separator (Zp)
	0x202A,	// Left-to-right embedding
	0x202B,	// Right-to-left embedding
	0x202C,	// Pop directional formatting
	0x202D,	// Left-to-right override
	0x202E,	// Right-to-left override
	0x2060,	// Word joiner
	0x2061,	// Function application
	0x2062,	// Invisible times
	0x2063	// Invisible separator
];

/*
# Helper function for binary search in character table.
# ucs: Ordinal value of unicode character.
# table: List of starting and ending ranges of ordinal values, in form of '[(start, end), ...]'.
# return true if ordinal value 'ucs' is found within 'table', else return false.
*/
function _bisearch(ucs, table)
{
	let ubound = table.length - 1, lbound = 0;

	if (ucs < table[0][0] || ucs > table[ubound][1]) { return false; }

	while (ubound >= lbound)
	{
		let mid = Math.floor((lbound + ubound) / 2);

		if (ucs > table[mid][1]) { lbound = mid + 1; }
		else if (ucs < table[mid][0]) { ubound = mid - 1; }
		else { return true; }
	}
	return false;
}

/*
# Given one unicode character, return its printable length on a terminal.
# The wcwidth() function returns 0 if the 'ucs' argument has no printable effect
# on a terminal (such as NUL '\0'), -1 if 'ucs' is not printable, or has an
# indeterminate effect on the terminal, such as a control character.
# Otherwise, the number of column positions the character occupies on a
# graphic terminal (1 or 2) is returned.
#
#
# The following have a column width of -1:
#
#     - C0 control characters (U+001 through U+01F).
#
#     - C1 control characters and DEL (U+07F through U+0A0).
#
#
# The following have a column width of 0:
#
#     - Non-spacing and enclosing combining characters (general
#       category code Mn or Me in the Unicode database).
#
#     - NULL (U+0000, 0).
#
#     - COMBINING GRAPHEME JOINER (U+034F).
#
#     - ZERO WIDTH SPACE (U+200B) through RIGHT-TO-LEFT MARK (U+200F).
#
#     - LINE SEPERATOR (U+2028) and PARAGRAPH SEPERATOR (U+2029).
#
#     - LEFT-TO-RIGHT EMBEDDING (U+202A) through RIGHT-TO-LEFT OVERRIDE (U+202E).
#
#     - WORD JOINER (U+2060) through INVISIBLE SEPARATOR (U+2063).
#
#
# The following have a column width of 1:
#
#     - SOFT HYPHEN (U+00AD) has a column width of 1.
#
#     - All remaining characters (including all printable
#       ISO 8859-1 and WGL4 characters, Unicode control characters,
#       etc.) have a column width of 1.
#
#
# The following have a column width of 2:
#
#     - Spacing characters in the East Asian Wide (W) or East Asian
#       Full-width (F) category as defined in Unicode Technical
#       Report #11 have a column width of 2.
*/
function wcwidth(ucs)
{
	if (ZERO_WIDTH_CF.indexOf(ucs) != -1) { return 0; }

	// C0/C1 control characters
	if (ucs < 32 || (ucs >= 0x07F && ucs < 0x0A0)) { return -1; }

	// combining characters with zero width
	if (_bisearch(ucs, ZERO_WIDTH)) { return 0; }

	return 1 + (_bisearch(ucs, WIDE_EASTASIAN) ? 1 : 0);
}

/*
# Given a unicode string, return its printable length on a terminal.
*/
function wcswidth(str)
{
	let length = str.length;
	let printable = 0;

	for (let i = 0; i < length; i++)
	{
		let width = wcwidth(str.charCodeAt(i));
		printable += (width > 0 ? width : 0);
	}
	return printable;
}

module.exports.wcwidth = wcwidth;
module.exports.wcswidth = wcswidth;
