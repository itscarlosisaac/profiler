import React, { Component } from "react";
import Header from "./common/Header";
import ToHire from "./common/ToHire";
import QandAForm from './common/Q&A'
import ProfileInfo from "./ProfileInfo";
import PortfolioSuqare from "./PortfolioSquare";
import ExperienceSquare from "./ExperienceSquare";
import SampleCodeSquare from "./SampleCodeSquare";
import AvailabilitySquare from "./AvailabilitySquare";
import QuoteSquare from "./QuoteSquare";
import MapLocationSquare from "./MapLocationSquare";
import ToptalTopSkills from "./ToptalTopSkills";
import JoinMessageBox from "./JoinMessageBox";
import Footer from "./common/Footer";
import PortfolioSquare from "./PortfolioSquare";
import ProjectSquare from "./ProjectSquare";

import MODEL from "./utils/Model";


class HomePage extends Component {
  constructor(props) {
      super(props);
      this.state = { };
  }

  handleEditMode() {
    this.setState((prevState, nextState) => ({
      editMode: !prevState.editMode
    }));
  }


  render() {
    const store = JSON.parse(localStorage.getItem("toptal-profile")) || {};
    
    return (
      <div>
        <Header />
        
        <ProfileInfo
          handleEditMode={this.handleEditMode.bind(this)}
          editMode={this.state.editMode} />

          <div className="row align-justify collapse">

          <PortfolioSquare 
            editing={this.state.editMode} 
            title="Portfolio" 
            subtitle="PHP, Ruby, JavaScript" />
            
        </div>


      </div>
    );
  }
}

export default HomePage;
