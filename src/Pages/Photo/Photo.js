import React, { useState, useEffect } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Button from "../../Components/Button/Button";
import { createClient } from "pexels";
import PhotoContent from "../../Components/PhotoContent/PhotoContent";
import "../../scss/Photo.scss";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "../../Components/Pagination/Pagination";

const Images = ({ images = [] }) => {
  return (
    <div>
      {images.map((photoimage) => (
        <PhotoContent
          image={photoimage.image}
          name={photoimage.name}
          url={photoimage.url}
        />
      ))}
    </div>
  );
};

function Photo() {
  const [state, setState] = useState({
    curated: [],
    searchValue: "",
    searchContent: [],
    loading: true,
    error: false,
    page: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const handleChange = (e) => {
    e.preventDefault();
    setState(
      {
        ...state,
        searchValue: e.target.value,
      },
      console.log(state.searchValue)
    );
  };
  const handleTag = (e) => {
    setState({
      ...state,
      searchValue: e.target.name,
    });
  };
  const makeApiCalls = (pageNumber) => {
    fetch(
      `https://api.pexels.com/v1/search?page=${pageNumber}&query=${state.searchValue}`,
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
        console.log(json.total_results);
        console.log(json.photos);
        console.log("page", json.per_page);
        setState({
          ...state,
          searchContent: json.photos,
          curated: [],
          loading: false,
        });
        setPostsPerPage(5);
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
  const currentPosts = state.searchContent.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  useEffect(() => {
    fetch(`https://api.pexels.com/v1/curated?page=${state.page}per_page=10`, {
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
        console.log(json.photos);
        setState({
          ...state,
          curated: json.photos,
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          error: true,
        });
      });
  }, []);
  console.log(state.curated);
  const handleSearch = (e) => {
    e.preventDefault();
    setState({
      ...state,
      loading: true,
    });
    if (state.searchValue) {
      makeApiCalls();
    }
  };

  // const paginate = (pageNumber) => {
  //   makeApiCalls(pageNumber);
  // };
  const handleNext = () => {
    setState({
      ...state,
      loading: true,
    });
    fetch(
      `https://api.pexels.com/v1/curated/?page=${state.page}&per_page=15max_duration=1`,
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
        console.log(json.photos);
        setState({
          ...state,
          curated: json.photos,
          loading: false,
          page: state.page + 1,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          error: true,
        });
      });
  };
  const handlePrevious = () => {
    setState({
      ...state,
      loading: true,
    });
    fetch(`https://api.pexels.com/v1/curated/?page=${state.page}&per_page=15`, {
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
        console.log(json.photos);
        setState({
          ...state,
          curated: json.photos,
          loading: false,
          page: state.page - 1,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          error: true,
        });
      });
  };

  const paginate = (pageNumber) => {
    setState({
      ...state,
      loading: true,
    });
    makeApiCalls(pageNumber);
  };
  return (
    <div>
      <Topbar
        placeholder="Search images..."
        onChange={handleChange}
        onClick={handleSearch}
        onClickTwo={handleTag}
        value={state.searchValue}
      />

      {!state.error ? (
        state.loading === true ? (
          <div className="loader">
            <p>Fetching data...</p>
            <ClipLoader size={170} color={"#ffffff"} loading={state.loading} />
          </div>
        ) : state.curated.length !== 0 ? (
          <div className="content">
            {state.curated.map((photo, index) => (
              <div key={index}>
                <Images
                  images={[
                    {
                      image: <img src={photo.src.large} alt="image" />,
                    },
                  ]}
                />
              </div>
            ))}
            <br />
          </div>
        ) : (
          <div>
            <p className="result">Search result for {state.searchValue}...</p>
            <div className="content">
              {currentPosts.map((info, index) => (
                <div key={index}>
                  <Images
                    images={[
                      {
                        image: <img src={info.src.large} alt="image" />,
                      },
                    ]}
                  />
                </div>
              ))}
            </div>
            <Pagination
              postPerPage={postsPerPage}
              totalPosts={state.searchContent.length}
              paginate={paginate}
            />
          </div>
        )
      ) : (
        <div className="error">Something went wrong...</div>
      )}

      {state.loading ? null : (
        <div>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Photo;
