import React, { useState, useEffect } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import VideoContent from "../../Components/VideoContent/VideoContent";
import "../../scss/Video.scss";
import Pagination from "../../Components/Pagination/Pagination";
import ClipLoader from "react-spinners/ClipLoader";

const Videos = ({ videocontent = [] }) => {
  return (
    <div>
      {videocontent.map((video) => (
        <VideoContent name={video.name} link={video.link} url={video.url} />
      ))}
    </div>
  );
};

function Video() {
  const [state, setState] = useState({
    popularVideo: [],
    searchVideo: "",
    searchVideoContent: [],
    error: false,
    loading: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState();
  const handleChange = (e) => {
    e.preventDefault();
    setState(
      {
        ...state,
        loading: true,
        searchVideo: e.target.value,
      },
      console.log(state.searchValue)
    );
  };

  const makeVideoApiCalls = (pageNumber) => {
    fetch(
      `https://api.pexels.com/videos/search?page=${pageNumber}&query=${state.searchVideo}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization:
            "563492ad6f91700001000001c7eba5e5863544b6bfd3e47327fda5bc",
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json.videos);
        setState({
          ...state,
          searchVideoContent: json.videos,
          popularVideo: [],
          loading: false,
        });
        setPostPerPage(7);
      })
      .catch(() => {
        setState({
          ...state,
          error: true,
        });
      });
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = state.searchVideoContent.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const currentPosts = state.popularVideo.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const mainPage = (pageNumber) => {
    fetch(`https://api.pexels.com/videos/popular?page=${pageNumber}`, {
      method: "GET",
      headers: new Headers({
        Authorization:
          "563492ad6f91700001000001c7eba5e5863544b6bfd3e47327fda5bc",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setState({
          popularVideo: json.videos,
          searchVideoContent: [],
          error: false,
          loading: false,
        });
        setPostPerPage(5);
        console.log(json.videos);
      })

      .catch((error) => {
        setState({
          ...state,
          error: true,
        });
      });
  };
  useEffect(() => {
    mainPage();
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    setState({
      ...state,
      loading: true,
    });
    if (state.searchVideo) {
      makeVideoApiCalls();
    }
  };
  const handleTag = (e) => {
    setState({
      ...state,
      searchVideo: e.target.name,
    });
  };

  const paginate = (pageNumber) => {
    setState({
      ...state,
      loading: true,
    });
    makeVideoApiCalls(pageNumber);
  };
  const route = (pageNumber) => {
    setState({
      ...state,
      loading: true,
    });
    mainPage(pageNumber);
  };

  return (
    <div>
      <Topbar
        onClick={handleSearch}
        onClickTwo={handleTag}
        onChange={handleChange}
        placeholder="Search videos..."
        value={state.searchVideo}
      />
      {!state.error ? (
        state.loading === true ? (
          <div className="loader">
            <p>Fetching data...</p>
            <ClipLoader size={170} color={"#ffffff"} loading={state.loading} />
          </div>
        ) : state.popularVideo.length !== 0 ? (
          <div>
            <div className="video-content">
              {currentPosts.map((vid, index) => (
                <div key={index}>
                  <Videos
                    videocontent={[
                      {
                        name: (
                          <div>
                            <div>
                              <video width="400" height="240" controls>
                                <source
                                  src={vid.video_files[0].link}
                                  type={vid.video_files[0].file_type}
                                ></source>
                              </video>
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              ))}
            </div>
            <Pagination
              postPerPage={postsPerPage}
              totalPosts={state.popularVideo.length}
              paginate={route}
            />
          </div>
        ) : (
          <div>
            <p className="result">Search results for {state.searchVideo}...</p>
            <div className="video-content">
              {currentPost.map((video, index) => (
                <div key={index}>
                  <Videos
                    videocontent={[
                      {
                        name: (
                          <div>
                            <div>
                              <video width="400" height="240" controls>
                                <source
                                  src={video.video_files[0].link}
                                  type={video.video_files[0].file_type}
                                ></source>
                              </video>
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              ))}
            </div>
            <div>
              <Pagination
                postPerPage={postsPerPage}
                totalPosts={state.searchVideoContent.length}
                paginate={paginate}
              />
            </div>
          </div>
        )
      ) : (
        <div className="error">Something went wrong...</div>
      )}
    </div>
  );
}

export default Video;
