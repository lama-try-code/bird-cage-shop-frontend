import { useEffect, useState } from 'react'
import './Dashboard.css';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
    from 'recharts';
import { FaBox, FaMoneyBillWave, FaShoppingCart, FaUsers } from 'react-icons/fa';
import api from '../../../../components/utils/requestAPI';

const RevenueDashboard = () => {

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
                revenue: order.sum + 100,
                expense: calculateTotalExpenses(order.sum + 100),
                income: calculateTotalProfit(order.sum + 100, calculateTotalExpenses(order.sum + 100)),
            }));
            setDataset(updatedData)
        }
    }, [monthOrders]);

    // format tien nheeee :>
    function formatCash(currency) {
        return currency?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    // Tong doanh thu nèee( là tổng tiền các đơn hàng đã bán dc á) :>
    function calculateTotalRevenue(data) {
        return data.reduce((total, item) => total + item.revenue, 0);
    }
    // Tong Chi Phi nèee( là tổng tiền chi phí hao hụt các đơn hàng đã bán dc á. < ĐỂ 45% phí đỡ > ) :>
    function calculateTotalExpenses(revenue) {
        const expensePercentage = 0.45; // 45%
        const totalExpenses = revenue * expensePercentage;
        return totalExpenses;
    }
    // Tong Lợi nhuận nèee( là tổng tiền lời cuối cuùng sau khhi lấy doanh thu - chi phí ) :>
    function calculateTotalProfit(revenue, expense) {
        const totalRevenue = revenue;
        const totalExpenses = expense;
        const totalProfit = totalRevenue - totalExpenses;

        return totalProfit;
    }
    // đặt biến r gọi ở dưới class thui chứ ko có zi :>
    const totalRevenue = calculateTotalRevenue(dataset);
    const totalExpenses = calculateTotalExpenses(calculateTotalRevenue(dataset));
    const totalProfit = calculateTotalProfit(totalRevenue, totalExpenses);

    return (
        <div className='dashboard'>
            <main className='main-container'>
                <h3 className='main-title'>BẢNG THỐNG KÊ DOANH THU</h3>
                <div className='main-cards'>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>TỔNG DOANH THU</h3>
                            <FaMoneyBillWave className='card_icon' />
                        </div>
                        <h1>{formatCash(totalRevenue)}₫</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>TỔNG CHI PHÍ</h3>
                            <FaMoneyBillWave className='card_icon' />
                        </div>
                        <h1>{formatCash(totalExpenses)}₫</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>TỔNG LỢI NHUẬN</h3>
                            <FaMoneyBillWave className='card_icon' />
                        </div>
                        <h1>{formatCash(totalProfit)}₫</h1>
                    </div>
                </div>

                <div className='charts'>
                    <div className="chart">
                        <h3 className="chart-title">TỔNG DOANH THU VÀ CHI PHÍ</h3>
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
                                <Bar dataKey="revenue" fill="#8884d8" name='doanh thu' />
                                <Bar dataKey="expense" fill="#82ca9d" name='chi phí' />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart">
                        <h3 className="chart-title">TỔNG LỢI NHUẬN</h3>
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
                                <Bar dataKey="income" fill="#8884d8" name='lợi nhuận' />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default RevenueDashboard;