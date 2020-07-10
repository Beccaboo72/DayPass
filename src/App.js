import jerrysNugget from "./jerrysnugget.webp";
import elCortez from "./elcortez.jpg";
import sushisamba from "./sushisamba.jpg";
import luvit from "./Luv-It.jpeg";
import treasures from "./Treasures.jpg";
import pawnstars from "./pawnstars.jpg";
import afterhoursflowers from "./afterhoursflowers.jpg";
import rogue from "./rogue.jpeg";
import neonmuseum from "./neonmuseum.jpg";
import fremonteast from "./fremonteast.jpg";
import React from 'react';
import './App.css';

const pages={Casino:[{name:"El Cortez",Address:"600 E Fremont St",picture:elCortez,longitude:-115.138989,latitude:36.169066,post:"https://www.facebook.com/permalink.php?story_fbid=107235581062222&id=107220817730365"},
                    {name:"Fremont Street Experience",Address:"Fremont St",picture:fremonteast,longitude:-115.144252,latitude:36.170782,post:"https://www.facebook.com/permalink.php?story_fbid=107246501061130&id=107220817730365"},
                    {name:"Jerry's Nugget",Address:"1821 Las Vegas Blvd N",picture:jerrysNugget,longitude:-115.132670,latitude:36.193440,post:"https://www.facebook.com/permalink.php?story_fbid=107252867727160&id=107220817730365"}],
            Restaurants:[{name:"Treasures Gentleman's Club and Steakhouse",Address:"2801 Westwood Dr",picture:treasures,longitude:-115.173720,latitude:36.140020,post:"https://www.facebook.com/permalink.php?story_fbid=107254907726956&id=107220817730365"},
                          {name:"Luv It Frozen Custard",Address:"505 E Oakey Blvd",picture:luvit,longitude:-115.151598,latitude:36.151440,post:"https://www.facebook.com/permalink.php?story_fbid=107256661060114&id=107220817730365"},
                        {name:"Sushi Samba",Address:"Grand Canal Shoppes 3327 S Las Vegas Blvd",picture:sushisamba,longitude:-115.303960,latitude:36.154950,post:"https://www.facebook.com/permalink.php?story_fbid=107259394393174&id=107220817730365"}],
            Other:[{name:"After Hours Flowers", Address:"320 E Charleston Blvd #103",picture:afterhoursflowers,longitude:-115.150361,latitude:36.158626,post:"https://www.facebook.com/permalink.php?story_fbid=107262774392836&id=107220817730365"},
                    {name:"Rogue Toys", Address:"630 S Las Vegas Blvd",picture:rogue,longitude:-115.145310,latitude:36.162463,post:"https://www.facebook.com/permalink.php?story_fbid=107263607726086&id=107220817730365"},
                  {name:"Pawn Stars", Address:"713 S Las Vegas Blvd",picture:pawnstars,longitude:-115.1454,latitude:36.1617,post:"https://www.facebook.com/permalink.php?story_fbid=107267064392407&id=107220817730365"},
                {name:"The Neon Museum", Address:"770 Las Vegas Blvd N",picture:neonmuseum,longitude:-115.135370,latitude:36.177009,post:"https://www.facebook.com/permalink.php?story_fbid=107268651058915&id=107220817730365"},]};
const criticalWidth=800;

function myNavFunc(latitude,longitude){
                          // If it's an iPhone..
                          if( (navigator.platform.indexOf("iPhone") !== -1) 
                              || (navigator.platform.indexOf("iPod") !== -1)
                              || (navigator.platform.indexOf("iPad") !== -1))
                               window.open("maps://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination="+longitude+","+latitude);
                          else
                               window.open("https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination="+longitude+","+latitude);
                      }
class ShowTable extends React.Component{
  render(){
  return(
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="3">Name</th>
            <th colSpan="3">Address</th>
            <th colSpan="3">Contact</th>
          </tr>
        </thead>
        <tbody>
          {this.props.rows.map((row)=>(<tr key={row}>
            {this.props.wide&&<td colSpan="1"><img src= {row.picture} alt= {row.name}></img></td>}
            {this.props.wide&&<td colSpan="2">{row.name}</td>}
            {!this.props.wide&&<td colspan="3">{row.name}</td>}
            <td colSpan="3">
              <button className="AddressLink" onClick={()=>myNavFunc(row.longitude,row.latitude)}>
                {row.Address}
              </button></td>
            <td colSpan="3"><a href={row.post}>{row.name}</a></td></tr>))}
        </tbody>
      </table>
    </div>
  )
    }
}
export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      page:"home",
      prevPage:"",
      wide: window.innerWidth>criticalWidth
    };
  }
  updateDimensions() {
    if(window.innerWidth>criticalWidth && !this.state.wide){
      this.setState({wide:true});
    }else if(this.state.wide&& window.innerWidth<criticalWidth){
      this.setState({wide:false});
    }
  }
  componentDidMount(){
   this.updateDimensions();
   window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  goTo(newPage){
    this.setState({page:newPage,prevPage:this.state.page})
  }
  render() {
  return (
    <div className="App">
      <html>
      {(this.state.page === "home")&&
        <div>
          <div className="Title">Day Pass</div>
        <div className="welcome-message">
          <h1>Welcome!</h1>
          <p>Day Pass is your personal concierge showing some of our favorite locations in our city.
            Select "casino" or "restaurants" to start!</p>
          <button className="Button" onClick={()=>{this.goTo("Casino")}}>
            Casino
          </button>
          <button className="Button" onClick={()=>{this.goTo("Restaurants")}}>
            Restaurants
          </button>
          <button className="Button" onClick={()=>{this.goTo("Other")}}>
             Other  
          </button>
        </div>
        </div>}
      {(this.state.page !== "home")&&
        <div>
        <div className="Title">{this.state.page}</div></div>}
      {(this.state.page === "Casino")&&
        <div className="table-container">
          <button className="Back" onClick={()=> {this.setState({page:this.state.prevPage})}}>
            Back
          </button>
          <ShowTable wide={this.state.wide} rows={pages.Casino}/>
        </div>}
      {(this.state.page === "Restaurants")&&
        <div className="table-container">
          <button className="Back" onClick={()=> {this.setState({page:this.state.prevPage})}}>
            Back
          </button>
          <ShowTable wide={this.state.wide} rows={pages.Restaurants}/>
        </div>}
      {(this.state.page==="Other")&&
        <div className="table-container">
          <button className="Back" onClick={()=> {this.setState({page:this.state.prevPage})}}>
            Back
          </button>
          <ShowTable wide={this.state.wide} rows={pages.Other}/>
        </div>}
    </html></div>
  );
  }
}
