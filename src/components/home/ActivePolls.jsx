import React from "react";
import { Link } from "react-router-dom";
import { appStorage } from "../../services/storage.service";
import { getAllPolls, deletePollById } from "../../services/api.service";
import axios from "axios";

class ActivePolls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: appStorage.getUser(),
      allPolls: [],
    };
  }

  componentDidMount() {
    this.setAllPolls();
  }

  setAllPolls = async () => {
    let allPolls = await getAllPolls();
    this.setState({ allPolls: allPolls.data.data });
  };


  endPoll = (pollId) => {
    //salje pobednicki restoran u niz ordera na backu
    //refreshuje home stranicu, kako bismo na njoj odmah videli novi order
  };

  render() {
    let allPolls = this.state.allPolls;
    let pollsRow = [];
    if (allPolls.length > 0) {
      allPolls.map((poll) => {
        if (poll.author === this.state.userName) {
          console.log(poll);
          pollsRow.push(
            <div className="active-info">
              <div>
                <label className="pollLblInfo">{poll.name}</label>
              </div>
              <div>
                <label className="pollLblInfo">{poll.author}</label>
              </div>
              <div>
                <label className="pollLblInfo">{poll.ends}</label>
              </div>
              <div className="btn-icons">
                <div>
                  <img
                    src="./img/del.png"
                    alt="icon"
                    title="Delete"
                    onClick={() => {
                      deletePollById(poll._id);
                      this.setAllPolls();
                    }}
                  />
                </div>
                <div>
                  <img src="./img/end1.png" alt="icon" title="End Poll" />
                </div>
                <div>
                  <Link to={`/vote/:${poll._id}`} className="voteBtnLink">
                    <img src="./img/vote1.png" alt="icon" title="Vote" />
                  </Link>
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
                <label className="pollLblInfo">{poll.ends}</label>
              </div>
              <div className="className='pollGuest'">
                <div>
                  <Link to={`/vote/:${poll._id}`} className="voteBtnLink">
                    <img
                      src="./img/vote1.png"
                      alt="icon"
                      title="Vote"
                      className="pollGuestIcon"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        }
      });
    } else {
      pollsRow = (
        <div className="active-info">
          <label>No Active Polls</label>
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
          <div className="pollRowsWrapp">{pollsRow}</div>
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
