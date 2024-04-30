import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Statistical = () => {
    return (
        // <div>
        //     <Line
        //         data={{
        //             labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        //             datasets: [
        //                 {
        //                     data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
        //                     label: 'Tổng doanh thu',
        //                     borderColor: '#3e95cd',
        //                     fill: false,
        //                 },
        //                 {
        //                     data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
        //                     label: 'Asia',
        //                     borderColor: '#8e5ea2',
        //                     fill: false,
        //                 },
        //                 {
        //                     data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
        //                     label: 'Europe',
        //                     borderColor: '#3cba9f',
        //                     fill: false,
        //                 },
        //                 {
        //                     data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
        //                     label: 'Latin America',
        //                     borderColor: '#e8c3b9',
        //                     fill: false,
        //                 },
        //                 {
        //                     data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
        //                     label: 'North America',
        //                     borderColor: '#c45850',
        //                     fill: false,
        //                 },
        //             ],
        //         }}
        //         options={{
        //             title: {
        //                 display: true,
        //                 text: 'World population per region (in millions)',
        //             },
        //             legend: {
        //                 display: true,
        //                 position: 'bottom',
        //             },
        //         }}
        //     />
        // </div>
        <Bar
            data={{
                labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
                datasets: [
                    {
                        label: 'Population (millions)',
                        backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
                        data: [2478, 5267, 734, 784, 433],
                    },
                ],
            }}
            options={{
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050',
                },
            }}
        />
    );
};

export default Statistical;
