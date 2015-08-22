/**
**	Author: 	Alfred Timothy B. Lotho
**  Created: 	2015/08/10
**
**/

/**
** determines the sharepoint mode of the page from the url
**/
var NEW_MODE = 0;
var DISPLAY_MODE = 1;
var EDIT_MODE = 2;
function getPageMode() {
	var isNewMode = document.location.pathname.indexOf("/NewForm.aspx") > -1;
	var isDisplayMode = document.location.pathname.indexOf("/DispForm.aspx") > -1;
	var isEditMode = document.location.pathname.indexOf("/EditForm.aspx") > -1;
	return isEditMode ? EDIT_MODE : (isDisplayMode ? DISPLAY_MODE : NEW_MODE); 
}

/**
** retrieves the value of the form variable set via Nintex Form
**/
function getFormVariable(variableName) {
	try {
		return NWF$("div[data-controlname=" +variableName +"]").find("input").val().replace(/[\n]/,'n');
	} catch (e) {
		return "";
	}
	return "";
}

/**
 ** returns the home page for the eworkflow subsite
 ** this value must be added to the Nintex Form (via Form Variables, using Common.Site URL)
 **/
function getSiteURL() {
	return getFormVariable("SiteURL");
}