import React from "react";
import { Link } from "react-router-dom";
import { appStorage } from "../../services/storage.service";
import {
  getAllPolls,
  deletePollById,
  endPollById,
} from "../../services/api.service";

class ActivePolls extends React.Component {
  constructor(props) {
    super(props);
    this.countdown = null;
    this.isSubscribed = true;
    this.state = {
      userName: appStorage.getUser(),
      userId: appStorage.getUserId(),
      allPolls: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.isSubscribed = true;
    this.setAllPolls();
    this.countdown = window.setInterval(() => this.setAllPolls(), 15000);
  }

  componentWillUnmount() {
    this.isSubscribed = false;
    window.clearInterval(this.countdown);
  }

  setAllPolls = () => {
    getAllPolls()
      .then((res) => {
        if(this.isSubscribed){
          this.setState({ allPolls: res.data.data, loading: false });
        }
      })
      .catch((err) => {if(this.isSubscribed){window.alert("Error occurred" + err)}});
  };

  render() {
    let allActivePolls = this.state.allPolls.filter((el) => el.status);
    let pollsRow = [];

    if (allActivePolls.length > 0) {
      allActivePolls.forEach((poll) => {
        let restaurants = poll.restaurants;
        let userVoted =
          restaurants.filter((restaurant) => {
            return restaurant.votes.includes(this.state.userId);
          }).length > 0;

        let isoDateTime = new Date(poll.ends);
        let localDateTime =
          isoDateTime.toLocaleDateString() +
          " " +
          isoDateTime.toLocaleTimeString();
        if (poll.author === this.state.userName) {
          pollsRow.push(
            <div className="active-info">
              <div>
                <label className="pollLblInfo">{poll.name}</label>
              </div>
              <div>
                <label className="pollLblInfo">{poll.author}</label>
              </div>
              <div>
                <div>
                  <label className="pollLblInfo">{`${localDateTime}`}</label>
                </div>
              </div>
              <div className="btn-icons">
                <div>
                  <img
                    src="./img/del.png"
                    alt="icon"
                    title="Delete"
                    onClick={() => {
                      deletePollById(poll._id).then((res) => {
                        if (res.data.message === "Success") {
                          this.setAllPolls();
                        }
                      });
                    }}
                  />
                </div>
                <div>
                  <img
                    src="./img/end1.png"
                    alt="icon"
                    title="End Poll"
                    onClick={() =>
                      endPollById(poll._id).then((res) => {
                        if (res.data.message === "Success") {
                          this.setAllPolls();
                        }
                      })
                    }
                  />
                </div>
                <div>
                  {userVoted ? (
                  <img className='userUnvoteBtn'  src='/img/noVote.png' alt=' no vote' title='You can not vote twice !' />
                  ) : (
                    <Link to={`/vote/${poll._id}`} className="voteBtnLink">
                      <img src="./img/vote1.png" alt="icon" title="Vote" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        } else {
          pollsRow.push(
            <div className="active-info">
              <div>
                <label className="pollLblInfo">{poll.name}</label>
              </div>
              <div>
                <label className="pollLblInfo">{poll.author}</label>
              </div>
              <div>
                <label className="pollLblInfo">{`${localDateTime}`}</label>
              </div>
              <div className="className='pollGuest'">
                <div>
                  {userVoted ? (
                   <img className='userUnvoteBtn'  src='/img/noVote.png' alt=' no vote' title='You can not vote twice !' />
                  ) : (
                    <Link to={`/vote/${poll._id}`} className="voteBtnLink">
                      <img
                        src="./img/vote1.png"
                        alt="icon"
                        title="Vote"
                        className="pollGuestIcon"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        }
      });
    } else {
      pollsRow = (
        <div className="noActiveInfo">
          <div>
            <label className="pollLblNoInfo">
              {this.state.loading ? "Loading..." : "No Active Polls"}
            </label>
          </div>
        </div>
      );
    }

    return (
      <div className="active-polls">
        <div className="poll-order-card">
          <img
            className="pollCardicon"
            src="./img/pollcard4.png"
            alt="pollicon"
          />
          <div className="card-heading">
            <h1>Active Polls</h1>
          </div>

          <div className="active-info header">
            <div>
              <label>Name</label>
            </div>
            <div>
              <label>Author</label>
            </div>
            <div>
              <label>Ends</label>
            </div>
            <div>
              <label>Action</label>
            </div>
          </div>
          <div id="style-4" className="pollRowsWrapp">
            {pollsRow}
          </div>
          <div className="card-btn-wrapper">
            <button className="btn-green">
              <Link to={"/createpoll"} className="creBtnLink">
                Create New Poll
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivePolls;
