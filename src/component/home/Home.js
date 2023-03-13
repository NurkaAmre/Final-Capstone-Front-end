import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';
import { v4 as uuidv4 } from 'uuid';
import { getCarsThunk } from '../../redux/cars/carsSlice';
import './Main.css';
import isUserSigned from '../../helpers/auth';
import Navigation from '../navbar/nav';

const Main = () => {
  const dispatch = useDispatch();
  const { cars = null, status = 'idle' } = useSelector((state) => state.cars);
  // Fetch data from the localhost api
  const navigate = useNavigate();
  const [carouselIndex, setcarouselIndex] = useState(0);
  useEffect(() => {
    if (!isUserSigned()) {
      navigate('/signin');
    }
    if (window.innerWidth <= 768) {
      setcarouselIndex(1);
    } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      setcarouselIndex(2);
    } else {
      setcarouselIndex(3);
    }
    if (status === 'idle') {
      dispatch(getCarsThunk());
    }
  }, [status, dispatch, navigate]);

  return (
    <section>
        < Navigation />
      <header>
        <h1 className="app-title">Latest i-Model Cars</h1>
        <p className="app-msg">Please select an i-model</p>
      </header>

      <Carousel className="cars-container" interval={null}>
        {cars && cars.reduce((acc, car, index) => {
          if (index % carouselIndex === 0) {
            acc.push([]);
          }
          if (acc[acc.length - 1]) {
            acc[acc.length - 1].push(car);
          }
          return acc;
        }, []).map((carGroup) => (
          <Carousel.Item key={uuidv4()} className="cars">
            <div className="d-flex">
              {carGroup.map((car) => (
                <div key={car.id}>
                  <Link to={`/details/${car.id}`}>
                    <img src={car.images[Object.keys(car.images)[0]]} alt={car.name} style={{ height: '200px', width: '300px' }} />
                  </Link>
                  <div className="car-info">
                    <h4>{car.name}</h4>
                    <span>{car.description.split('', 50)}</span>
                  </div>
                  <div className="social-icon">
                    <div className="icon">
                      <FaTwitter />
                    </div>

                    <div className="icon">
                      <FaFacebook />
                    </div>

                    <div className="icon">
                      <FaInstagram />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>

  );
};

export default Main;