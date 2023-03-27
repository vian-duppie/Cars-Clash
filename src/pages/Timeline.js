import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Timeline.module.css';
import Select from '../components/Dropdown/Select';
import Chart from '../components/Chart/Chart';

const Timeline = () => {
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

    useEffect(() => {
        axios.request(options)
        .then((response) => {
            let data = response.data;
            setAllModels(data);
            setModelSelectValues(data);
        }).catch(function (error) {
            console.error(error);
        }); 
    }, []);

    const selectedModel = useRef();
    const [chartYearsLabels, setChartYearsLabels] = useState([]);
    const [carPower, setCarPower] = useState([]);
    const [carTorque, setCarTorque] = useState([]);
    const [carWeight, setCarWeight] = useState([]);
    const [carSpeed, setCarSpeed] = useState([]);
    const [carAcceleration, setCarAcceleration] = useState([]);
    const getSelectedModel = () => { //Get the selected model
        let selected = selectedModel.current.value;
        selectedDataType.current.value = 'first' //Sets this select to its default option when this select is changed

        options.url = 'https://car-specs1.p.rapidapi.com/cars?limit=150&model=' + selected;

        let years = [];
        
        axios.request(options)
        .then((response) => {
            let data = response.data.results;

            years = data.map(item => parseInt(item.year));
            let unsortedYearsLabel = [...new Set(years)]; //This removes the duplicates value if you set a new array with data from a array that has duplicate values
            let yearsLabel = unsortedYearsLabel.sort((a,b) => a - b); //This sorts the array from lowest to highest number
            setChartYearsLabels(yearsLabel);

            let model = [];
            let modelPower = [];
            let modelTorque = [];
            let modelWeight = [];
            let modelTopSpeed = [];
            let modelAcceleration = [];

            for(var i = 0; i < yearsLabel.length; i++) {
                model.push(data.filter(item => item.year == yearsLabel[i]));
            }; //Pushes the model as a object if the year matches the yearsLabel

            if(model.length > 1) { //if the model array has multiple arrays in itself
                for(var j = 0; j < model.length; j++) {
                    modelPower.push(model[j][0].power_in_hp);
                    modelTorque.push(model[j][0].torque_in_nm);
                    modelWeight.push(model[j][0].kerb_weight.split(' ')[0]);
                    modelTopSpeed.push(model[j][0].top_speed.split(' ')[0]);
                    modelAcceleration.push(model[j][0].acceleration.split(' ')[0]);
                }
            } else {
                for(var k = 0; k < model[0].length; k++) {
                    modelPower.push(model[0][k].power_in_hp);
                    modelTorque.push(model[0][k].torque_in_nm);
                    modelWeight.push(model[0][k].kerb_weight.split(' ')[0]);
                    modelTopSpeed.push(model[0][k].top_speed.split(' ')[0]);
                    modelAcceleration.push(model[0][k].acceleration.split(' ')[0]);
                }
            }

            setCarPower(modelPower);
            setCarTorque(modelTorque);
            setCarWeight(modelWeight);
            setCarSpeed(modelTopSpeed);
            setCarAcceleration(modelAcceleration);

        });
    };

    const [chartLabel, setChartLabel] = useState('Dataset 1');
    const selectedDataType = useRef();
    const [chartData, setChartData] = useState([]);
    const [title, setTitle] = useState();
    const getSelectedDataType = () => {
        let selected = selectedDataType.current.value;
        setChartLabel(selectedModel.current.value);

        if(selected === 'power') {
            setChartData(carPower);
            setTitle('Power')
        } else if(selected === 'torque') {
            setChartData(carTorque);
            setTitle('Torque')
        } else if(selected === 'weight') {
            setChartData(carWeight);
            setTitle('Weight')
        } else if(selected === 'acceleration') {
            setChartData(carAcceleration);
            setTitle('Acceleration')
        } else if(selected === 'speed') {
            setChartData(carSpeed);
            setTitle('Top Speed')
        }
    };

    const lineChartData = {
        labels: chartYearsLabels,
        datasets: [{
          label: chartLabel ,
          data: chartData,
          fill: true,
          fillColor: '#002959',
          backgroundColor: 'rgba(0, 41, 89, .6)',
          borderColor: '#357ACB',
          tension: 0.1
        }]
      };

      const lineChartOptions = ['Power (HP)', 'Torque (NM)', 'Weight (KG)', 'Acceleration (Sec)', 'Top Speed (KM/H)'];
      const lineChartOptionsValue = ['power', 'torque', 'weight', 'acceleration', 'speed'];

    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.leftContainer }>
                <div className={ styles.leftContainer__titlesContainer }>
                    <h4 className={ styles.leftContainer__titlesContainer__title }>
                        Timeline
                    </h4>
                    <p className={`
                        ${ styles.leftContainer__titlesContainer__subTitle } 
                        p1  
                    `}>
                        See the data type on a timeline
                    </p>
                    <div className={ styles.leftContainer__titlesContainer__line }></div>
                </div>
                <div className={ styles.leftContainer__vehicleSelect }>
                    <h6 className={ styles.leftContainer__vehicleSelect__title }>
                        Configure Timeline
                    </h6>
                    <div className={ styles.leftContainer__vehicleSelect__selects}>
                    <Select
                            className={ styles.leftContainer__vehicleSelect__selects__select}
                            label='Model'
                            text='Select model'
                            textValue={ 'first' }
                            options={ allModels }
                            optionsValue={ modelSelectValues }
                            onChange={ getSelectedModel }
                            ref={ selectedModel }
                        />
                        <Select
                            className={ styles.leftContainer__vehicleSelect__selects__select}
                            label='Data Type'
                            text='Select data type'
                            textValue={ 'first' }
                            options={ lineChartOptions }
                            value={ lineChartOptionsValue }
                            onChange={ getSelectedDataType }
                            ref={ selectedDataType }
                        />
                    </div>
                </div>
            </div>
            <div className={ styles.rightContainer__chart}>
                <h6 className={ styles.rightContainer__chart__title }>
                    { title }
                </h6>
                <div className={ styles.rightContainer__chart__chartContainer }>
                    <Chart
                        data={ lineChartData }
                        chartType="line"
                    />
                </div>
            </div>
        </div>
    );
};

export default Timeline;