///////////////////////////////////////////////////////////////////////////////
/////////////////////// ADMIN USER MANAGEMENT PART ////////////////////////////
///////////////////////////////////////////////////////////////////////////////

$usertable = $('#usertable').bootstrapTable({});

//flush the form add-user for new insertions//
$('#add-user').on("click", function () {
  $('.form-control').val('');
});

//action icons (update/delete) user//
function userOperateFormatter(value, row, index) {
  return [
    '<a class="updateuser" href="#" title="Update user">',
    '<i class="glyphicon glyphicon-pencil"></i>',
    '</a>',
    '<a class="deleteuser" href="#" title="Delete user">',
    '<i class="glyphicon glyphicon-trash"></i>',
    '</a>'
  ].join('  ');
}

//action events (update/delete) user//
window.userOperateEvents = {
  'click .deleteuser': function (e, value, row, index) {
    $('#DeleteUserModal').modal('show');
    $('input#id').val(row['id']);
    $('input#deltrigger').val(true);
    $('input#name.form-control').val(row['name']);
    $('input#email.form-control').val(row['email']);
    $('input#affiliation.form-control').val(row['affiliation']);
  },
  'click .updateuser': function (e, value, row, index) {
    $('#UpdateUserModal').modal('show');
    $('input#id').val(row['id']);
    $('input#confirmed').prop('checked', row['confirmed']);
    $('select#role.form-control').val(row['role_id2']);
    $('input#name.form-control').val(row['name']);
    $('input#email.form-control').val(row['email']);
    $('input#affiliation.form-control').val(row['affiliation']);
    $('textarea#pgp.form-control').val(row['pgp']);
  }
};

///////////////////////////////////////////////////////////////////////////////
////////////////////////  NOTIFICATION MANAGEMENT /////////////////////////////
///////////////////////////////////////////////////////////////////////////////

$notiftable = $('#notiftable').bootstrapTable({});

function operateFormatter(value, row, index) {
  if (row['fulltxt'] == true) {
    return [
      '<a class="removenotif" href="#" title="Delete Notification">',
      '<i class="glyphicon glyphicon-trash"></i>',
      '</a>'
    ].join('  ');
  } else {
    return [
      '<a class="checknotif" href="#" title="Check Associated CVEs">',
      '<i class="glyphicon glyphicon-question-sign"></i>',
      '</a>',
      '<a class="removenotif" href="#" title="Delete Notification">',
      '<i class="glyphicon glyphicon-trash"></i>',
      '</a>'
    ].join('  ');
  }
}

// coloring row if fulltxt notification or not //
function rowStyle(row, index) {
  if (row['fulltxt'] == true) {
    return {classes: "info"};

  } else {
    return {classes: "success"};
  }
}

function dateFormatter(value, row, index) {
  return new Date(value);
}

function refFormatter(value, row, index) {
  var tab = String(value).split(',');
  var ref = [];
  for (var j = 0; j < tab.length; j++) {
    ref.push('<span class="glyphicon glyphicon-link"> </span><a href="' + tab[j] + '">' + tab[j] + '</a>');
  }
  return ref.join('</br>');
}

window.operateEvents = {
  'click .removenotif': function (e, value, row, index) {
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "/notif/delnotif",
      dataType: "json",
      data: JSON.stringify(row['id']),
      success: function () {
        location.reload();
      }
    });

  },
  'click .checknotif': function (e, value, row, index) {
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "/notif/checknotif",
      dataType: "json",
      data: JSON.stringify(row),
      success: function (data) {
        $('#CheckNotifModal').modal('show');
        $('#cvestab').bootstrapTable('destroy', {});
        $('#cvestab').bootstrapTable({
          method: 'post',
          data: data,
          search: true,
          showToggle: true,
          showColumns: true,
          height: 600,
          undefinedText: "---",
          minimumCountColumns: 2,
          searchAlign: 'left',
          striped: true,
          cache: false,
          pagination: true,
          columns: [
            {
              field: 'id',
              title: 'CVE ID',
              align: 'center',
              sortable: true
            },
            {
              field: 'Modified',
              title: 'Last Update',
              align: 'left',
              formatter: dateFormatter,
              sortable: true
            },
            {
              field: 'Published',
              title: 'Published',
              align: 'left',
              visible: false,
              formatter: dateFormatter,
              sortable: true
            },
            {
              field: 'cvss',
              title: 'CVSS',
              visible: false,
              align: 'left',
              sortable: true
            },
            {
              field: 'cwe',
              title: 'CWE',
              align: 'left',
              visible: false,
              sortable: true
            },
            {
              field: 'summary',
              title: 'Summary',
              align: 'left'
            },
            {
              field: 'references',
              title: 'References',
              visible: true,
              formatter: refFormatter,
              align: 'left'
            },
            {
              field: 'vulnerable_configuration',
              title: 'Vulnerable Conf',
              visible: false,
              align: 'left'
            }
          ]
        });
      }
    });
  }
};


var delay = (function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms)
  };
})();

$('#allproduct').on("click", function () {
  if ($(this).is(':checked')) {
    $('#product').val('');
    $('#version').val('');
    $('#product').parent().toggleClass('has-warning has-success', false);
    $('#version').parent().toggleClass('has-warning has-success', false);

    $('#product').prop('disabled', true);
    $('#version').prop('disabled', true);
    $('#allversion').prop('disabled', true);
    $('#allversion').prop('checked', true);
  } else {
    $('#product').removeAttr("disabled");
    $('#version').removeAttr("disabled");
    $('#allversion').prop('checked', false);
    $('#allversion').prop('disabled', false);
  }
});

