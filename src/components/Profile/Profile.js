import React, { useState, useEffect } from "react";
import { GetUser } from "../../services/api.service";
import { Doughnut } from "react-chartjs-2";
import { user, meals } from "../../data";
const Profile = () => {
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
    <div>
      {/* dodati navbar\\ */}
      <div>
        {/* dodati avatar */}
        <p>
          {`Welcome,`} <b> {user.username}</b>
        </p>
      </div>
      <div>
        <Doughnut
          data={{
            labels: labels,
            datasets: [
              {
                label: "# of Votes",
                data: Object.values(counts),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
export default Profile;
