import './Loading.css';

const Loading = ({size}) => {
  if(size === "full") {
    return (
      <div className="container">
          <div className="d-flex vh-100 align-items-center justify-content-center">
              <div className="ht-loading spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
              </div> 
          </div>
      </div>    
    );
  } else {
    return (
      <div className="container">
          <div className="d-flex align-items-center justify-content-center">
              <div className="ht-loading spinner-border text-primary mt-4" role="status">
                  <span className="visually-hidden">Loading...</span>
              </div> 
          </div>
      </div>    
    );
  }
};

export default Loading;