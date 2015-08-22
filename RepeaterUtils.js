/**
**	Author: 	Alfred Timothy B. Lotho
**  Created: 	2015/08/10
**
**/

/**
** generates the correct reference number for all rows of a repeater section everytime a row is added or deleted
** #repeaterSectionClassName - the css class name of the repeater section
**/
function initializeEventsForSettingRefNo(repeaterSectionClassName) {
	var initialRow = NWF$("." +repeaterSectionClassName).children(".nf-repeater-row:eq(1)");
	NWF$(initialRow).find(".Ref .ms-rtestate-field").html(1);
	NWF$(initialRow).find(".Ref input").val(1);
	
	// event for adding rows to the repeater section
  NWF.FormFiller.Events.RegisterRepeaterRowAdded(function() {
		var repeaterElement = NWF$(arguments[0][0]);
		refreshRefForRepeater(repeaterElement,repeaterSectionClassName,"added");
  });
	
	// event for deleting rows from the repeater section
	NWF.FormFiller.Events.RegisterRepeaterRowDeleted(function() {
		var repeaterElement = NWF$(arguments[0][0]);
		refreshRefForRepeater(repeaterElement,repeaterSectionClassName,"deleted");
	});
}

/**
** generates the correct Ref number everytime a row is added or deleted to a repeater section
** #repeaterElement - when "added" action is called, this is the row added
**                  - when "deleted" action is called, this is the section from which the row is deleted from
** #sectionName 		- the css class name of the repeater section
** #actionName			- "added" or "deleted"
**/
function refreshRefForRepeater(repeaterElement, sectionName, actionName) {
	var repeaterSection;
  if (actionName == "added") { 
	  repeaterSection = NWF$(repeaterElement.parents(".nf-repeater")[0]);
	}	else if (actionName == "deleted") {
	  repeaterSection = NWF$(repeaterElement); 
	}
	
	if(NWF$(repeaterSection).hasClass(sectionName)) {
		NWF$(repeaterSection).children(".nf-repeater-row").each(function(index){
			// index 0 is default hidden row (we do not use this)
			if (index == 0)
				return;
			NWF$(this).find(".Ref .ms-rtestate-field").html(index);
			NWF$(this).find(".Ref input").val(index);
		});
	}
}

/**
** deletes all displayed rows in the repeater section
** #repeaterSectionClassName - the css class name of the repeater section
**/
function clearRepeaterSectionData(repeaterSectionClassName) {
	NWF$("." +repeaterSectionClassName).find(".nf-repeater-row").each(function(index) {
		// 0 is the hidden base row; do not remove it.
		if (index > 0) {
			NWF$(this).children("img.nf-repeater-deleterow-image").click();
		}
	});
}

/**
** enables or disables a certain object using a selector
** NOTE: don't forget to set the readonly css in the form (for setting the background color of readonly fields)
** #selector	- the jquery selector for the item you want to disable/enable
** #isEnabled	- true to enable the field, false to disable it
**/
function enableRepeaterFieldBySelector(selector, isEnabled) {
	if (isEnabled) {
		NWF$(selector).removeClass("readonly");
		NWF$(selector).removeAttr("disabled");
	} else {
		NWF$(selector).addClass("readonly");
		NWF$(selector).attr("disabled", "disabled");
	}
}

/**
** enables or disabled a certain field in the repeater section
** NOTE: don't forget to set the readonly css in the form (for setting the background color of readonly fields)
** #repeaterSectionSel	 	- the css class name of the repeater section
** #itemClass 						- the CONTROL css class name of the field in the repeater section
** #index									- the base-1 row number of the element you want to enable
**                        - set to -1 if you want to apply it to all rows
** #isEnabled							- true to enable the field, false to disable it
**/
function enableRepeaterFieldByClass(repeaterSectionClass, itemClass, index, isEnabled) {
	var selector = NWF$("." +repeaterSectionClass +" .nf-repeater-row").find("." +itemClass);
	if (index >= 0)
		selector = NWF$(selector).eq(index);
	enableRepeaterFieldBySelector(selector, isEnabled);
}