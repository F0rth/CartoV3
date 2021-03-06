import { AppModule, AppStates } from "../../../app.module";
declare let App : AppModule;

declare let MarkerClusterer, $;

export function initCluster(markersToCluster)
{
	// Set Options
	let clusterOptions = {
	    title: 'Cluster Title',
	    enableRetinaIcons: true,
	    /*styles: styles,
	    calculator: calculator,*/
	    //ignoreHidden:false,	    
	    gridSize: 40, 
	    maxZoom: 17,
	    automaticRepaint: App.state == AppStates.Constellation,
	};

   //let cluster = new MarkerClusterer(App.map(), markersToCluster, clusterOptions);
   let cluster = null;

    $('#rangeKernelRadius').change(function() {
    	cluster.setKernelRadius(parseInt(this.value));
    });

    $('#rangeClusterRadius').change(function() {
    	cluster.setClusterRadius(parseInt(this.value));
    });

    return cluster;
}