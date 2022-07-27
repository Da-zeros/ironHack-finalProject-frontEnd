import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getActivityTypeService, getFilteredActivity } from '../services/activities.services'
import ActivitySearch from '../components/ActivitySearch'

function HomePage() {
  
  const [ findWord, setFindWord ] = useState("")
  const [ findType, setFindType ] = useState("")
  const [ findDate, setFindDate ] = useState("")
  

  const [ types, setTypes] = useState([])
  
  const getActivitiTypes = async () => {
        
    try {
        const response = await getActivityTypeService()
        setTypes(response.data)
    } catch (err) {
        console.log(err)
    }
  }

  useEffect(()=>{
    getActivitiTypes()
  },[])

  const handleInputChange = (e) =>{
    const findWord = e.target.value
    setFindWord(findWord)
    setFindType("")
  }

  const handleSelectChange = (e) => {
    const findTpe = e.target.value
    setFindType(findTpe)
    setFindWord("")
  }

  const handleDateCange = (e) => {
    const findDate = e.target.value
    setFindDate(findDate)
    setFindType("")
    setFindWord("")
  }

  const handlenSubmit = async (e) => {
   // e.preventDefault()
    console.log("findDate ->" ,findDate.length ,"FindWord",findWord.length, "FinType ->", findType.length)
    try {
      let queryToSend = {}
      console.log(queryToSend)
      
      if( findWord.length !== 0 ){
        queryToSend = { filterWord:findWord }
      } 
      else if(findType.length !== 0){
        queryToSend = { filterType:findType }
      }
      else if(findDate.length !== 0){
        queryToSend = { filterDate:findDate }
      }

      const findResponse = await getFilteredActivity( queryToSend )
      console.log(findResponse)

    } catch (err) {
      console.log(err)
    }
                                                                                                             
  }

  return (
    <div>
      <div className="searchContainer">
        <h3>Find Activities</h3>
        <form>
        <input
          value={findWord}
          onChange={handleInputChange}
          placeholder="Search by location, activity, name"/>
        <label>Type of activity</label>
        <select 
            name="activityType" 
            value={findType}
            onChange={handleSelectChange}
            >
            {
                types&& types.map((type,i)=>{
                    return <option key={i} value={type}>{type}</option>
                })
            }
        </select>
        <input 
          type="date"
          value={findDate}
          onChange={handleDateCange}
          />
        <button type="submit" onClick={handlenSubmit}>find!</button>
        </form>
      </div>
      <ActivitySearch />
      <Link to="/addActivity"><button>Add new activity</button></Link>
    </div>
  );
}

export default HomePage;