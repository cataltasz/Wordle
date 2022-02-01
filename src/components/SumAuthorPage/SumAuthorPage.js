import "./SumAuthorPage.scss";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Card from "./../generic/Card/Card";
import CardSlider from "./../generic/CardSlider/CardSlider";

const books = [
  {
    name: "Olasılıksız",
    img: "https://i.dr.com.tr/cache/500x400-0/originals/0001828654001-1.jpg",
    url: "/ozet/1",
    author: "Adam Fawer",
  },
  {
    name: "Olasılıksız",
    img: "https://i.dr.com.tr/cache/500x400-0/originals/0001828654001-1.jpg",
    url: "/ozet/1",
    author: "Adam Fawer",
  },
  {
    name: "Olasılıksız",
    img: "https://i.dr.com.tr/cache/500x400-0/originals/0001828654001-1.jpg",
    url: "/ozet/1",
    author: "Adam Fawer",
  },
  {
    name: "Olasılıksız",
    img: "https://i.dr.com.tr/cache/500x400-0/originals/0001828654001-1.jpg",
    url: "/ozet/1",
    author: "Adam Fawer",
  },
  {
    name: "Olasılıksız",
    img: "https://i.dr.com.tr/cache/500x400-0/originals/0001828654001-1.jpg",
    url: "/ozet/1",
    author: "Adam Fawer",
  },
  {
    name: "Olasılıksız",
    img: "https://i.dr.com.tr/cache/500x400-0/originals/0001828654001-1.jpg",
    url: "/ozet/1",
    author: "Adam Fawer",
  },
  {
    name: "Olasılıksız",
    img: "https://i.dr.com.tr/cache/500x400-0/originals/0001828654001-1.jpg",
    url: "/ozet/1",
    author: "Adam Fawer",
  },
];

const quotes = [
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum",
];
const tags = ["Roman", "Bilim Kurgu", "Gerilim"];
const wikiAbout =
  "Amerikalı roman yazarı. İlk romanı Olasılıksız, on sekiz dile çevrilmiş ve &quot;en iyi ilk roman&quot; dalında 2006 International";

export default function SumAuthorPage({ match }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Bi'Özet: Özet yazarı ";
  }, []);

  return (
    <div className="AuthorPage">
      <header className="AuthorHeader">
        <div className="AuthorInfoTop">
          <div className="AuthorInfo">
            <h2>Adam Fawer</h2>
            <p>
              {tags.map((tag, i) => (
                <Tag key={i} tag={tag} />
              ))}
            </p>
          </div>

          <div className="AuthorPhoto">
            <img
              className="AuthorPhotoImg"
              src="https://img01.imgsinemalar.com/images/afis_buyuk/a/adam-fawer-1546333353.jpg"
              alt="cover"
            />
          </div>
        </div>

        <div className="WikiContainer">
          <div className="Wiki clickable-gray-box">
            <Link to="/ozet-yazar/yazar">
              <img
                className="WikiImg"
                src="https://upload.wikimedia.org/wikipedia/commons/d/de/Wikipedia_Logo_1.0.png"
                alt="cover"
              />{" "}
            </Link>

            <span>
              <b>Hakkında</b>
              <br />
              {wikiAbout}
            </span>
          </div>
        </div>
      </header>
      <CardSlider title="Yazarın Kitapları" cardInfos={books} />
      <div className="DetailContainer">
        <AuthorBookContainer books={books} />

        <div className="Box limited-width">
          <h4>Yazardan Alıntılar</h4>
          <ul className="LessonList">
            {quotes.map((quote) => (
              <Quote quote={quote} />
            ))}
          </ul>
        </div>

        <div className="Box limited-width">
          <h4>Bir Başkadır bu içerik </h4>
          keeeelmangee mage kaakoo kakao şugarke mage kakaoo
        </div>
      </div>
    </div>
  );
}

function Quote({ quote }) {
  return <li className="LessonItem">{quote}</li>;
}

function Tag({ tag }) {
  return (
    <Link to="/kategori/roman" className="clickable-green">
      {tag + " "}
    </Link>
  );
}

function AuthorBookContainer({ books }) {
  return (
    <div className="AuthorBookContainer Box limited-width">
      <h3>Yazarın Kitapları</h3>
      <div className="AuthorBooks">
        {books.map((book) => (
          <Card cardInfo={book} />
        ))}
      </div>
    </div>
  );
}

function AuthorBook({ book }) {
  return <Card cardInfo={book} />;
}
