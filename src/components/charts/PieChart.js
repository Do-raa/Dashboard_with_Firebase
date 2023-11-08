import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function PieChart({pieChartData}) {
	return (
		<div>
			<Pie
			    datasetIdKey='id'
				data={pieChartData}
			/>
		</div>
	);
}

export default PieChart;