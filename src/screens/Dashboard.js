import Navbar from "../components/Navbar"
import BarChart from "../components/charts/BarChart"
import PieChart from "../components/charts/PieChart"
import { dailyData } from "../components/ChartsData"
import { pieChartData } from "../components/ChartsData"
import { useState } from "react"
import MiniCard from "../components/MiniCard"

const Dashboard = () => {
    const navigation = [
        { name: 'Dashboard', href: '/profil/dashboard', current: true },
        { name: 'Products', href: '/profil/products', current: false },
        { name: 'Store', href: '/profil/store', current: false },
      ]

      const items = [{name: "Today's Users", detail: "1.200"}, {name: "Today's Income", detail: "$5.400"}, {name: "This Month's Users", detail: "55.000"}, {name: "This Month's Income", detail: "$69.800"}]
      const[data, setData] = useState({
        labels: dailyData.map(data => data.day), 
        datasets: [{
            label: 'Sales',
            data: dailyData.map(data => data.sales),
            color: "#000000",
            backgroundColor: '#80FFDB'
        }],
      }) 

      const[pieData, setPieData] = useState({
        labels: pieChartData.map(data => data.label), 
        datasets: [{
            label: 'Profit',
            data: pieChartData.map(data => data.value),
            backgroundColor: [
                '#A8E890',
                '#CFFF8D',
                '#BFDB38',
                '#81B214',
            ],
        }],
      })

    return(
        <div>
            <Navbar navigation={navigation}/> 
            <div className=" bg-gray-100 h-screen w-screen">
                <div className="flex flex-row justify-center">
                    {items.map(item => <MiniCard item={item}/>)}
                </div>
                <div className="flex flex-row justify-center my-12">
                    <div className=" w-1/4 mr-20">
                        <PieChart pieChartData={pieData}/>
                    </div> 
                    <div className=" w-2/4">
                        <BarChart chartData={data}/> 
                    </div>           
                </div>
            </div>
        </div>
    )
} 

export default Dashboard;