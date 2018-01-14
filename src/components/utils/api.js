import EventEmitter from 'events'

const EEmiter = new EventEmitter();

module.exports = {
    saveDataToLocalStore(name, data){
        localStorage.setItem(name, JSON.stringify(data) )
    },
    getDataFromLocalStore(dataName){
        return JSON.parse(localStorage.getItem(dataName))
    },
    EEmiter,
    profileModel:{
        name: '',
        location: '',
        languages: '',
        skills: [],
        imageURL: '',
        resumeURL: ''
    },
    portfolioList: [],
    experienceList: [],
    sampleCodeImage: '',
    quotes: [],
    enviroment:''
}

