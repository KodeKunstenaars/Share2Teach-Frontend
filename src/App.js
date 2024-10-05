import Home from './components/Home'

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>
        <div className="col text-end">
          <a href="#!"><span className="badge bg-success">Login</span></a>
        </div>
        <hr className="mb-3"></hr>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
            <a href="#!" className="List-group-item list-group-item-action">Home</a>
              <a href="#!" className="List-group-item list-group-item-action">Mathematics</a>
              <a href="#!" className="List-group-item list-group-item-action">Business Studies</a>
              <a href="#!" className="List-group-item list-group-item-action">History</a>
              <a href="#!" className="List-group-item list-group-item-action">Geography</a>
              <a href="#!" className="List-group-item list-group-item-action">Natural Science</a>
              <a href="#!" className="List-group-item list-group-item-action">Life Science</a>
              <a href="#!" className="List-group-item list-group-item-action">English</a>
              <a href="#!" className="List-group-item list-group-item-action">Technology</a>
              <a href="#!" className="List-group-item list-group-item-action">Afrikaans</a>
              <a href="#!" className="List-group-item list-group-item-action">Life Skills</a>
              <a href="#!" className="List-group-item list-group-item-action">Computer Science</a>
              <a href="#!" className="List-group-item list-group-item-action">Other useful OER's</a>
            </div>
          </nav>
        </div>
        <div className="col-md-10">
            <Home />
        </div>
      </div>
    </div>
  );
}

export default App;
