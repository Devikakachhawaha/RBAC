import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Permissions from "./pages/Permissions";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen ">
        <div className="flex-grow">
          <Header />
          <main className="p-4">
            <Routes>
              <Route path="/users" element={<Users />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/permissions" element={<Permissions />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
