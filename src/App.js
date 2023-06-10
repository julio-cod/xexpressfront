import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router} from "react-router-dom";
import PrincipalPage from './pages/principalPage/PrincipalPage'

function App() {
  return (
    <Router>
      <PrincipalPage />
    </Router>
  );
}

export default App;
