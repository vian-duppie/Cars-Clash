import React from 'react';
import { useState, useEffect} from 'react';
import styles from './ChartSpecCard.module.css';
import Icon from '../Icon/Icon';
import 'chart.js/auto';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartSpecCard = (props) => {
    const [carList, setCarList] = useState([]); //State to store all cars from API
    const [car, setCar] = useState('Loading'); //Set one cars make and model
    const [carYear, setCarYear] = useState(); //Set one cars year
    const [carSpeed, setCarSpeed] = useState('Loading'); //Set one cars top speed

    const options = { //Options For Axios Request As Given By RAPIDAPI 
        method: 'GET',
        url: 'https://car-specs1.p.rapidapi.com/cars?limit=1000&page=2',
        headers: {
          'X-RapidAPI-Host': 'car-specs1.p.rapidapi.com',
          'X-RapidAPI-Key': 'db9da9a411mshb5f37cd28e85b33p1838d2jsnb5755b60a220'
        }
    };

    useEffect(() => {
        axios.request(options)
        .then((response) => {
            let data = response.data.results; 
            setCarList(data);
            const carNumber = Math.floor(Math.random() * (1000 - 0 + 1) + 0); //Generates a random number between 0 and 1000
            let carMake = data[carNumber].make;
            let carModel = data[carNumber].model;
            let carYear = data[carNumber].year;
            let carSpeedSplit = data[carNumber].top_speed.split(' '); //Removes the 'km/h' from the value
            let carSpeed = carSpeedSplit[0];
            setCar(carMake + ' ' + carModel);
            setCarYear(carYear);
            setCarSpeed(carSpeed);
        });
    }, []);

    const changeCar = () => { //This function is invoked on the click of a button
        const carNumber = Math.floor(Math.random() * (1000 - 0 + 1) + 0); //Generates a random number between 0 and 1000
        let carMake = carList[carNumber].make;
        let carModel = carList[carNumber].model;
        let carYear = carList[carNumber].year;
        let carSpeedSplit = carList[carNumber].top_speed.split(' '); //Removes the 'km/h' from the value
        let carSpeed = carSpeedSplit[0];
        setCar(carMake + ' ' + carModel);
        setCarYear(carYear);
        setCarSpeed(carSpeed);
    };

    const data = {
        labels: ['Top Speed km/h'],
        datasets: [
            {
                label: [car],
                data: [carSpeed],
                backgroundColor: '#357ACB',
                borderRadius: 12
            }
        ]
    };

    return(
        <div className={ styles.specCardContainer }>
            <div className={ styles.specCardContainer__topContainer }>
                <div className={ styles.specCardContainer__topContainer__titlesContainer }>
                    <p className={`
                        ${ styles.specCardContainer__topContainer__titlesContainer__title }
                        p2
                    `}>
                        { car }
                    </p>
                    <p className={`
                        ${ styles.specCardContainer__topContainer__titlesContainer__subTitle }
                        p2
                    `}>
                        { carYear }
                    </p>
                </div>
                <div className={ styles.specCardContainer__topContainer__buttonContainer }>
                    <Icon
                        icon='change'
                        click={changeCar}
                    />
                </div>
            </div>
            <div className={ styles.specCardContainer__chartContainer }>
                <Bar 
                    className={ styles.specChartContainer__chartContainer__chart }
                    data={ data }
                    options={{
                        plugins:{
                            legend: {
                                display: false
                            }
                        },
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                            }
                        }
                    }}
                /> 
            </div>
        </div>
    )
}

export default ChartSpecCard;