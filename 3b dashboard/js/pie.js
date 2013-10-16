function addPieNvsr(pieData, div, datum) {
	var  nvsr = [];
	var nieuw = 0;
	var terug = 0;
	
	var desmobtab = []
	var des = 0;
	var mob = 0;
	var tab = 0;

	
	if(div == "#kol1" || div == "#kol2"){
		$.each(pieData, function(i){
			if(pieData[i].Day == datum){
				nieuw += parseFloat(pieData[i].VisitNew);
				terug += parseFloat(pieData[i].VisitReturn);
			}
			if(datum == "alles"){
				nieuw += parseFloat(pieData[i].VisitNew);
				terug += parseFloat(pieData[i].VisitReturn);
			}
		});
	nvsr.push(nieuw, terug);
	}
	else{	
		$.each(pieData, function(i){
			if(pieData[i].Day == datum){
				des += parseFloat(pieData[i].VisitDesktop);
				mob += parseFloat(pieData[i].VisitMobile);
				tab += parseFloat(pieData[i].VisitTablet);
			}
			if(datum == "alles"){
				des += parseFloat(pieData[i].VisitDesktop);
				mob += parseFloat(pieData[i].VisitMobile);
				tab += parseFloat(pieData[i].VisitTablet);
			}
		});
	desmobtab.push(des, mob, tab);
	}
	
	var width = 200,
		height = 170,
		radius = Math.min(width, height) / 2;
	
	var color = d3.scale.ordinal()
				.range(["#ffd792", "#ffb05c", "#ffa200"]);
				
	var arc = d3.svg.arc()
			  .outerRadius(radius - 10)
			  .innerRadius(0);
			  
	var svg = d3.select(div).append("svg")
			  .attr("width", width)
			  .attr("height", height)
		      .append("g")
			  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
			  
	var pie = d3.layout.pie()
			  .sort(null)
			  .value(function(d) { return d; });
			  
	if(div == "#kol1" || div == "#kol2"){
		var g = svg.selectAll(".arc")
				.data(pie(nvsr))
				.enter().append("g")
				.attr("class", "arc");
	}
	else{
		var g = svg.selectAll(".arc")
				.data(pie(desmobtab))
				.enter().append("g")
				.attr("class", "arc");
	}
	g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data); });	

	g.on("mouseover", function() {
        d3.select(this).append("text")
            .text(function(d) {return d.x;})
			.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			.attr("dy", ".35em")
            .style("text-anchor", "middle")
			.text(function(d) { return d.data; });;
	});
	g.on("mouseout", function(){
		d3.select(".arc text").remove();});
			
}