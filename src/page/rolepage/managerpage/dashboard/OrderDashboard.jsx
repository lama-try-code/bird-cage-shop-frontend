import { useEffect, useState } from 'react'
import './Dashboard.css';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
    from 'recharts';
import { FaBox, FaMoneyBillWave, FaShoppingCart, FaUsers } from 'react-icons/fa';
import api from '../../../../components/utils/requestAPI';

const OrderDashboard = () => {

    const [monthOrders, setMonthOrders] = useState([]);
    const [dataset, setDataset] = useState([])

    const fetchData = async () => {
        const url = "/api/Order/get-Orders-By-Month";
        try {
            const response = await api.get(url);
            console.log(response.data);
            setMonthOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (monthOrders.length > 0) {
            const updatedData = monthOrders.map(order => ({
                month: order.month,
                order: order.num,
                custom: 100,
            }));
            setDataset(updatedData)
        }
    }, [monthOrders]);

    // function formatCash(currency) {
    //     return currency?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // }

    const getTotalOrderQuantity = (data) => {
        const totalOrderQuantity = data?.reduce((acc, entry) => acc + entry.order, 0);
        return totalOrderQuantity;
    };

    const getTotalDesignOrderQuantity = (data) => {
        const totalDesignOrderQuantity = data?.reduce((acc, entry) => acc + entry.custom, 0);
        return totalDesignOrderQuantity;
    };

    const getMonthWithMostOrders = (data) => {
        const monthCounts = {};

        data?.forEach((entry) => {
            const month = entry.month;
            const total = entry.order + entry.custom;

            if (!monthCounts[month]) {
                monthCounts[month] = 0;
            }

            monthCounts[month] += total;
        });

        let mostOrdersMonth;
        let maxTotal = 0;

        for (let month in monthCounts) {
            if (monthCounts[month] > maxTotal) {
                mostOrdersMonth = month;
                maxTotal = monthCounts[month];
            }
        }

        return mostOrdersMonth;
    }

    const totalOrderQuantity = getTotalOrderQuantity(dataset);
    const totalDesignOrderQuantity = getTotalDesignOrderQuantity(dataset);
    const totalOrder = totalOrderQuantity + totalDesignOrderQuantity;
    const mostOrderMonth = getMonthWithMostOrders(dataset);

    return (
        <div className='dashboard'>
            <main className='main-container'>
                <h3 className='main-title'>BẢNG THỐNG KÊ ĐƠN HÀNG</h3>
                <div className='main-cards'>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>TỔNG SỐ LƯỢNG ĐƠN HÀNG</h3>
                            <FaShoppingCart className='card_icon' />
                        </div>
                        <h1>{totalOrder}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>TỔNG ĐƠN HÀNG THIẾT KẾ</h3>
                            <FaShoppingCart className='card_icon' />
                        </div>
                        <h1>{totalDesignOrderQuantity}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>THÁNG CÓ NHIỀU ĐƠN NHẤT</h3>
                            <FaShoppingCart className='card_icon' />
                        </div>
                        <h1 className='card-text'>THÁNG {mostOrderMonth}</h1>
                    </div>
                </div>

                <div className='charts'>
                    <div className="chart order">
                        <h3 className="chart-title">TỔNG SỐ LƯỢNG ĐƠN HÀNG</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={1000}
                                height={600}
                                data={dataset}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="order" fill="#8884d8" name='đơn cho sản phẩm có sẵn' />
                                <Bar dataKey="custom" fill="#82ca9d" name='đơn thiết kế' />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default OrderDashboard