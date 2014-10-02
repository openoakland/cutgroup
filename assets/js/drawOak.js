(function(){

	var container = d3.select('#ward-map'),
		width = 500,
		height = 500;

	var svg = container.append('svg').attr('width', width).attr('height', height);

	// Create a unit projection
	var projection = d3.geo.albers();

	// Create path generator
	var path = d3.geo.path()
		.projection(projection);

	// get topoJSON of Oakland zipcodes
	d3.json('../data/oakzipstopo.json', function(err, oak){
		if(err) return console.error(err);

		var zips = topojson.feature(oak, oak.objects.oakzips);

		// set up center
		projection.scale(1).translate([0,0]);
		var b = path.bounds(zips),
	    s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
	    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

	    // Center map on Oakland
		projection
		  .scale(s)
		  .translate(t);

		// init tooltip 
		var tip = d3.tip().attr('class', 'd3-tip').html(function(d){ 
			console.log()
			return d.properties.ZIP; 
		});
		svg.call(tip);

		svg.selectAll('path')
			.data(zips.features)
			.enter()
				.append('path')
				.attr('d', path)
				.attr("class", "zipzone")
				.on('mouseover', tip.show)
				.on('mouseout', tip.hide)

	});
	
})();