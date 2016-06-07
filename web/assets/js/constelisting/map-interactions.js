jQuery(document).ready(function()
{
	
});

function showProviderInfosOnMap(providerId, showMoreChoiceInfo = true) 
{
	var provider = GLOBAL.getProviderManager().getProviderById(providerId);
	$('#detail_provider').html(provider.getHtmlRepresentation());	
	
	$('#detail_provider .collapsible-header').click(toggleProviderDetailsComplet);
	animate_up_bandeau_detail();
};

function toggleProviderDetailsComplet()
{	
	if ( $('#bandeau_detail .moreDetails').is(':visible') )
	{
		hideProviderDetailsComplet();
		$('#bandeau_helper').css('z-index',20).animate({'opacity': '1'},500);
		$('#btn_menu').fadeIn();		
	}
	else
	{
		$('#bandeau_helper').animate({'opacity': '0'},500).css('z-index',-1);
		$('#btn_menu').fadeOut();

		$('#bandeau_detail .moreInfos').hide();
		$('#bandeau_detail .lessInfos').show();	
		
		$('#bandeau_detail .moreDetails').show();		

		var bandeau_detail_new_height = $( window ).height()
		-$('header').height()
		-$('#bandeau_goToProviderList').outerHeight(true);

		$('#bandeau_detail').css('height', '100%');

		var bandeau_detail = $("#bandeau_detail");
	  	var height = bandeau_detail_new_height
	  				-bandeau_detail.find('.collapsible-header').outerHeight(true)
	  				-bandeau_detail.find('.starRepresentationChoice-helper:visible').outerHeight(true)
	  				-bandeau_detail.find(".menu-provider").outerHeight(true);

	  	$('#bandeau_detail .collapsible-body').css('height', height);
		
		ajuster_taille_carte(bandeau_detail_new_height);			
	}	
}

function hideProviderDetailsComplet()
{
	//setTimeout(function(){$("#btn_menu").show();},1000);
	if ($('#bandeau_detail .moreDetails').is(':visible'))
	{
		$('#bandeau_detail .moreDetails').hide();
		$('#bandeau_detail .moreInfos').show();
		$('#bandeau_detail .lessInfos').hide();

		var bandeau_detail_new_height = $('#detail_provider').outerHeight(true) + $('#bandeau_detail .starRepresentationChoice-helper:visible').height();

		$('#bandeau_detail').css('height', bandeau_detail_new_height);

		ajuster_taille_carte(bandeau_detail_new_height);	
	}	
}

function animate_up_bandeau_detail()
{
	if ($('#bandeau_detail').css('position') != 'absolute')
	{
		$('#bandeau_detail').show();

		var bandeau_detail_new_height = $('#detail_provider').outerHeight(true)
		+ $('#bandeau_detail .starRepresentationChoice-helper:visible').height();

		$('#bandeau_detail').css('height', bandeau_detail_new_height);
		ajuster_tailler_info_provider();
		ajuster_taille_carte(bandeau_detail_new_height);
	}	
	else
	{
		$('#bandeau_detail').show();
		ajuster_tailler_info_provider();

		//$('#bandeau_detail').show( "slide", {direction: 'rigth', easing: 'swing'} , 350 );
		//ajuster_tailler_info_provider();
		ajuster_taille_carte(0);
		
	}
}

function animate_down_bandeau_detail()
{
	if ($('#bandeau_detail').is(':visible'))
	{
		if ($('#bandeau_detail').css('position') != 'absolute')
		{
			hideProviderDetailsComplet();
			$('#bandeau_detail').css('height','0');
			$('#bandeau_detail').hide();
			ajuster_taille_carte(0);
		}
		else
		{
			$('#map').css('margin-right','0px');
			$('#bandeau_helper').css('margin-right','0px');
			$('#bandeau_detail').hide();			
		}
	}	

}