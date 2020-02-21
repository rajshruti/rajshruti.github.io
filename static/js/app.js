function plotCharts(sample){	
	// Use d3.json() to fetch data from JSON file
	d3.json("data/samples.json").then(function(importedData){

			var samples=importedData.samples;
			resultsArr=samples.filter(samObj => samObj.id==sample);
			var metadata=importedData.metadata;
			resultsMetaArr=metadata.filter(samObj => samObj.id==sample);

			var otu_ids = resultsArr[0].otu_ids;
			var otu_labels = resultsArr[0].otu_labels;
			var sample_values = resultsArr[0].sample_values;
			var wfreq = resultsMetaArr[0].wfreq;
		  	
			// Create bar chart

			var trace1 = {
				type: "bar",
				orientation: 'h',
				x: sample_values.slice(0,10).reverse(),
				y: otu_ids.slice(0,10).reverse().map(otu_id=>`OTU ${otu_id}`),
				text: otu_labels.slice(0,10).reverse()
			};

			var data = [trace1];

			var layout = {
				title: "Top 10 Operational Taxonomic Units or OTUs",
				xaxis: {title: "OTU Count"},
				yaxis: {title: "OTU ID"}
			};

			Plotly.newPlot("bar", data, layout);
			
			//Create bubble chart

			var trace2 = {
				x: otu_ids,
				y: sample_values,
				text: otu_labels,
				mode: 'markers',
				marker: {
				  size: sample_values,
				  color: otu_ids,
				  colorscale: 'Jet'
				}
			};
			
			var data2 = [trace2];	

			var layout2 = {
				hovermode: 'closest',
				xaxis: {title: 'OTU ID'},
				yaxis: {title: 'OTU Count'}
			  };

			Plotly.newPlot('bubble', data2, layout2);
			
			//Create gauge chart
			
			var data3 = [
				{
					domain: { x: [0, 1], y: [0, 1] },
					value: wfreq,
					title: { text: "Belly Button Washing Frequency (Scrubs per week)" },
					type: "indicator",
					mode: "gauge+number",
					gauge: {
							  axis: { range: [0, 9],
							  steps: [
										{ range: [0, 1], color: "#DDF1DD" },
										{ range: [1, 2], color: "#D0D9D0" },
										{ range: [2, 3], color: "#C4DCC3" },
										{ range: [3, 4], color: "#A9E3A8" },
										{ range: [4, 5], color: "#9AE699" },
										{ range: [5, 6], color: "#80E77E" },
										{ range: [6, 7], color: "#63E961" },
										{ range: [7, 8], color: "#4CEC49" },
										{ range: [8, 9], color: "#089305" }
									 ]
									}
					}
				}
			];

			var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
			
			Plotly.newPlot('gauge', data3, layout3);

	});
}

/*function populateMetadata(sample){
	
	// Use d3.json() to fetch data from JSON file
	d3.json("data/samples.json").then(function(importedData){
		var metadata = importedData.metadata;
		resultsMetaArr = metadata.filter(samObj => samObj.id==sample);
		var panel = d3.select("#sample-metadata").append("p");
		panel.html("");
		panel.html(`${resultsMetaArr[0]}`);  
	  
    })

}*/

function init(){
	d3.json("data/samples.json").then(function(importedData){
		var selector=d3.select("#selDataset")
		var names = importedData.names;
		//var metadata = importedData.metadata;
		//resultsMetaArr=metadata.filter(samObj => samObj.id==sample);
		// console.log(names)
		names.forEach((sample) => {
			selector.append("option").text(sample).property("value", sample)
		})
		
		const defaultValue = names[0];
		//const defaultid = resultsMetaArr[0].id;
		//console.log(defaultid);
		plotCharts(defaultValue);
		//populateMetadata(defaultid)
    });
}

function optionChanged(newSample){
	
	plotCharts(newSample);
	//populateMetadata(newSample);
}

init();