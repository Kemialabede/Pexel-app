import React from "react";
import Searchbar from "../Searchbar/Searchbar";
import logo from "../../Assets/Icons/bower-logo.svg";
import "../../scss/Topbar.scss";
import Button from "../Button/Button";
import nature from "../../Assets/Images/nature.jpg";
import people from "../../Assets/Images/people.jpeg";
import places from "../../Assets/Images/places.jpeg";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Photo from "../../Pages/Photo/Photo";
import Video from "../../Pages/Video/Video";

function Topbar(props) {
  return (
    <div className="top-bar">
      <div className="top-bar-overall">
        <img src={logo} />
        <p>PixelPerfect</p>
        <Searchbar
          placeholder={props.placeholder}
          onChange={props.onChange}
          onClick={props.onClick}
          value={props.value}
        />
        <Button />
      </div>
      <div className="image-links">
        <div className="image-content">
          <img
            src={nature}
            alt="nature"
            onClick={props.onClickTwo}
            name="Nature"
          />
          <p>Nature</p>
        </div>
        <div className="image-content">
          <img
            src={people}
            alt="people"
            onClick={props.onClickTwo}
            name="People"
          />
          <p>People</p>
        </div>
        <div className="image-content">
          <img
            src={places}
            alt="places"
            onClick={props.onClickTwo}
            name="Places"
          />
          <p>Places</p>
        </div>
        <div className="image-content">
          <img
            src={nature}
            alt="nature"
            onClick={props.onClickTwo}
            name="Sports"
          />
          <p>Sports</p>
        </div>
        <div className="image-content">
          <img
            src={people}
            alt="people"
            onClick={props.onClickTwo}
            name="History"
          />
          <p>History</p>
        </div>
        <div className="image-content">
          <img
            src={places}
            alt="places"
            onClick={props.onClickTwo}
            name="Entertainment"
          />
          <p>Entertainment</p>
        </div>
        <div className="image-content">
          <img
            src={nature}
            alt="nature"
            onClick={props.onClickTwo}
            name="Fashion"
          />
          <p>Fashion</p>
        </div>
        <div className="image-content">
          <img
            src={people}
            alt="people"
            onClick={props.onClickTwo}
            name="Lifestyle"
          />
          <p>Lifestyle</p>
        </div>
        <div className="image-content">
          <img
            src={places}
            alt="places"
            onClick={props.onClickTwo}
            name="Tourism"
          />
          <p>Tourism</p>
        </div>
      </div>
      {/* <HashRouter>
        <div className="button">
          <NavLink to="/" className="button-link">
            <Button />
          </NavLink>
          <NavLink to="/video" className="button-link">
            <Button />
          </NavLink>
        </div>
        <div>
         
        </div>
      </HashRouter> */}
      <div className="page-links">
        <a href="/" className="page">
          Photo
        </a>
        <a href="/video" className="page">
          Video
        </a>
      </div>
    </div>
  );
}

export default Topbar;
