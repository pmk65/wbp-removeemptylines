/**
 * Remove Empty Lines
 *
 * Remove empty Lines or reduce blocks of empty lines to single empty line.
 *
 * @category  WeBuilder Plugin
 * @package   Remove Empty Lines
 * @author    Peter Klein <pmk@io.dk>
 * @copyright 2018
 * @license   http://www.freebsd.org/copyright/license.html  BSD License
 * @version   2.0
 */

/**
 * [CLASS/FUNCTION INDEX of SCRIPT]
 *
 *     36   function RemoveEmptyLines(replaceChar)
 *     65   function ShowRemoveCount(removeCount)
 *     89   function LineCount(text)
 *    102   function RemoveAllEmptyLines()
 *    111   function RemoveEmptyDoubleLines()
 *    120   function OnInstalled()
 *
 * TOTAL FUNCTIONS: 6
 * (This index is automatically created/updated by the WeBuilder plugin "DocBlock Comments")
 *
 */

/**
 * Remove or replace empty lines in either selection or full editor content
 *
 * @param  string   replaceChar
 *
 * @return integer
 */
function RemoveEmptyLines(replaceChar) {

    var text = Editor.Text;

    if (Editor.SelText != "") {
        text = Editor.SelText;
    }

    var count = LineCount(text);

    text = RegexReplace(text, "^(?:[\\t ]*(?:\\r?\\n|\\r))+", replaceChar, false);

    if (Editor.SelText != "") {
        Editor.SelText = text;
    }
    else {
        Editor.Text = text;
    }

    return (count - LineCount(text));
}

/**
 * Show info about how many lines that have been removed/reduced
 *
 * @param  string     msg: the message to show
 *
 * @return void
 */
function ShowRemoveCount(removeCount) {
    var msg = "No empty lines found!";

    if (removeCount > 0) {
        var plural = "";
        if (removeCount > 1) {
            plural = "s";
        }
        msg = _t(removeCount) + " empty line" + plural + " removed.";
    }

    Script.Status = msg; // Useless as status message gets overwritten by internal data once plugin finishes
	if (Script.ReadSetting("Show info after action", "1") == "1") {
		Alert(msg);
	}
}

/**
 * Get number of linesbreaks in text
 *
 * @param  string   text
 *
 * @return integer
 */
function LineCount(text) {
    var count = 1;
    if (RegexMatchAll(text, "(?:\\r?\\n|\\r)", false, matches, null)) {
        count += Length(matches);
    }
    return count;
}

/**
 * Remove ALL empty lines
 *
 * @return void
 */
function RemoveAllEmptyLines() {
	ShowRemoveCount(RemoveEmptyLines(""));
}

/**
 * Replace multiple empty lines with single empty line
 *
 * @return void
 */
function RemoveEmptyDoubleLines() {
	ShowRemoveCount(RemoveEmptyLines("\n"));
}

/**
 * Show info when plugin is installed
 *
 * @return void
 */
function OnInstalled() {
  Alert("Remove Empty Lines 2.0 by Peter Klein installed sucessfully!");
}

Script.ConnectSignal("installed", "OnInstalled");
Script.RegisterDocumentAction("Remove Empty Lines", "Remove All Empty Lines", "Ctrl+Shift+Z", "RemoveAllEmptyLines");
Script.RegisterDocumentAction("Remove Empty Lines", "Remove Empty Double Lines", "Ctrl+Shift+X", "RemoveEmptyDoubleLines");
