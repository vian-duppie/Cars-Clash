import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Compare.module.css';
import Select from '../components/Dropdown/Select';
import Chart from '../components/Chart/Chart';

const Compare = () => {
    const options = {
        method: 'GET',
        url: 'https://car-specs1.p.rapidapi.com/models?make=audi',
        headers: {
            'X-RapidAPI-Host': 'car-specs1.p.rapidapi.com',
            'X-RapidAPI-Key': 'db9da9a411mshb5f37cd28e85b33p1838d2jsnb5755b60a220'
        }
    };

    const [allModels, setAllModels] = useState([]);
    const [modelSelectValues, setModelSelectValues] = useState([]);

    useEffect(() => { //This useEffect gets all the models of a specific car Make in this case only Audi
        axios.request(options)
        .then((response) => {
            let data = response.data;
            setAllModels(data);
            setModelSelectValues(data);
        }).catch(function (error) {
            console.error(error);
        }); 
    }, []);



    const selectedModelOne = useRef();
    const [modelOneGeneration, setModelOneGeneration] = useState([]);
    const getSelectedModelOne = () => { //Gets the model that the user selected for vehicle one
        let selectedModelValue = selectedModelOne.current.value;
        selectedGenerationOne.current.value = 'first'; //If this select is changed revert all the other selects back to their default options
        selectedEngineModificationOne.current.value = 'first';
        selectedMetric.current.value = 'first';
        selectedSize.current.value = 'first';

        options.url = 'https://car-specs1.p.rapidapi.com/generation?make=audi&model=' + selectedModelValue;
        
        axios.request(options)
        .then((response) => {
            response = response.data;
            setModelOneGeneration(response);
        });
        setPolarChartCarDataFirst(0);
        setPolarChartCarDataSecond(0);
        setPieChartCarDataFirst(0);
        setPieChartCarDataSecond(0);
    };

    const selectedModelTwo = useRef();
    const [modelTwoGeneration, setModelTwoGeneration] = useState([]);
    const getSelectedModelTwo = () => { //Gets the model that the user selected for vehicle two
        let selectModelValue = selectedModelTwo.current.value;
        selectedGenerationTwo.current.value = 'first';//If this select is changed revert all the other selects back to their default options
        selectedEngineModificationTwo.current.value = 'first';
        selectedMetric.current.value = 'first';
        selectedSize.current.value = 'first';
        
        options.url = 'https://car-specs1.p.rapidapi.com/generation?make=audi&model=' + selectModelValue;
        
        axios.request(options)
        .then((response) => {
            response = response.data;
            setModelTwoGeneration(response);
        });
        setPolarChartCarDataFirst(0);
        setPolarChartCarDataSecond(0);
        setPieChartCarDataFirst(0);
        setPieChartCarDataSecond(0);
    };

    const selectedGenerationOne = useRef();
    const [modelOneEngine, setModelOneEngine] = useState([]);
    const getSelectedGenerationOne = () => { //Get the generation that the user has selected for vehicle one
        let selectedGeneration = selectedGenerationOne.current.value;
        selectedEngineModificationOne.current.value = 'first'; //Revert select back to default option
        selectedMetric.current.value = 'first';

        options.url = 'https://car-specs1.p.rapidapi.com/modification?generation=' + selectedGeneration;

        axios.request(options)
        .then((response) => {
            response = response.data;
            setModelOneEngine(response);
        });
        setPolarChartCarDataFirst(0);
        setPolarChartCarDataSecond(0);
        setPieChartCarDataFirst(0);
        setPieChartCarDataSecond(0);
    };

    const selectedGenerationTwo = useRef();
    const [modelTwoEngine, setModelTwoEngine] = useState([]);
    const getSelectedGenerationTwo = () => { //Get the generation that the user has selected for vehicle two
        let selectedGeneration = selectedGenerationTwo.current.value;
        selectedEngineModificationTwo.current.value = 'first';
        selectedMetric.current.value = 'first';
        selectedSize.current.value = 'first';

        options.url = 'https://car-specs1.p.rapidapi.com/modification?generation=' + selectedGeneration;

        axios.request(options)
        .then((response) => {
            response = response.data;
            setModelTwoEngine(response);
        });
        setPolarChartCarDataFirst(0);
        setPolarChartCarDataSecond(0);
        setPieChartCarDataFirst(0);
        setPieChartCarDataSecond(0);
    };

    const selectedEngineModificationOne = useRef();
    const [carOneTopSpeed, setCarOneTopSpeed] = useState();
    const [carOnePower, setCarOnePower] = useState();
    const [carOneTorque, setCarOneTorque] = useState();
    const [carOneAcceleration, setCarOneAcceleration] = useState();
    const [carOneFuelConsumption, setCarOneFuelConsumption] = useState();
    const [carOneWeight, setCarOneWeight] = useState();
    const [carOneDoors, setCarOneDoors] = useState();
    const [carOneSeats, setCarOneSeats] = useState();
    const getSelectEngineModificationOne = () => { //Get the engine modification that the user has selected for vehicle one
        let id = selectedEngineModificationOne.current.value;
        selectedMetric.current.value = 'first'; //Revert select back to default option
        selectedSize.current.value = 'first';

        options.url = 'https://car-specs1.p.rapidapi.com/cars?id=' + id;

        axios.request(options)
        .then((response) => {
            response = response.data[0];

            setCarOneTopSpeed(response.top_speed.split(' ')[0]);
            setCarOnePower(response.power_in_hp);
            setCarOneTorque(response.torque_in_nm);
            setCarOneAcceleration(response.acceleration.split(' ')[0]);

            if(response.combined_fuel_consumption.length === 13) {
                setCarOneFuelConsumption(response.combined_fuel_consumption.slice(0, 4));
            } else if(response.combined_fuel_consumption.length <= 13) {
                setCarOneFuelConsumption(response.combined_fuel_consumption.slice(0, 3));
            } else if(response.combined_fuel_consumption.length === 16) {
                setCarOneFuelConsumption(response.combined_fuel_consumption.slice(0, 3));
            } else if(response.combined_fuel_consumption.length > 16) {
                setCarOneFuelConsumption(response.combined_fuel_consumption.slice(0, 4));
            }

            setCarOneWeight(response.kerb_weight.split(' ')[0]);
            setCarOneDoors(response.number_of_doors);
            setCarOneSeats(response.number_of_seats); 
            setPolarChartCarDataFirst(0);
            setPolarChartCarDataSecond(0);
            setPieChartCarDataFirst(0);
            setPieChartCarDataSecond(0);
        });
    };

    const selectedEngineModificationTwo = useRef();
    const [carTwoTopSpeed, setCarTwoTopSpeed] = useState();
    const [carTwoPower, setCarTwoPower] = useState();
    const [carTwoTorque, setCarTwoTorque] = useState();
    const [carTwoAcceleration, setCarTwoAcceleration] = useState();
    const [carTwoFuelConsumption, setCarTwoFuelConsumption] = useState();
    const [carTwoWeight, setCarTwoWeight] = useState();
    const [carTwoDoors, setCarTwoDoors] = useState();
    const [carTwoSeats, setCarTwoSeats] = useState();

    const getSelectEngineModificationTwo = () => {//Get the engine modification that the user has selected for vehicle one
        let id = selectedEngineModificationTwo.current.value;
        selectedMetric.current.value = 'first';
        selectedSize.current.value = 'first';
        
        options.url = 'https://car-specs1.p.rapidapi.com/cars?id=' + id;

        axios.request(options)
        .then((response) => {
            response = response.data[0];

            setCarTwoTopSpeed(response.top_speed.split(' ')[0]);
            setCarTwoPower(response.power_in_hp);
            setCarTwoTorque(response.torque_in_nm);
            setCarTwoAcceleration(response.acceleration.split(' ')[0]);

            if(response.combined_fuel_consumption.length === 13) {
                setCarTwoFuelConsumption(response.combined_fuel_consumption.slice(0, 4));
            } else if(response.combined_fuel_consumption.length <= 13) {
                setCarTwoFuelConsumption(response.combined_fuel_consumption.slice(0, 3));
            } else if(response.combined_fuel_consumption.length === 16) {
                setCarTwoFuelConsumption(response.combined_fuel_consumption.slice(0, 3));
            } else if(response.combined_fuel_consumption.length > 16) {
                setCarTwoFuelConsumption(response.combined_fuel_consumption.slice(0, 4));
            }

            setCarTwoWeight(response.kerb_weight.split(' ')[0]);
            setCarTwoDoors(response.number_of_doors);
            setCarTwoSeats(response.number_of_seats);
            setPolarChartCarDataFirst(0);
            setPolarChartCarDataSecond(0);
            setPieChartCarDataFirst(0);
            setPieChartCarDataSecond(0);
        });
    };

    const selectedMetric = useRef();
    const [polarChartCarDataFirst, setPolarChartCarDataFirst] = useState();
    const [polarChartCarDataSecond, setPolarChartCarDataSecond] = useState();
    const getPolarSelectedMetric = () => { //See what data the user wants to display on chart and display it
        let selected = selectedMetric.current.value;

        if(selected === 'acceleration') {
            setPolarChartCarDataFirst(carOneAcceleration);
            setPolarChartCarDataSecond(carTwoAcceleration);
        } else if(selected === 'combined_fuel_consumption'){
            setPolarChartCarDataFirst(carOneFuelConsumption);
            setPolarChartCarDataSecond(carTwoFuelConsumption);
        } else if(selected === 'weight') {
            setPolarChartCarDataFirst(carOneWeight);
            setPolarChartCarDataSecond(carTwoWeight);
        } else {
            setPolarChartCarDataFirst(0);
            setPolarChartCarDataSecond(0);
        }
    };

    const selectedSize = useRef();
    const [pieChartCarDataFirst, setPieChartCarDataFirst] = useState();
    const [pieChartCarDataSecond, setPieChartCarDataSecond] = useState();
    const getPieSelectedSize = () => { //See what data the user wants to display on chart and display it
        let selected = selectedSize.current.value;

        if(selected === 'number_of_doors') {
            setPieChartCarDataFirst(carOneDoors);
            setPieChartCarDataSecond(carTwoDoors);
        } else if(selected === 'number_of_seats'){
            setPieChartCarDataFirst(carOneSeats);
            setPieChartCarDataSecond(carTwoSeats);
        } else {
            setPieChartCarDataFirst(0);
            setPieChartCarDataSecond(0);
        }
    };

    const polarChartOptions = ['Acceleration (Sec)', 'Fuel Consumption (l/100 KM)', 'Weight (KG)'];
    const polarChartOptionsValue = ['acceleration', 'combined_fuel_consumption', 'weight'];
    const pieChartOptions = ['Nr of Doors', 'Nr of Seats'];
    const pieChartOptionsValue = ['number_of_doors', 'number_of_seats'];

    const polarChartData = {
        labels: ['Car 1', 'Car 2'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [polarChartCarDataFirst, polarChartCarDataSecond],
                backgroundColor: [
                    '#002959',
                    '#357ACB',
                ]
            }
        ]
    };

    const barChartData = {
        labels: ['Top Speed', 'Power', 'Torque'],
        datasets: [
            {
                label: 'Car 1',
                data: [carOneTopSpeed, carOnePower, carOneTorque],
                backgroundColor: [
                    '#002959'
                ],
                borderRadius: 12
            },
            {
                label: 'Car 2',
                data: [carTwoTopSpeed, carTwoPower, carTwoTorque],
                backgroundColor: [
                    '#357ACB'
                ],
                borderRadius: 12
            }
        ]
    };

    const pieChartData = {
        labels: ['Car 1', 'Car 2'],
        datasets: [
            {
                data: [pieChartCarDataFirst, pieChartCarDataSecond],
                backgroundColor: [
                    '#002959',
                    '#357ACB',
                ]
            }
        ],
    };

    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.leftContainer }>
                <div className={ styles.leftContainer__titlesContainer }>
                    <h4 className={ styles.leftContainer__titlesContainer__title }>
                        Compare
                    </h4>
                    <p className={`
                        ${ styles.leftContainer__titlesContainer__subTitle } 
                        p1  
                    `}>
                        Compare different car models
                    </p>
                    <div className={ styles.leftContainer__titlesContainer__line }></div>
                </div>
                <div className={ styles.leftContainer__vehicleSelect }>
                    <h6 className={ styles.leftContainer__vehicleSelect__title }>
                        Vehicle 1
                    </h6>
                    <div className={ styles.leftContainer__vehicleSelect__selects}>
                        <Select
                            className={ styles.leftContainer__vehicleSelect__selects__select}
                            label='Model'
                            text='Select model'
                            textValue={ 'first' }
                            options={ allModels }
                            optionsValue={ modelSelectValues }
                            onChange={ getSelectedModelOne }
                            ref={ selectedModelOne }
                        />
                        <Select
                            className={ styles.leftContainer__vehicleSelect__selects__select}
                            label='Generation'
                            text='Select generation'
                            textValue={ 'first' }
                            options={ modelOneGeneration }
                            onChange={ getSelectedGenerationOne }
                            ref={ selectedGenerationOne }
                        />
                        <Select
                            className={ styles.leftContainer__vehicleSelect__selects__select}
                            label='Engine Modification'
                            text='Select engine modification'
                            textValue={ 'first' }
                            options={ modelOneEngine }
                            items={ 'engine_modification' }
                            value={ 'id' }
                            ref={ selectedEngineModificationOne }
                            onChange={ getSelectEngineModificationOne }
                        />
                    </div>
                    <div className={ styles.leftContainer__vehicleSelect__line }></div>
                    <h6 className={ styles.leftContainer__vehicleSelect__title }>
                        Vehicle 2
                    </h6>
                    <div className={ styles.leftContainer__vehicleSelect__selects}>
                        <Select
                            className={ styles.leftContainer__vehicleSelect__selects__select}
                            label='Model'
                            text='Select model'
                            textValue={ 'first' }
                            options={ allModels }
                            optionsValue={ modelSelectValues }
                            onChange={ getSelectedModelTwo }
                            ref={ selectedModelTwo }
                        />
                        <Select
                            className={ styles.leftContainer__vehicleSelect__selects__select}
                            label='Generation'
                            text='Select generation'
                            textValue={ 'first' }
                            options={ modelTwoGeneration }
                            onChange={ getSelectedGenerationTwo }
                            ref={ selectedGenerationTwo }
                        />
                        <Select
                            className={ styles.leftContainer__vehicleSelect__selects__select}
                            label='Engine Modification'
                            text='Select engine modification'
                            textValue={ 'first' }
                            options={ modelTwoEngine }
                            items={ 'engine_modification' }
                            value={ 'id' }
                            ref={ selectedEngineModificationTwo }
                            onChange={ getSelectEngineModificationTwo }
                        />
                    </div>
                </div>
            </div>
            <div className={ styles.rightContainer__charts }>
                <div className={ styles.rightContainer__barChart}>
                    <h6 className={ styles.rightContainer__barChart__title }>
                        Performance
                    </h6>
                    <div className={ styles.rightContainer__barChart__chartContainer }>
                        <Chart
                            data={ barChartData }
                            chartType="bar"
                        />
                    </div>
                </div>
                <div className={ styles.rightContainer__charts__bottomChartContainer }>
                    <div className={ styles.rightContainer__charts__bottomChartContainer__polarChart }>
                        <div className={ styles.rightContainer__charts__bottomChartContainer__topContainer }>
                            <h6 className={ styles.rightContainer__charts__bottomChartContainer__topContainer__title }>
                                Metric
                            </h6>
                            <Select
                                className={ styles.rightContainer__charts__bottomChartContainer__topContainer__select }
                                options={ polarChartOptions }
                                text={ 'Select Metric' }
                                textValue={ 'first' }
                                value={ polarChartOptionsValue }
                                onChange={ getPolarSelectedMetric }
                                ref={ selectedMetric }
                            />
                        </div>
                        <div className={ styles.rightContainer__charts__bottomChartContainer__chartsContainer}>
                            <Chart
                                data={ polarChartData }
                                chartType="polar"
                            />
                        </div>
                    </div>
                    <div className={ styles.rightContainer__charts__bottomChartContainer__pieChart }>
                        <div className={ styles.rightContainer__charts__bottomChartContainer__topContainer }>
                            <h6 className={ styles.rightContainer__charts__bottomChartContainer__topContainer__title }>
                                Size
                            </h6>
                            <Select
                                className={ styles.rightContainer__charts__bottomChartContainer__topContainer__select }
                                options={ pieChartOptions }
                                text={ 'Select Size' }
                                value={ pieChartOptionsValue }
                                textValue={ 'first' }
                                onChange={ getPieSelectedSize }
                                ref={ selectedSize }
                            />
                        </div>
                        <div className={ styles.rightContainer__charts__bottomChartContainer__chartsContainer}>
                            <Chart
                                data={ pieChartData }
                                chartType="pie"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Compare;