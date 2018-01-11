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
          editMode: true,
          profileData: {
              imageURL: "",
              name: "Add Name",
              address: "Add Location",
              languages: "Add Languages",
              skills: [],
              resumeURL: ''
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
                  name: Data.name,
                  imageURL: Data.imageURL,
                  languages: Data.languages,
                  address: Data.address,
                  skills: Data.skills,
                  resumeURL: Data.resumeURL
              },
              portfolio: Data.portfolio,
              experience: Data.experience,
              sampleCode: Data.sampleCode,
              preferedEnviroments: Data.preferedEnviroments,
              availability: Data.availability,
              projects: Data.projects,
              quotes: Data.quotes
          }));
      }
  }

  handleSaveData(data) {
    const { name, address, languages, imageURL, skills, resumeURL} = data;
    this.setState((prevState, nextState) => ({
        editMode: false,
        profileData: {
            name,
            address,
            languages,
            imageURL,
            skills,
            resumeURL
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

  handleSaveExperience(experience){
    this.setState( () => ({ experience }))
  }

  handleQuoteSave(quoteContent){
      const one = this.refs.quoteOne.state.quote;
      const two = this.refs.quoteTwo.state.quote;
      const three = this.refs.quoteThree.state.quote;
      const four = this.refs.quoteFour.state.quote;
      this.setState( () => ({
        quotes: [one, two, three, four]
      }) )
  }

  handleEditMode() {
    this.setState((prevState, nextState) => ({
      editMode: !prevState.editMode
    }));
  }

  handleSampleCode(sampleCodeURL){
    this.setState( () => ({ sampleCode: sampleCodeURL }) )
  }

  render() {
    const store = JSON.parse(localStorage.getItem("toptal-profile")) || {};
    
    return (
      <div>
        <Header />
        
        <ProfileInfo
          change={this.handleEditMode.bind(this)}
          editMode={this.state.editMode}
          saveData={this.handleSaveData.bind(this)}
          data={store.profileData} />

        <div className="row align-justify collapse">

          <PortfolioSquare 
            data={this.state.portfolio} 
            handleSavePortfolio={this.handleSavePortfolio.bind(this)} 
            editing={this.state.editMode} 
            title="Portfolio" 
            subtitle="PHP, Ruby, JavaScript" />

          <ExperienceSquare 
            data={this.state.experience} 
            handleSaveExperience={this.handleSaveExperience.bind(this)}
            editing={this.state.editMode} 
            title="Experience" />

          <SampleCodeSquare 
            handleSampleCode={this.handleSampleCode.bind(this)}
            data={this.state.sampleCode}
            editing={this.state.editMode} />

          <AvailabilitySquare
            title="Availability" />
        </div>

        <div className="row align-justify collapse">

          <QuoteSquare ref="quoteOne"
            name={this.state.profileData.name}
            data={this.state.quotes[0]}
            handleQuoteSave={this.handleQuoteSave.bind(this)}
            editing={this.state.editMode}  
            title="The most amazing..." />

          <QuoteSquare ref="quoteTwo"
            name={this.state.profileData.name}
            data={this.state.quotes[1]}
            handleQuoteSave={this.handleQuoteSave.bind(this)}
            editing={this.state.editMode} 
            title="In clients I look for..." />

          <MapLocationSquare 
            name={store.profileData.name}
            address={store.profileData.address} />

          <QuoteSquare ref="quoteThree"
            name={this.state.profileData.name}
            data={this.state.quotes[2]}
            handleQuoteSave={this.handleQuoteSave.bind(this)}
            editing={this.state.editMode} 
            title="Note" />
        </div>

        <div className="row align-justify collapse">
          <h1 className="divider__title">Let me introduce myself ...</h1>
        </div>

        <div className="row align-justify collapse">

          <QuoteSquare ref="quoteFour"
            name={this.state.profileData.name}
            data={this.state.quotes[3]}
            handleQuoteSave={this.handleQuoteSave.bind(this)}
            editing={this.state.editMode} 
            title="The most amazing ..." />

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
