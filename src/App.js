import "./styles.scss";
import Navbar from "./components/Navbar/Navbar";
import BookPage from "./components/BookPage/BookPage";
import Footer from "./components/Footer/Footer";
import AuthorPage from "./components/AuthorPage/AuthorPage";
import SumAuthorPage from "./components/SumAuthorPage/SumAuthorPage";
import HomePage from "./components/HomePage/HomePage";
import SignPage from "./components/SignPage/SignPage";
import DiscoverPage from "./components/DiscoverPage/DiscoverPage";
import TagPage from "./components/TagPage/TagPage";
import CategoriesPage from "./components/CategoriesPage/CategoriesPage";
import UserProfilePage from "./components/UserProfilePage/UserProfilePage";
import { useSelector } from "react-redux";
import AddPage from "./OzetEkleme/AddPage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export default function App() {
  const theme = useSelector((state) => state.theme.value);
  const auth = useSelector((state) => state.auth.value);

  return (
    <Router>
      <div className={"App " + theme}>
        <Navbar />

        <main className={"MainContainer " + theme}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/kesfet">
              <DiscoverPage />
            </Route>
            <Route path="/kategoriler">
              <CategoriesPage />
            </Route>
            <Route path="/hakkimizda">hakkimizda</Route>
            <Route path="/giris">
              <SignPage />
            </Route>
            <Route path="/ozet-ekle">
              <AddPage />
            </Route>

            {auth && (
              <Route path="/profil">
                <UserProfilePage />
              </Route>
            )}

            <Route path="/ozet/:ozetId" component={BookPage} />
            <Route path="/kategori/:tagName" component={TagPage} />
            <Route path="/yazar/:yazarId" component={AuthorPage} />
            <Route path="/ozet-yazar/:yazarId" component={SumAuthorPage} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
