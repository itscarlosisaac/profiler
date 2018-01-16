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
import API from './utils/api';
import MODEL from "./utils/Model";


class HomePage extends Component {
  constructor(props) {
      super(props);
      this.state = { name: '' };
  }

  handleEditMode() {
    this.setState((prevState, nextState) => ({
      editMode: !prevState.editMode
    }));
  }

  componentWillMount(){
    const store = API.getDataFromLocalStore('toptal-profile-info') || API.profileModel;
    this.setState( () => ({ name: store.name }))
    API.EEmiter.addListener( 'get-name', (name) => {
      this.setState( () => ({ name: name }))
    });
  }

  render() {
    
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

          <ExperienceSquare 
            editing={this.state.editMode} 
            title="Experience" />

          <SampleCodeSquare 
            editing={this.state.editMode} />

          <AvailabilitySquare
            editing={this.state.editMode} 
            title="Availability" />

        </div>


        <div className="row align-justify collapse">

          <QuoteSquare
            quoteNum={1}
            editing={this.state.editMode}  
            title="The most amazing..." />

          <QuoteSquare
            quoteNum={2}
            editing={this.state.editMode} 
            title="In clients I look for..." />

          <MapLocationSquare />

          <QuoteSquare
            quoteNum={3}
            editing={this.state.editMode} 
            title="Note" />

        </div>

        <div className="row align-justify collapse">
          <h1 className="divider__title">Let me introduce myself ...</h1>
        </div>

        <div className="row align-justify collapse">

          <ProjectSquare projectNum={1}
            editing={this.state.editMode} 
          />

          <ProjectSquare projectNum={2}
            editing={this.state.editMode} 
          />

          <QuoteSquare 
            quoteNum={4}
            editing={this.state.editMode} 
            title="The most amazing ..." />

          <ProjectSquare projectNum={3}
            editing={this.state.editMode} 
          />

        </div>


        { this.state.editMode ? <QandAForm /> : <ToHire name={this.state.name} /> }

        <ToptalTopSkills />
        <JoinMessageBox />
        <Footer />

      </div>
    );
  }
}

export default HomePage;
