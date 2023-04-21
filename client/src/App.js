import "@mui/material";
import "react-icons";
import "react-icons/bi";
import "react-icons/md";
import "react-icons/bs";
import "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  useSearchParams,
} from "react-router-dom";
import theme from "./theme";

import ProfileView from "./components/views/ProfileView";
import SignupView from "./components/views/SignupView";
import ExploreView from "./components/views/ExploreView";
import SearchView from "./components/views/SearchView";
import MessengerView from "./components/views/MessengerView";
import QuestionView from "./components/views/QuestionView";
import { initiateSocketConnection, socket } from "./helpers/socketHelper";
import { isLoggedIn } from "./helpers/authHelper";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BASE_URL } from "./config";
import { io } from "socket.io-client";

function App() {
  initiateSocketConnection();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<ExploreView />} />
          <Route path="/questions/:id" element={<QuestionView/>}/>
              
          
          <Route
            path="/messenger"
            element={isLoggedIn() ?<MessengerView />:<Navigate to="/signup" />
            }
          />
          <Route path="/search" element={<SearchView />} />
          <Route path="/users/:id" element={<ProfileView />} />
          
          <Route path="/signup" element={<SignupView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
