import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Colors } from 'chart.js/auto'

function BarChart({chartData}) {
	return (
		<div>
			<Bar
			    datasetIdKey='id'
				data={chartData}
			/>
		</div>
	);
}

export default BarChart;