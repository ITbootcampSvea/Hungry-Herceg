import React, { useState, useEffect } from "react";
import { getUserById } from "../../services/api.service";
import { appStorage } from "../../services/storage.service";
import { Polar } from "react-chartjs-2";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";


const Profile = ({ history }) => {
  const [userHistory, setUserHistory] = useState([]);

  const userId = appStorage.getUserId(); //dohvata id ulogovanog korisnika
  console.log(userId);

  const user123 = appStorage.getUser(); //dohvata username ulogovanog korisnika
  console.log(user123);

  //povlacenje sa servera i setovanje podataka za grafikon
  useEffect(() => {
    getUserById(userId).then((data) => {
      setUserHistory(data.data.data.history);
    });
    //eslint-disable-next-line
  }, []);
  
  

  //funkcija za sortiranje niza
  //sortira niz po imenu meal-a
  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const mealA = a.meal.name.toUpperCase();
    const mealB = b.meal.name.toUpperCase();

    let comparison = 0;
    if (mealA > mealB) {
      comparison = 1;
    } else if (mealA < mealB) {
      comparison = -1;
    }
    return comparison;
  }

  let sorted = userHistory.sort(compare); //dobijamo sortirane po imenu

  //izbacivanje duplikata
  const uniq = userHistory.filter((a, b) => {
    const _name = JSON.stringify(a.meal.name);
    return (
      b ===
      userHistory.findIndex((obj) => {
        return JSON.stringify(obj.meal.name) === _name;
      })
    );
  });
  //priprema labela
  let labels = [];
  uniq.map((el) => labels.push(el.meal.name)); //stavlja samo po jedan label i time zavrsavamo sa labelima

  //sabiranje kolicine za graficki prikaz
  //funkcija koja ponavlja label onoliko puta koliko ima quantitija
  function repeat(item, times) {
    let rslt = [];
    for (let i = 0; i < times; i++) {
      rslt.push(item);
    }
    return rslt;
  }
  let sortedMeals = sorted.map((el) => repeat(el.meal.name, el.quantity)); //vraca vise nizova sa ponovljenim labelima

  //funkcija koja spaja nizove u sortedMeals
  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
  }
  let oneSortedMeal = flatten(sortedMeals);

  //pravi objekat od meal niza da dobijemo broj ponavljanja
  var counts = {}; //ispisujemo Object.values u data za grafikon
  oneSortedMeal.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });

  return (
    <div className="wrapper">
      <NavBar history={history} />
      <div className="activeProfile">
        <div className="profileWrapper">
          <div className="avatarCard">
            <img className="userAvatar" src="/img/user.png" alt="avatar" />
            <div></div>
            <div className="avatarInfoWrapp">
              <div className="welcomeWrap">
                <label className="welLbl">Welcome</label>
              </div>
              <div className="welcomeWrapÙsername">
                <label className="userNmaeAvatarCardLbl">{user123}</label>
              </div>
            </div>
          </div>
          <div className="chartWrapper">
            <div className="polarDiv">
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
