import React from 'react';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';
import Icon from '../components/Icon/Icon';
import Card from '../components/Card/SpecCard';
import LabelIcon from '../components/Icon/LabelIcon';
import LineButton from '../components/Button/LineButton';
import ChartSpecCard from '../components/Card/ChartSpecCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecListModal from '../components/Modals/SpecListModal';
import ChangeCarModal from '../components/Modals/ChangeCarModal';

const Dashboard = () => {
    const options = {
        method: 'GET',
        url: 'https://car-specs1.p.rapidapi.com/models?make=audi',
        headers: {
            'X-RapidAPI-Host': 'car-specs1.p.rapidapi.com',
            'X-RapidAPI-Key': 'db9da9a411mshb5f37cd28e85b33p1838d2jsnb5755b60a220'
        }
    };

    const [modalOpen, setModalOpen ] = useState(false);// Set state of the Modal with defualt state being false that also means it is not being displayed/closed
    const [carModalOpen, setCarModalOpen] = useState(false);
    
    const quickSliderRef = useRef(); //This is the ref for the slider at the bottom of the page
    
    const quickCompareSliderSetting = {//Setting for the slider in the quick compare section
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3.5,
        slidesToScroll: 2
    };

    const dashboardCarSliderRef = useRef();
    const [currentSlide, setCurrentSlide] = useState(1);
    const dashboardCarSliderSetting = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (indexOfCurrentSlide) => {
            setCurrentSlide( indexOfCurrentSlide + 1 )
        }
    };

    let selectedCar = useRef();
    const [dashboardCarPower, setDashboardCarPower] = useState('Loading');
    const [dashboardCarAcceleration, setDashboardCarAcceleration] = useState('Loading');
    const [dashboardCarSpeed, setDashboardCarSpeed] = useState('Loading');
    const [dashboardCarTorque, setDashboardCarTorque] = useState('Loading');
    const [dashboardCarYear, setDashboardCarYear] = useState('Loading');
    const [dashboardCarModel, setDashboardCarModel] = useState('Loading');
    const [dashboardCarImageOne, setDashboardCarImageOne] = useState('Loading');
    const [dashboardCarImageTwo, setDashboardCarImageTwo] = useState('Loading');
    useEffect(() => { //This useEffect gets the data of the car that is at default being displayed on dashboard
        options.url = 'https://car-specs1.p.rapidapi.com/cars?limit=1&make=audi&model=RS 3';
        
        axios.request(options)
        .then((response) => {
            let data = response.data.results[0];
            setDashboardCarPower(data.power_in_hp + ' hp');
            setDashboardCarAcceleration(data.acceleration);
            setDashboardCarSpeed(data.top_speed);
            setDashboardCarTorque(data.torque_in_nm + ' nm');
            setDashboardCarYear(data.year);
            setDashboardCarModel(data.model);
            setDashboardCarImageOne(require('../assets/images/RS_3-1.png'));
            setDashboardCarImageTwo(require('../assets/images/RS_3-2.png'));
        });
    }, []);

    const changeCar = () => {
        let selected = selectedCar.current.value;

        if(selected == 'RS 4') {
            setDashboardCarImageOne(require('../assets/images/RS_4-1.png'));
            setDashboardCarImageTwo(require('../assets/images/RS_4-2.png'));
        } else if(selected == 'RS 5') {
            setDashboardCarImageOne(require('../assets/images/RS_5-1.png'));
            setDashboardCarImageTwo(require('../assets/images/RS_5-2.png'));
        } else if(selected == 'RS 6') {
            setDashboardCarImageOne(require('../assets/images/RS_6-1.png'));
            setDashboardCarImageTwo(require('../assets/images/RS_6-2.png'));
        } else if(selected == 'RS Q3') {
            setDashboardCarImageOne(require('../assets/images/RS_Q3-1.png'));
            setDashboardCarImageTwo(require('../assets/images/RS_Q3-2.png'));
        } else if(selected == 'RS Q8') {
            setDashboardCarImageOne(require('../assets/images/RS_Q8-1.png'));
            setDashboardCarImageTwo(require('../assets/images/RS_Q8-2.png'));
        }

        options.url = 'https://car-specs1.p.rapidapi.com/cars?limit=1&make=audi&model=' + selected;
        
        axios.request(options)
        .then((response) => {
            let data = response.data.results[0];
            setDashboardCarPower(data.power_in_hp + ' hp');
            setDashboardCarAcceleration(data.acceleration);
            setDashboardCarSpeed(data.top_speed);
            setDashboardCarTorque(data.torque_in_nm + ' nm');
            setDashboardCarYear(data.year);
            setDashboardCarModel(data.model);
        });
    }

    return (
        <div className={ styles.outerContainer }>
            <div className={ styles.titlesContainer }>
                <h4 className={ styles.titlesContainer__Title }>
                    Dashboard
                </h4>
                <p className={`
                    ${ styles.titlesContainer__subTitle } 
                    p1  
                `}>
                    Get a quick overview of all the data you can compare and view.
                </p>
                <div className={ styles.titlesContainer__line }></div>
            </div>
            <div className={ styles.vehicleInfoContainer }>
                <div className={ styles.sliderContainer }>
                    <Slider 
                            ref={ dashboardCarSliderRef } 
                            arrows={ false } 
                            {...dashboardCarSliderSetting }
                        >
                        <img className={ styles.sliderContainer__Image }
                            src={ dashboardCarImageOne } 
                            alt=""
                        />
                        <img className={ styles.sliderContainer__Image }
                            src={ dashboardCarImageTwo } 
                            alt=""
                        />
                    </Slider>
                <div className={ styles.sliderContainer__sliderControls }>
                    <Icon
                        className={ styles.specChartContainer__carDashboardSliderContainer__topContainer__buttonsContainer__button }
                        icon='left-arrow'
                        click={() => dashboardCarSliderRef.current.slickPrev() }
                    />
                    <Icon
                        className={ styles.specChartContainer__carDashboardSliderContainer__topContainer__buttonsContainer__button }                               
                        icon='right-arrow'
                        click={() =>  dashboardCarSliderRef.current.slickNext() }
                    />
                </div>
                <p className={`
                    ${ styles.sliderContainer__sliderIndex } 
                    p2  
                `}>
                    {currentSlide}/2
                </p> 
                </div>
                <div className={ styles.vehicleTitlesContainer }>
                    <div>
                        <p className={`
                            ${ styles.vehicleTitlesContainer__subTitle }
                            p2 
                        `}>
                            Vehicle make
                        </p>
                        <h6 className={ styles.vehicleTitlesContainer__Title }>Audi</h6>
                    </div>
                    <div>
                        <p className={`
                            ${ styles.vehicleTitlesContainer__subTitle }
                            p2 
                        `}>
                            Vehicle model
                        </p>
                        <h6 className={ styles.vehicleTitlesContainer__Title }>{ dashboardCarModel }</h6>
                    </div>
                    <div>
                        <p className={`
                            ${ styles.vehicleTitlesContainer__subTitle }
                            p2 
                        `}>
                            Year
                        </p>
                        <h6 className={ styles.vehicleTitlesContainer__Title }>{ dashboardCarYear }</h6>
                    </div>
                    <div className={`
                        ${ styles.vehicleTitlesContainer__buttonsContainer } 
                    `}>
                        <Icon
                            className={ styles.iconComponent }
                            icon='edit'
                            click={() => {
                                setCarModalOpen(true);
                            }}
                        />
                    </div>
                </div>
                <div className={ styles.vehicleCardsContainer }>
                    <Card
                        icons='acceleration'
                        stat='Acceleration'
                        statValue={ dashboardCarAcceleration }
                    />
                    <Card
                        icons='horsepower'
                        stat='Horsepower'
                        statValue={ dashboardCarPower }
                    />
                    <Card
                        icons='top-speed'
                        stat='Top Speed'
                        statValue={ dashboardCarSpeed }
                    />
                    <Card
                        icons='torque'
                        stat='Max Torque'
                        statValue={ dashboardCarTorque }
                    />
                </div>
            </div>
            <div className={ styles.specChartContainer }>
                <div className={ styles.specChartContainer__specList }>
                    <h6 className={ styles.specChartContainer__specList__title }>
                        Specs you can view...
                    </h6>
                    <LabelIcon
                        className={ styles.specChartContainer__specList__spec }
                        icon='car'
                        label='Model'
                    />
                    <LabelIcon
                        className={ styles.specChartContainer__specList__spec }
                        icon='fuel'
                        label='Fuel Consumption'
                    />
                    <LabelIcon
                        className={ styles.specChartContainer__specList__spec }
                        icon='gas-station'
                        label='Fuel Type'
                    />
                    <LabelIcon
                        className={ styles.specChartContainer__specList__spec }
                        icon='top-speed'
                        label='Top Speed'
                    />
                    <LabelIcon
                        className={ styles.specChartContainer__specList__spec }
                        icon='engine'
                        label='Engine Displacement'
                    />
                    <LabelIcon
                        className={ styles.specChartContainer__specList__spec }
                        icon='weight'
                        label='Weight'
                    />
                    <LabelIcon
                        className={ styles.specChartContainer__specList__spec }
                        icon='gears'
                        label='Number of Gears'
                    />

                    <LineButton
                        className={ styles.specChartContainer__specList__lineButton }
                        label='View more'
                        icon='right-arrow'
                        click={() => {
                            setModalOpen(true);
                        }}
                    />

                </div>
                <div className={ styles.specChartContainer__quickCompare }>
                    <div className={ styles.specChartContainer__quickCompare__topContainer }>
                        <div className={ styles.specChartContainer__quickCompare__topContainer__titlesContainer }>
                            <h6 className={ styles.specChartContainer__quickCompare__topContainer__titlesContainer__title }>
                                Quick Compare
                            </h6>
                            <p className={`
                                ${ styles.specChartContainer__quickCompare__topContainer__titlesContainer__subTitle }
                                p2
                            `}>
                                Top Speed
                            </p>
                        </div>
                        <div className={ styles.specChartContainer__quickCompare__topContainer__buttonsContainer } >
                            <Icon
                                className={ styles.specChartContainer__quickCompare__topContainer__buttonsContainer__button }
                                icon='left-arrow'
                                click={() => quickSliderRef.current.slickPrev() }
                            />
                            <Icon
                                className={ styles.specChartContainer__quickCompare__topContainer__buttonsContainer__button }                               
                                icon='right-arrow'
                                click={() =>  quickSliderRef.current.slickNext() }
                            />
                        </div>
                    </div>
                    <div className={ styles.specChartContainer__quickCompare__chartCardsContainer }>
                        <Slider 
                            ref={ quickSliderRef } 
                            arrows={ false } 
                             {...quickCompareSliderSetting }
                        >
                            <ChartSpecCard />
                            <ChartSpecCard />
                            <ChartSpecCard />
                            <ChartSpecCard />
                            <ChartSpecCard />
                            <ChartSpecCard />
                        </Slider>
                    </div>
                </div>
            </div>
            { modalOpen && <SpecListModal openModal={ setModalOpen } /> }
            { carModalOpen && <ChangeCarModal openCarModal={ setCarModalOpen } ref={ selectedCar } onChange={ changeCar }/>}
        </div>
    );
};

export default Dashboard;