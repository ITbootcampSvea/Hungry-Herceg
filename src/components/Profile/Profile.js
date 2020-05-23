import React, { useState, useEffect } from "react";
import { GetUser } from "../../services/api.service";
import { Polar } from "react-chartjs-2";
import { user, meals } from "../../data";
import NavBar from "../NavBar/NavBar";
import './Profile.css'
const Profile = ({ history }) => {
  const [userInfo, setUserInfo] = useState({});
  const [userHistory, setUserHistory] = useState({});
  //let meals = [];

  //povlacenje sa servera i setovanje podataka

  //   useEffect(() => {
  //     //GetUser().then((data) => {
  //       setUserInfo(data);
  //       setUserHistory(data.history);
  //       console.log(data);
  //     });
  //   });
  //userHistory.map();

  //povlacenje mealova po id-ju
  //uniq.map(el=> ovde ide url i povlacenje.then(res=>meal.push(res)))

  //priprema podataka za chart
  //priprema labela
  let labels = [];
  meals.map((el) => labels.push(el.name));
  // console.log(meals);

  //priprema podataka za povlacenje mealova sa servera
  //sortiranje niza historija (sta je korisnik jeo)
  let sorted = user.history.sort(function (a, b) {
    return a - b;
  });

  //izbacivanje duplikata
  let uniq = [...new Set(sorted)];

  //sabiranje kolicine za graficki prikaz
  var counts = {};
  sorted.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });

  return (
    <div className='wrapper'>
      <NavBar history={history} />
      <div className='activeProfile'>
        <div className='profileWrapper'>
        <div className='avatarCard'>
          <img className='userAvatar' src='/img/user.png' alt='avatar'/>
          <div></div>
        <div className='avatarInfoWrapp'>
          <div className='welcomeWrap'><label className='welLbl'>Welcome</label></div>
          <div className='welcomeWrapÙsername'><label className='userNmaeAvatarCardLbl'>{user.username}</label></div>
        </div>
        </div>
        <div className='chartWrapper'>
          <div className='polarDiv'>
          <Polar
            width={20}
            height={20}
            options={{ maintainAspectRatio: false }}
            data={{
              labels: labels,
              datasets: [
                {
                 
                  label: "# of Votes",
                  data: Object.values(counts),
                  backgroundColor: [
                    "rgb(153,58,52)",
                    "rgb(204,77,67)",
                    "#61892F",
                    "white",
                    "rgb(204,77,67)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],

                 
                  borderWidth: 1,
                },
              ],
            }}
          />
          </div>
        </div>
        </div>  
      </div>
    </div>
  );
};
export default Profile;
