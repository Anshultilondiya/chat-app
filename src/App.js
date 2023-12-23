import "./styles/styles.scss";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { ChatPage } from "./pages/Chat";
import { Feedback } from "./pages/Feedback";

// The main App component
function App() {
  return (
    <div className="App">
      {/* Render the Navigation component at the top of the app */}
      <Navigation />

      {/* Define routes using the Routes component from React Router */}
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<ChatPage />} />

        {/* Route for the feedbacks page */}
        <Route path="/feedbacks" element={<Feedback />} />
      </Routes>
    </div>
  );
}

export default App;