$('#allversion').on("click", function () {
  if ($(this).is(':checked')) {
    $('#version').val('');
    $('#version').parent().toggleClass('has-warning has-success', false);
    $('#version').prop('disabled', true);
  } else {
    $('#version').removeAttr("disabled");
  }
});

$('#vendor-dropdown').on("click", "li.searchterm", function () {
  var value = $(this).text();
  $('#vendor').val(value);
});


$('#product-dropdown').on("click", "li.searchterm", function () {
  var value = $(this).text();
  $('#product').val(value);
  if ($('#vendor').val() == '' && $('#product').parent().hasClass('has-success')) {
    $('#vendor').val($('ul#vendor-dropdown.dropdown-menu').text());
  }
});


$('#version-dropdown').on("click", "li.searchterm", function () {
  var value = $(this).text();
  $('#version').val(value);
});


$('#vendor').on("keyup focusout", function () {
  delay(function () {
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "/notif/notifjson",
      dataType: "json",
      data: JSON.stringify(
        {
          "queryvendor": $('#vendor').val(),
          "queryproduct": $('#product').val(),
          "queryversion": $('#version').val()
        }),
      success: function (data) {
        var vendors = data['vendors'];
        $('#vendor-dropdown').empty();
        for (var i = 0; i < vendors.length; i++) {
          $('#vendor-dropdown').append('<li class="searchterm"><a href="#">' + vendors[i] + '</a></li>');
        }
        if ($.inArray($('#vendor').val(), vendors) == -1) {
          $('#vendor').parent().toggleClass('has-warning', true);
          $('#vendor').parent().toggleClass('has-success', false);
        } else {
          $('#vendor').parent().toggleClass('has-success', true);
          $('#vendor').parent().toggleClass('has-warning', false);
        }
      }
    });
  }, 500);
});


$('#product').on("keyup click focusout", function () {
  delay(function () {
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "/notif/notifjson",
      dataType: "json",
      data: JSON.stringify(
        {
          "queryvendor": $('#vendor').val(),
          "queryproduct": $('#product').val(),
          "queryversion": $('#version').val()
        }),
      success: function (data) {
        var products = data['products'];
        var vendors = data['vendors'];
        $('#product-dropdown').empty();
        $('#vendor-dropdown').empty();
        for (var j = 0; j < products.length; j++) {
          $('#product-dropdown').append('<li class="searchterm"><a href="#">' + products[j] + '</a></li>');
        }
        if ($.inArray($('#product').val(), products) == -1) {
          $('#product').parent().toggleClass('has-warning', true);
          $('#product').parent().toggleClass('has-success', false);
        } else {
          $('#product').parent().toggleClass('has-success', true);
          $('#product').parent().toggleClass('has-warning', false);
        }
        $('#vendor').val(vendors[0]);
        if ($('#vendor').val() != "") {
          $('#vendor').parent().toggleClass('has-success', true);
        }
      }
    });
  }, 500);
});


$('#version').on("keyup click focusout", function () {
  delay(function () {
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "/notif/notifjson",
      dataType: "json",
      data: JSON.stringify(
        {
          "queryvendor": $('#vendor').val(),
          "queryproduct": $('#product').val(),
          "queryversion": $('#version').val()
        }),
      success: function (data) {
        var versions = data['versions'];
        $('#version-dropdown').empty();
        for (var j = 0; j < versions.length; j++) {
          $('#version-dropdown').append('<li class="searchterm"><a href="#">' + versions[j] + '</a></li>');
        }
        if ($.inArray($('#version').val(), versions) == -1) {
          $('#version').parent().toggleClass('has-warning', true);
          $('#version').parent().toggleClass('has-success', false);
        } else {
          $('#version').parent().toggleClass('has-success', true);
          $('#version').parent().toggleClass('has-warning', false);
        }
      }
    });
  }, 500);
});


// Reseting form for further add.
$('#add-notif').on("click", function () {
  $('#vendor').val('');
  $('#product').val('');
  $('#version').val('');
  $('#product').removeAttr("disabled");
  $('#version').removeAttr("disabled");
  $('#allversion').prop('checked', false);
  $('#allversion').attr('disabled', false);
  $('#allproduct').prop('checked', false);
  $('#vendor').parent().removeClass('has-warning has-success');
  $('#product').parent().removeClass('has-warning has-success');
  $('#version').parent().removeClass('has-warning has-success');
});


$('#delete-notif').on("click", function () {
  var selected_notif = [];
  for (var j = 0; j < $('#notiftable').bootstrapTable('getSelections').length; j++) {
    selected_notif.push($('#notiftable').bootstrapTable('getSelections')[j]['id'])
  }
  $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "/notif/delnotif",
    dataType: "json",
    data: JSON.stringify(selected_notif),
    success: function () {
      location.reload();
    }
  });
});

// Add notification in the database.
$('#btn-add-notif').on("click", function () {
  $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "/notif/addnotif",
    dataType: "json",
    data: JSON.stringify(
      {
        "queryvendor": $('#vendor').val(),
        "queryproduct": $('#product').val(),
        "queryversion": $('#version').val(),
        "allproduct": $('#allproduct').is(':checked'),
        "allversion": $('#allversion').is(':checked')
      }),
    success: function () {
      location.reload();
    }
  });
});


// Add full text notif in the database.
$('#fulltxtsearchadd').on("click", function () {
  $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "/notif/searchnotif",
    dataType: "json",
    data: JSON.stringify(
      {"searchquery": $('#fulltextsearch').val()}),
    success: function () {
      location.reload();
    }
  });
});

