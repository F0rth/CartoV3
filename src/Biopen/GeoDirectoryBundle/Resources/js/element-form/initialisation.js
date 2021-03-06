/**
 * This file is part of the MonVoisinFaitDuBio project.
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @copyright Copyright (c) 2016 Sebastian Castro - 90scastro@gmail.com
 * @license    MIT License
 * @Last Modified time: 2017-04-07 18:09:07
 */
jQuery(document).ready(function()
{	
	// ---------------
	// INITIALISATIONS
	// ---------------
	$('.timepicker_1').timepicki({start_time: ["9", "00"],increase_direction:"up", show_meridian:false, step_size_minutes:15,min_hour_value:5, max_hour_value:23, overflow_minutes:true}); 
	$('.timepicker_2').timepicki({start_time: ["12", "00"],increase_direction:"up", show_meridian:false, step_size_minutes:15,min_hour_value:5, max_hour_value:23, overflow_minutes:true}); 
	$('.timepicker_3').timepicki({start_time: ["14", "00"],increase_direction:"up", show_meridian:false, step_size_minutes:15,min_hour_value:5, max_hour_value:23, overflow_minutes:true}); 
	$('.timepicker_4').timepicki({start_time: ["18", "00"],increase_direction:"up", show_meridian:false, step_size_minutes:15,min_hour_value:5, max_hour_value:23, overflow_minutes:true}); 
	
	// EDIT MODE
	if ($('#element-type').val() > 0)
	{
		updateFormWithType(false);
		updateFormWithMainProduct($("#main-product-selection").val());
	}

	// CHECK si un type de element est d?j? donn? dans l'url
	var GET = getQueryParams(document.location.search);
	if (GET.type) 
	{
		$('#element-type > option[value="'+GET.type+'"]').prop('selected',true);
		updateFormWithType(false);
	}	
	
	

 //  $('#select-test').select2({
	//   minimumResultsForSearch: Infinity,
	//   tags: true,
	// });

	$('.tooltipped').tooltip();

	// ---------------
	// AJOUT LISTENERS
	// ---------------
	$('#element-type').change( updateFormWithType );
	
	$("#main-product-selection").change(function() { updateFormWithMainProduct($(this).val()); });

	// entrée d'une adresse on geocode
	$('#input-address').change(function () { handleInputAdressChange(); });
	$('#input-address').keyup(function(e) 
	{    
		if(e.keyCode == 13) // touche entrée
		{ 			 
			handleInputAdressChange();
		}
	});
	$('.btn-geolocalize').click(function () { handleInputAdressChange(); });
	
	$('#search-bar').on("place_changed",handleInputAdressChange);

	// quand on check un product l'input de pr?cision apparait ou disparait
	$('.checkbox-products').click(function() { return !$(this).hasClass('readonly'); });
	$('.checkbox-products').change(function()
	{
        if ($(this).is(':checked')) 
        {
            $('#div_precision_' + $(this).attr('value')).css('display','block');	
    	}
        else
        {
        	$('#div_precision_' + $(this).attr('value')).css('display','none');	
        }
    });    

	// HORAIRES
	// gestion d'une seconde plage horaire pour les petits ?crans
	$('.add-time-slot-button').click(function() { addTimeSlot($(this).attr('id').split("_")[0]); });
  $('.clear-time-slot-button').click(function() { clearTimeSlot($(this).attr('id').split("_")[0]); });
	// copie des openHours du day pr?c?dent
	$('.redo-time-slot-button').click(function() { redoTimeSlot($(this).attr('id').split("_")[0]); });


});

function handleInputAdressChange()
{
	geocodeAddress($('#input-address').val());
}

