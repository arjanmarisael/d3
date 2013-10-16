function drawLine(){	
	var data1 = [];
	$.each(dataA, function(i){
		data1.push(dataA[i].Conversies);
	});
	
	var data2 = [];
	$.each(dataB, function(i){
		data2.push(dataB[i].Conversies);
	});
	
	var dataMax = 7500,
		w = 850,
		h = 200,
		margin = 20,
		y = d3.scale.linear().domain([0, dataMax]).range([0 + margin, h - margin]),
		x = d3.scale.linear().domain([0, data1.length-1]).range([0 + margin, w - margin]);
		
	var chart = d3.select("#row1")
		.append("svg:svg")
		.attr("width", w)
		.attr("height", h);
		
	var g = chart.append("svg:g")
		.attr("transform", "translate(0,200)");
		
	var line = d3.svg.line()
		.x(function(d,i){ return x(i); })
		.y(function(d){ return -1 * y(d); });
		
	g.append("svg:path")
		.attr("d", line(data1))
		.attr("class", 'kleurLineEen');
		
	g.append("svg:path")
		.attr("d", line(data2))
		.attr("class", 'kleurLineTwee');
		
	g.append("svg:line")
		.attr("x1", x(0))
		.attr("y1", -1 * y(0))
		.attr("x2", x(w))
		.attr("y2", -1 * y(0));
		
	g.append("svg:line")
		.attr("x1", x(0))
		.attr("y1", -1 * y(0))
		.attr("x2", x(0))
		.attr("y2", -1 * y(dataMax));
		
	g.selectAll(".xLabel")
		.data(x.ticks(data1.length))
		.enter().append("svg:text")
		.attr("class", "xLabel")
		.text(function(d,i){ return 1 + i; })
		.attr("x", function(d){ return x(d) })
		.attr("y", 0)
		.attr("text-anchor", "middle");
		
	g.selectAll(".yLabel")
		.data(y.ticks(5))
		.enter().append("svg:text")
		.attr("class", "yLabel")
		.text(String)
		.attr("x", 0)
		.attr("y", function(d){ return (-1 * y(d))-8 })
		.attr("text-anchor", "right")
		.attr("dy", 4);
		
	g.selectAll(".xTicks")
		.data(x.ticks(5))
		.enter().append("svg:line")
		.attr("class", "xTicks")
		.attr("x1", function(d){ return x(d); })
		.attr("y1", -1 * y(0))
		.attr("x2", function(d){ return x(d); })
		.attr("y2", -1 * y(-0.3));
		
	g.selectAll(".yTicks")
		.data(y.ticks(5))
		.enter().append("svg:line")
		.attr("class", "yTicks")
		.attr("y1", function(d){ return -1 * y(d); })
		.attr("x1", x(-0.3))
		.attr("y2", function(d){ return -1 * y(d); })
		.attr("x2", x(0));
}