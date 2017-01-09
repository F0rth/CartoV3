declare let GeocoderJS;
declare let App : AppModule;
declare var L;

import { AppModule } from "../app.module";
//import { Event, IEvent } from "../utils/event";

export interface GeocodeResult
{
	getCoordinates() : L.LatLngTuple;
	getFormattedAddress() : string;	
	getBounds() : RawBounds;
}

// south, west, north, east
export type RawBounds = [number, number, number, number];

export class GeocoderModule
{
	//onResult = new Event<any>();
	geocoder : any = null;
	
	constructor()
	{
		this.geocoder = GeocoderJS.createGeocoder('openstreetmap');
		//this.geocoder = GeocoderJS.createGeocoder({'provider': 'google'});
	}

	geocodeAddress( address, callbackComplete?, callbackFail? ) {

		console.log("geocode address : ", address);

		this.geocoder.geocode( address, (results : GeocodeResult) =>
		{			
			if (results !== null) 
			{
				if (callbackComplete) callbackComplete(results);				
				
				//this.onResult.emit(results);
			} 	
			else
			{
				if (callbackFail) callbackFail();			
			}
		});
	};


}