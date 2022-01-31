import "./AuthorPage.scss";
import React, { useEffect, useState } from "react";
import Card from "./../generic/Card/Card";
import CardSlider from "./../generic/CardSlider/CardSlider";
import AuthorHeader from "./AuthorHeader";
import axios from "axios";
import Loading from "./../generic/Loading";
import Error from "./../generic/error/Error";

const quotes = [
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum"
];

export default function AuthorPage({ match }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wiki, setWiki] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Bi'Özet: Yazar ";

    axios
      .get(
        process.env.REACT_APP_BIOZET_API +
          process.env.REACT_APP_AUTHOR_ENDPOINT +
          match.params.yazarId,
        { timeout: 5000 }
      )
      .then((response) => {
        console.log(response.data.result);
        setData(response.data.result);
        if (response.data.result.author_id === null)
          setError("No author found");
        setLoading(false);
        document.title = response.data.result.name + " - Bi'Özet";

        axios
          .get(
            "https://tr.wikipedia.org/w/rest.php/v1/search/page?q=Seth_Godin&limit=1",
            { timeout: 5000 }
          )
          .then((res) => {
            setWiki(res.data.pages[0].excerpt);
          })
          .catch((ex) => {
            console.log(ex);
          });
      })
      .catch((ex) => {
        setError(true);
        console.log(ex);
      });
  }, [match.params.yazarId]);

  if (error)
    return (
      <Error
        title="Sayfa yüklenirken hata oldu!"
        desc="Bizden kaynaklı bir hata oldu, bir kapat aç düzelir. "
      />
    );
  if (loading) return <Loading />;
  return (
    <div className="AuthorPage">
      <AuthorHeader data={data} wiki={wiki} />
      <CardSlider
        title="Yazarın Kitapları"
        cardInfos={data.books.map((book) => {
          return {
            name: book.name,
            img: book.image_url,
            url: "/ozet/" + book.summary_id
          };
        })}
      />
      <div className="DetailContainer">
        <AuthorBookContainer books={data.books} />

        <div className="Box limited-width">
          <h4>Yazardan Alıntılar</h4>
          <ul className="LessonList">
            {quotes.map((quote, i) => (
              <Quote quote={quote} key={i} />
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

function AuthorBookContainer({ books }) {
  return (
    <div className="AuthorBookContainer Box limited-width">
      <h3>Yazarın Kitapları</h3>
      <div className="AuthorBooks">
        {books.map((book, i) => (
          <Card
            cardInfo={{
              name: book.name,
              img: book.image_url,
              url: "/ozet/" + book.summary_id
            }}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
