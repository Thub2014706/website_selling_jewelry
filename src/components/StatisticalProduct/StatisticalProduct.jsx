import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { monthStatistics, sDayStatistics, topFiveBest, topFiveLow } from '~/services/OrderService';
import { Container, Form, Row } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/vi';

const StatisticalProduct = () => {
    const [select, setSelect] = useState('1');
    const [data, setData] = useState([]);

    const [labels, setLabels] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const dataStatistic1 = await topFiveBest();
            const dataStatistic2 = await topFiveLow();
            if (select === '1') {
                const newData = dataStatistic1.map((item) => item.selled);
                const newLabels = dataStatistic1.map((item) => item.name);
                setData(newData);
                setLabels(newLabels);
            } else {
                const newData = dataStatistic2.map((item) => item.selled);
                const newLabels = dataStatistic2.map((item) => item.name);
                setData(newData);
                setLabels(newLabels);
            }
        };
        fetch();
    }, [select, data, labels]);
    // console.log(labels);
    return (
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
                            <option value="1">Top 5 sản phẩm bán chạy nhất</option>
                            <option value="2">Top 5 sản phẩm bán chậm nhất</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Container>
            <Container className="shadow p-3">
                <h3>{`Thống kê 5 sản phẩm ${select === '1' ? 'bán chạy nhất' : 'bán chậm nhất'}`}</h3>
                <div className='mx-auto' style={{width: '500px', height: '500px'}}>
                    <Pie
                        width={100}
                        height={100}
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Số lượng',
                                    backgroundColor: ['#A9E2F5', '#E19FAE', '#DAE19F', '#E1BD9F', '#9FE1A6'],
                                    data: data,
                                    weight: 100,
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
                </div>
            </Container>
        </div>
    );
};

export default StatisticalProduct;
