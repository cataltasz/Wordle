import "./DiscoverPage.css";
import SearchBar from "./../generic/SearchBar/SearchBar";
import CardSlider from "./../generic/CardSlider/CardSlider";
import CategoryContainer from "./../generic/CategoryContainer/CategoryContainer";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./../generic/Loading";
import Error from "./../generic/error/Error";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";

let urlStart = "https://biozetapi.herokuapp.com/summary?";

const confBookData = (setter, response) => {
  setter(
    response.data.result.map((summary) => {
      return {
        name: summary.book.name,
        url: "/ozet/" + summary.summary_id,
        author: summary.book.author.name,
        img: summary.book.image_url
      };
    })
  );
};

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

let catUrl = "https://biozetapi.herokuapp.com/category?sort=category_id&asc";

export default function DiscoverPage() {
  const theme = useSelector((state) => state.theme.value);

  const [popData, setPopData] = useState(null);
  const [lastData, setLastData] = useState(null);
  const [catData, setCatData] = useState(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Bi'Özet: Keşfet";

    axios
      .get(urlStart + "sort=date&asc&count=10")
      .then((response) => {
        console.log(response);
        confBookData(setLastData, response);
      })
      .catch((ex) => {
        setError(true);
      });

    axios
      .get(urlStart + "sort=pop&asc&count=10")
      .then((response) => {
        confBookData(setPopData, response);
      })
      .catch((ex) => {
        setError(true);
      });

    axios
      .get(catUrl)
      .then((response) => {
        console.log("data", response.data);
        confCatData(setCatData, response);
      })
      .catch((ex) => {
        setError(true);
      });
  }, []);

  if (error)
    return (
      <Error
        title="Sayfa yüklenirken hata oldu!"
        desc="Bizden kaynaklı bir hata oldu, bir kapat aç düzelir. "
      />
    );
  if (popData === null || lastData === null || catData === null)
    return <Loading />;
  return (
    <div className={"DiscoverPage " + theme}>
      <SearchBar />
      <Fade>
        <CardSlider
          style={{ paddingTop: "60px" }}
          title="Popüler Kitaplar"
          cardInfos={popData}
        />
      </Fade>
      <Fade>
        <CardSlider title="Yeni Eklenen Kitaplar" cardInfos={lastData} />
      </Fade>
      <Fade>
        <h2>Kategoriler</h2>
        <CategoryContainer categories={catData} catClass="category-card" />
      </Fade>
    </div>
  );
}
