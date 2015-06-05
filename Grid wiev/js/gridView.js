$(document).ready(function() {
	'use strict';


	var firstGrid = new GridView();
});


var gridData = [{
	name: "name1",
	value: "value1"
}, {
	name: "name2",
	value: "value2"
}, {
	name: "name3",
	value: "value3"
}, {
	name: "name4",
	value: "value4"
}, {
	name: "name5",
	value: "value5"
}, {
	name: "name6",
	value: "value6"
}, {
	name: "name7",
	value: "value7"
}, {
	name: "name8",
	value: "value8"
}, {
	name: "name9",
	value: "value9"
}, {
	name: "name10",
	value: "value10"
}, {
	name: "name11",
	value: "value11"
}, {
	name: "name12",
	value: "value12"
}, {
	name: "name13",
	value: "value13"
}, {
	name: "name14",
	value: "value14"
}, {
	name: "name15",
	value: "value15"
}];

function GridView() {
	this.events();
	this.creatGrid();
}

//This method to the events
GridView.prototype.events = function() {
	this.topNewData = $('.table-responsive').find('.top-new-data');
	this.bottomNewData = $('.table-responsive').find('.bottom-new-data');
	this.btnPharse = $('.pharse');

	this.topNewData.on('click', this.addNewDataTop);
	this.bottomNewData.on('click', this.addNewDataBottom);
	this.btnPharse.on('click', this.pharseGrid);

	$('body').on('click', '.btn-edit-save', this.editSavabtnStyle);
	$('body').on('click', '.delete', this.deleteData);
	$('body').on('click', '.cancel', this.canceled);

};

//This method to create a new field values at the top of the table
GridView.prototype.addNewDataTop = function() {
	if ($(".btn-edit-save").hasClass('save')) {
		alert("Save all the fields you can perform this action");
	} else {
		this.newTr = '<tr><td class="dataCell" data-field="name"></td><td class="dataCell" data-field="value"></td><td><button class="actions btn btn-sm btn-edit-save save btn-success">Save</button><button class="actions btn btn-danger btn-sm cancel add">Cancel</button></td></tr>';
		$(".table>tbody").prepend(this.newTr);
		$('.btn-edit-save').first().parent().prevAll().append('<input>');
	}
};

//This method to create a new field values at the bottom of the table
GridView.prototype.addNewDataBottom = function() {
	if ($(".btn-edit-save").hasClass('save')) {
		alert("Save all the fields you can perform this action");
	} else {
		this.newTr = '<tr><td class="dataCell" data-field="name"></td><td class="dataCell" data-field="value"></td><td><button class="actions btn btn-sm btn-edit-save save btn-success">Save</button><button class="actions btn btn-danger btn-sm cancel add">Cancel</button></td></tr>';
		$(".table>tbody").append(this.newTr);
		$('.btn-edit-save').last().parent().prevAll().append('<input>');
	}
};

// This method to change the style of buttons for different situations
GridView.prototype.editSavabtnStyle = function() {
	if ($(this).hasClass("save")) {
		$(this).removeClass('save btn-success').addClass('edit btn-info');
		$(this).html('Edit');
		var values = $(this).parent().prevAll().find('input');
		$.each(values, function(i, val) {
			$(val).parent().text($(val).val());
		});
		$(this).parent().prevAll().find('input').remove();
		$(this).parent().find(".cancel").removeClass('cancel add').addClass('delete').html('Delete');
	} else if ($(".btn-edit-save").hasClass('save')) {
		alert('Save all the fields you can perform this action');
	} else {
		$(this).removeClass('edit').removeClass('btn-info');
		$(this).addClass('save').addClass('btn-success');
		$(this).html('Save');
		this.fff = $(this).parent().prevAll();
		$.each(this.fff, function(i, val) {
			this.valueCell = $(val).html();
			$(val).html('');
			$(val).append('<input type="text" value="' + this.valueCell + '" />');
			$(val).append('<input type="hidden" value="' + this.valueCell + '" />');
		});
		$(this).parent().find(".delete").removeClass('delete').addClass('cancel').html('Cancel');
	}
};

//This method to conduct table by clicking on the Delete button
GridView.prototype.deleteData = function() {
	if ($(".btn-edit-save").hasClass('save')) {
		alert('Save all the fields you can perform this action');
	} else {
		$(this).parent().parent().remove();
	}
};

// This method to conduct table by clicking on the cancel button
GridView.prototype.canceled = function() {
	if ($(this).hasClass('add')) {
		$(this).parent().parent().remove();
	} else {
		this.hiddeninput = $(this).parent().prevAll().find('input[type="hidden"]');
		$.each(this.hiddeninput, function(i, val) {
			$(val).parent().text($(val).val());
		});
		$(this).parent().prevAll().find('input').remove();
		$(this).parent().find(".cancel").removeClass('cancel add').addClass('delete').html('Delete');
		$(this).parent().find(".save").removeClass('save btn-success').addClass('edit btn-info').html('Edit');
	}
};

// This method to create a table from the known values
GridView.prototype.creatGrid = function() {
	gridData.forEach(function(item) {
		this.actionsBtnsTd = '<td><button class="actions btn btn-info btn-sm btn-edit-save edit">Edit</button><button class="actions btn btn-danger btn-sm cancel delete">Delete</button></td>';
		this.tr = $('<tr></tr>');
		for (var key in item) {
			this.tr.append('<td class="dataCell" data-field=' + key + '>' + item[key] + '</td>');
		}
		this.tr.append(this.actionsBtnsTd);
		$('tbody').append(this.tr);
	});
};
// This method pharse grid to JSON
GridView.prototype.pharseGrid = function() {
	if ($(".btn-edit-save").hasClass('save')) {
		alert("Save all the fields you can perform this action");
	} else {
		var dataForJson = [];
		var trs = $('tbody > tr');
		$.each(trs, function(index, tr) {
			var tds   = $(tr).find('.dataCell');
			var trObj = {};
			$.each(tds, function(index, td) {
				var field = $(td).attr('data-field');
				var value = $(td).html();

				trObj[field] = value;
			});
			dataForJson.push(trObj);
		});
		$('textarea').val(JSON.stringify(dataForJson));
	}
};





