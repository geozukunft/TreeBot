/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph) {
	Papa.parse("../data/TeamTreesChart.csv", {
		download: true,
		complete: function(results) {
			createGraph(results.data);
		}
	});
}

function createGraph(data) {
	var years = [];
	var Done = ["Trees in (K)"];
	var Build = ["Difference since last measuring"]

	for (var i = 1; i < data.length; i++) {
		years.push(data[i][0]);
		Done.push(data[i][1]);
		Build.push(data[i][2]);
	}


	var chart = c3.generate({
		bindto: '#chart',
	    data: {
	        columns: [
				Done,
				Build
	        ]
	    },
	    axis: {
	        x: {
	            type: 'category',
	            categories: years,
	            tick: {
	            	multiline: false,
                	culling: {
                    	max: 15
                	}
            	}
	        }
	    },
	    zoom: {
        	enabled: true
    	},
	    legend: {
	        position: 'right'
	    }
	});
}

parseData(createGraph);