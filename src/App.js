import axios from 'axios'
import React, {useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const App = () => {
  const [search, setSearch] = useState({
    from: '',
    to: '',
    date:'',
    returndate:''
  })
  function handlechange(e) {
    const { name, value } = e.target
    setSearch({
      ...search,
      [name]: value,
    })
  }
  function handleDate(e){
    console.log("date e:::",e);
    setSearch({
      ...search,
      date:e.toISOString().split('T')[0]
    })
  }
  function handleReturnDate(e){
    console.log("date e:::",e);
    setSearch({
      ...search,
      returndate:e.toISOString().split('T')[0]
    })
  }
  function sub(e) {
    e.preventDefault()
    console.log("search::", search);

  }
  async function searchFlight() {
    console.log("from id called");
    const fromoptions = {
      method: 'GET',
      url: 'https://skyscanner80.p.rapidapi.com/api/v1/flights/auto-complete',
      params: {
        query: search.from,
        market: 'US',
        locale: 'en-US'
      },
      headers: {
        'x-rapidapi-key': 'b4672dd53dmshc4ebaba2789b72dp1ea553jsn856fe078e8ff',
        'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
      }
    };
    const f = await axios.request(fromoptions)
    console.log("fr::", f.data.data[0].id);
    const tooptions = {
      method: 'GET',
      url: 'https://skyscanner80.p.rapidapi.com/api/v1/flights/auto-complete',
      params: {
        query: search.to,
        market: 'US',
        locale: 'en-US'
      },
      headers: {
        'x-rapidapi-key': 'b4672dd53dmshc4ebaba2789b72dp1ea553jsn856fe078e8ff',
        'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
      }
    };
    const t = await axios.request(tooptions)
    console.log("to::", t.data);
    const searchoptions = {
      method: 'GET',
      url: 'https://skyscanner80.p.rapidapi.com/api/v1/flights/search-roundtrip',
      params: {
        fromId: f.data.data[0].id,
        toId: t.data.data[0].id,
        departDate: search.date,
        returnDate: search.returndate,
        adults: '1',
        cabinClass: 'economy',
        currency: 'USD',
        market: 'US',
        locale: 'en-US'
      },
      headers: {
        'x-rapidapi-key': 'b4672dd53dmshc4ebaba2789b72dp1ea553jsn856fe078e8ff',
        'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
      }
    }
    const s = await axios.request(searchoptions)
    console.log("S:::", s.data);
    console.log(search);
    
  }
  
  return (
    <>
      <form onSubmit={sub}>
        from : <input type="text" name='from' onChange={handlechange} /><br />
        to : <input type="text" name='to' onChange={handlechange} /><br />
        date : <DatePicker selected={search.date} onChange={handleDate} dateFormat={"yyyy-MM-dd"} placeholderText='select date'/><br/>
        return date : <DatePicker selected={search.returndate} onChange={handleReturnDate} dateFormat={"yyyy-MM-dd"} placeholderText='select date'/><br/>
        <button type="submit" onClick={searchFlight}>search flight</button>
      </form>
    </>
  )
}
export default App;