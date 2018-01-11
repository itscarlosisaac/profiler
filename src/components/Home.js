import React, { Component } from "react";
import Header from "./common/Header";
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
import { setTimeout } from "timers";
import MODEL from "./utils/Model";


class HomePage extends Component {
  constructor(props) {
      super(props);
      this.state = {
          editMode: false,
          profileData: {
              imageURL: "http://www.placehold.it/240x240",
              name: "Add Name",
              address: "Add Location",
              languages: "Add Languages",
              skills: [],
              resumeFile: ''
          },
          portfolio: [],
          experience: [],
          sampleCode: '',
          preferedEnviroments: [],
          availability: '',
          projects:[],
          quotes: [],
      };
  }

  componentWillMount() {
      const Data =
          JSON.parse(localStorage.getItem("toptal-profile")) ||
          localStorage.setItem("toptal-profile", JSON.stringify(MODEL));

      if (Data !== {} && Data !== undefined) {
          this.setState((prevState, nextState) => ({
              profileData: {
                  imageURL: Data.imageURL,
                  name: Data.name,
                  languages: Data.languages,
                  address: Data.address,
                  skills: Data.skills,
                  resumeFile: Data.resumeFile
              },
              portfolio: Data.portfolio,
              experience: Data.experience,
              sampleCode: Data.SampleCodeUrl,
              preferedEnviroments: Data.preferedEnviroments,
              availability: Data.availability,
              projects: Data.projects,
              quotes: Data.quotes
          }));
      }
  }

  handleSaveData(data) {
    const { name, address, languages, imageURL, skills } = data;
    this.setState((prevState, nextState) => ({
        editMode: false,
        profileData: {
            name,
            address,
            languages,
            imageURL,
            skills
        }
    }));

    setTimeout( () => {
        localStorage.setItem(
          "toptal-profile",
          JSON.stringify(this.state)
        );
      }, 1 );
  }

  handleSavePortfolio(portfolio){
    this.setState( () => ({ portfolio }))
  }

  handleEditMode() {
    this.setState((prevState, nextState) => ({
      editMode: !prevState.editMode
    }));
  }

  render() {
    const store = localStorage.getItem("toptal-profile") || {};
    return (
      <div>
        <Header />
        
        <ProfileInfo
          change={this.handleEditMode.bind(this)}
          editMode={this.state.editMode}
          saveData={this.handleSaveData.bind(this)}
          data={this.state.profileData} />

        <div className="row align-justify collapse">

          <PortfolioSquare 
            data={this.state.portfolio} 
            handleSavePortfolio={this.handleSavePortfolio.bind(this)} 
            editing={this.state.editMode} 
            title="Portfolio" 
            subtitle="PHP, Ruby, JavaScript" />

          <ExperienceSquare 
            data={this.state.experience} 
            editing={this.state.editMode} 
            title="Experience" />

          <SampleCodeSquare 
            title="Sample code and algorithms" />

          <AvailabilitySquare />
        </div>

        <div className="row align-justify collapse">
          <QuoteSquare title="The most amazing..." />
          <QuoteSquare title="In clients I look for..." />
          <MapLocationSquare address={this.state.profileData.address} />
          <QuoteSquare title="Note" />
        </div>

        <div className="row align-justify collapse">
          <h1>Let me introduce myself...</h1>
        </div>

        <div className="row align-justify collapse">
          <QuoteSquare title="In clients I look for..." />
        </div>

        <div className="row align-justify">
          <div className="columns">
            <h1>To hire Martin join us as a</h1>
            <button>Client</button>
          </div>
          <div className="columns">
            <p>or as a developer</p>
          </div>
        </div>

        <ToptalTopSkills />
        <JoinMessageBox />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
