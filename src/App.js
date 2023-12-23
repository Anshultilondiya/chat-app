import "./styles/styles.scss";
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation';
import { ChatPage } from "./pages/Chat";

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path='/' element={<ChatPage />} />
        <Route path='/feedbacks'></Route>
      </Routes>
    </div>
  );
}

export default App;
