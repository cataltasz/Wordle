import "./CategoriesPage.css";
import SearchBar from "./../generic/SearchBar/SearchBar";
import CategoryContainer from "./../generic/CategoryContainer/CategoryContainer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../generic/Loading";
let catUrl = "https://biozetapi.herokuapp.com/category?sort=category_id&asc";

const confCatData = (setter, response) => {
  setter(
    response.data.result.map((cat) => {
      return {
        key: cat.category_id,
        name: cat.name,
        url: "/kategori/" + cat.category_id
      };
    })
  );
};
export default function CategoriesPage() {
  const theme = useSelector((state) => state.theme.value);
  const [catData, setCatData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Bi'Özet: Kategoriler";

    axios.get(catUrl).then((response) => {
      console.log("data", response.data);
      confCatData(setCatData, response);
    });
  }, []);

  if (catData === null) return <Loading />;

  return (
    <div className={"CategoriesPage " + theme}>
      <SearchBar />
      <h2>Kategoriler</h2>
      <CategoryContainer
        categories={catData}
        catClass={"category-card cat-big"}
      />
    </div>
  );
}
