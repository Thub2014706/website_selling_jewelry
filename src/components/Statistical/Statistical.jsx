import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { monthStatistics, sDayStatistics } from '~/services/OrderService';
import { Container, Form, Row } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/vi';

const Statistical = () => {
    const [select, setSelect] = useState('1');
    const [data, setData] = useState([]);

    const [labels, setLabels] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const dataStatistic1 = await sDayStatistics();
            const dataStatistic2 = await monthStatistics();
            if (select === '1') {
                setData(Object.values(dataStatistic1.revenueByDay));
                setLabels(Object.keys(dataStatistic1.revenueByDay));
            } else {
                setData(Object.values(dataStatistic2.revenueByDay));
                setLabels(Object.keys(dataStatistic2.revenueByDay));
            }
        };
        fetch();
    }, [select, data, labels]);
    console.log(labels);

    const newLabels = []
    labels.forEach(item => newLabels.push(moment(item).locale('vi').format('dddd DD/MM/YYYY')))

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
        <div>
            <Container>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Select
                            size="sm"
                            className="w-25 float-end"
                            onChange={(e) => setSelect(e.target.value)}
                            value={select}
                        >
                            <option value="1">Doanh thu trong 7 ngày qua</option>
                            <option value="2">Doanh thu tháng gần nhất</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Container>
            <Container className="shadow p-3">
                <h3>{`Thống kê doanh thu ${select === '1' ? '7 ngày qua' : 'tháng gần nhất'}`}</h3>
                <Bar
                    data={{
                        labels: newLabels,
                        datasets: [
                            {
                                // indexAxis: 'y',
                                label: 'Doanh thu (đồng)',
                                backgroundColor: '#A9E2F5',
                                data: data,
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
            </Container>
        </div>
    );
};

export default Statistical;
