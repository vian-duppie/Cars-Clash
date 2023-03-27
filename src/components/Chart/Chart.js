import React from 'react';
import styles from './Chart.module.css';
import { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea, Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = (props) => {
    const [barChart, setBarChart] = useState(false); //Default value is false so that the chart does not show if it is not called.
    const [pieChart, setPieChart] = useState(false);
    const [polarChart, setPolarChart] = useState(false);
    const [lineChart, setLineChart] = useState(false);

    const chartDisplay = props.chartType; //Pass the chart type you want to display as a prop

    useEffect(() => {
        if(chartDisplay === 'pie') { //If the chartType is 'pie'
            setPieChart(true);
        } else if (chartDisplay === 'bar') { //If the chartType is 'bar'
            setBarChart(true);
        } else if (chartDisplay === 'polar') { //If the chartType is 'polar'
            setPolarChart(true);
        } else if(chartDisplay === 'line') { //If the chartType is 'line'
            setLineChart(true);
        }
    }, [chartDisplay]); //Only run this useEffect when the value of chartDisplay is updated

    return (
        <div 
            className={`
                ${ styles.outerContainer } 
                ${ props.className ? props.className : '' }
            `}>
                {barChart && <Bar
                                data={ props.data }
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            labels: {
                                                usePointStyle: true
                                            }
                                        }
                                    }
                                }}
                            />
                }
                {polarChart && <PolarArea 
                                    data={ props.data }
                                    options={{
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: "right",
                                                align: "middle",
                                                labels: {
                                                    usePointStyle: true
                                                }
                                            }
                                        }
                                    }}
                                />
                } 
                {pieChart && <Pie
                                data={ props.data }
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "right",
                                            align: "middle",
                                            labels: {
                                                usePointStyle: true                                            },
                                            
                                        }
                                    }
                                }}
                            />
                }  
                {lineChart && <Line
                                data={ props.data }
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            labels: {
                                                usePointStyle: true
                                            }
                                        }
                                    }
                                }}
                            />
                } 
        </div>
    );
};

export default Chart;