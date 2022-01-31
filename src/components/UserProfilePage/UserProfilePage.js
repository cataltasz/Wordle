import "./UserProfilePage.scss";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import React, { useEffect } from "react";
import { BiUserCircle, BiBookmarkHeart } from "react-icons/bi";
import { useSelector } from "react-redux";

const profileOptions = [
  {
    text: "Kullanıcı Bilgileri",
    url: "profil/kullanici-bilgileri",
    icon: <BiUserCircle className="OptionIcon" />
  },
  {
    text: "Favori Özetler",
    url: "profil/favoriler",
    icon: <BiBookmarkHeart className="OptionIcon" />
  },
  {
    text: "Kullanıcı Bilgileri",
    url: "profil/kullanici-bilgileri",
    icon: <BiUserCircle className="OptionIcon" />
  }
];

export default function UserProfilePage() {
  const theme = useSelector((state) => state.theme.value);
  let path = useRouteMatch().path;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Bi'Özet: Yazar ";
  }, []);

  return (
    <div className="UserProfilePage">
      <div className={"ProfileInfo " + theme}></div>
      <Switch>
        <Route exact path={path}>
          <div className="ProfileOptions">
            {profileOptions.map((option) => (
              <Link to={option.url}>
                <div className={"ProfileOption " + theme}>
                  <span>{option.icon}</span>
                  <span className="OptionText">{option.text}</span>
                </div>
              </Link>
            ))}
          </div>
        </Route>

        <Route path={`${path}/kullanici-bilgileri`}>
          <div className="UserProfilePage"> kullanici </div>
        </Route>

        <Route path={`${path}/favoriler`}>
          <div className="UserProfilePage"> fav </div>
        </Route>

        <Route render={() => <Redirect to={`${path}`} />} />
      </Switch>
    </div>
  );
}
