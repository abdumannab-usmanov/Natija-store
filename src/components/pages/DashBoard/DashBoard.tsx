import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
import { SoldProducts } from '../../../store/modules/SoldProducts';
import './dashBoard.scss';

const WEEKS = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

export const DashBoard = () => {
	const soldProducts = SoldProducts((state) => state.sold);

	const data: number[] = [];

	for (let i = 0; i < WEEKS.length; i++) {
		let res = 0;
		for (let j = 0; j < soldProducts.length; j++) {
			if (WEEKS[i] === soldProducts[j].date) {
				res += soldProducts[j].count;
			}
		}

		if (res) {
 			data[i] = res;
			
		} else {
			data[i] = 0;
		}
	}

	const barLine = {
		options: {
			chart: {
				id: 'basic-bar',
			},
			xaxis: {
				categories: WEEKS,
			},
		},
		series: [
			{
				name: 'number of sold products',
				data: data,
			},
		],
	};

	const donut = {
		options: {},
		series: [44, 55, 41, 17, 15],
		labels: ['A', 'B', 'C', 'D', 'E'],
	};

	const line = {
		series: [
			{
				name: 'TEAM A',
				type: 'column',
				data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
			},
			{
				name: 'TEAM B',
				type: 'area',
				data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
			},
			{
				name: 'TEAM C',
				type: 'line',
				data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
			},
		],
		options: {
			chart: {
				height: 350,
				type: 'line',
				stacked: false,
			},
			stroke: {
				width: [0, 2, 5],
				curve: 'smooth',
			},
			plotOptions: {
				bar: {
					columnWidth: '50%',
				},
			},

			fill: {
				opacity: [0.85, 0.25, 1],
				gradient: {
					inverseColors: false,
					shade: 'light',
					type: 'vertical',
					opacityFrom: 0.85,
					opacityTo: 0.55,
					stops: [0, 100, 100, 100],
				},
			},
			labels: [
				'01/01/2003',
				'02/01/2003',
				'03/01/2003',
				'04/01/2003',
				'05/01/2003',
				'06/01/2003',
				'07/01/2003',
				'08/01/2003',
				'09/01/2003',
				'10/01/2003',
				'11/01/2003',
			],
			markers: {
				size: 0,
			},
			xaxis: {
				type: 'datetime',
			},
			yaxis: {
				title: {
					text: 'Points',
				},
				min: 0,
			},
			tooltip: {
				shared: true,
				intersect: false,
				y: {
					formatter: function (y: any) {
						if (typeof y !== 'undefined') {
							return y.toFixed(0) + ' points';
						}
						return y;
					},
				},
			},
		},
	};

	return (
		<div>
			<div className='app'>
				<div className='first__wrapper'>
					<div className='mixed-chart'>
						<Chart
							options={barLine.options}
							series={barLine.series}
							type='bar'
							width='550'
						/>
					</div>
					<div>
						<Chart
							options={barLine.options}
							series={barLine.series}
							type='line'
							width='550'
						/>
					</div>
				</div>
				<div className='second__wrapper'>
					<div className='donut'>
						<Chart
							options={donut.options}
							series={donut.series}
							type='donut'
							width='550'
							height={350}
						/>
					</div>
					<div id='chart'>
						<ReactApexChart
							options={line.options as ApexCharts.ApexOptions}
							series={line.series}
							type='line'
							width={550}
							height={350}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
