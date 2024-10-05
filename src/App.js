import { Outlet } from 'react-router-dom';


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
            <a href="/" className="List-group-item list-group-item-action">Home</a>
            <a href="/subjects" className="List-group-item list-group-item-action">Subjects</a>
            <a href="/add" className="List-group-item list-group-item-action">Add Documents</a>
            <a href="/moderate" className="List-group-item list-group-item-action">Moderate Documents</a>
            </div>
          </nav>
        </div>
        <div className="col-md-10">
            <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
