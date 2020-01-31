$( "#salesItemSearchBar" ).autocomplete({
    search  : function(){$(this).addClass('working');},
    open    : function(){$(this).removeClass('working');},
    source: function(request, response) {
        $.getJSON("ajax/sales-autocomplete-item.ajax.php", { term: $('#salesItemSearchBar').val() }, 
            response); },
        minLength:1,
        select:function(event, ui){
            elementName = '#appendSalesTerminalRows';
            if ($('#tableSalesTransaction td').attr('id') == 'emptyCart') {
                $(elementName).html("");
            }
            $(elementName).append(`
            <tr>
                <td>`+ $('#tableSalesTransaction tr').length + `</td>
                <td>`+ ui.item.value + `</td>
                <td>`+ ui.item.value + `</td>
                <td>`+ ui.item.value + `</td>
                <td>`+ ui.item.value + `</td>
                <td>`+ ui.item.value + `</td>
                <td>`+ ui.item.value + `</td>
            </tr>
            `);
            $('#salesItemSearchBar').val("");
        }
    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( "<li>" )
		.append( "<dl><dt>"+item.value + "</dt>"+ item.label + "</dl>"  )
		.appendTo( ul );
    };