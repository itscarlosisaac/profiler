
module.exports = {
    saveDataToLocalStore(name, data){
        localStorage.setItem(name, JSON.stringify(data) )
    },
    getDataFromLocalStore(dataName){
        return JSON.parse(localStorage.getItem(dataName))
    },
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
    quotes: []
}

