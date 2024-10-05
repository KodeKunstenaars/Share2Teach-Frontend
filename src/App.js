import { Link, Outlet } from 'react-router-dom';


function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>
        <div className="col text-end">
          <Link to="/authenticate"><span className="badge bg-success">Login</span></Link>
        </div>
        <hr className="mb-3"></hr>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
            <Link to ="/" className="List-group-item list-group-item-action">Home</Link>
            <Link to ="/subjects" className="List-group-item list-group-item-action">Subjects</Link>
            <Link to ="/upload-document" className="List-group-item list-group-item-action">Add Documents</Link>
            <Link to ="/moderate-document" className="List-group-item list-group-item-action">Moderate Documents</Link>
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
