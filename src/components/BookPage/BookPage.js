import "./BookPage.css";
import React, { useEffect, useState } from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import axios from "axios";

import BookHeader from "./BookHeader";
import Loading from "./../generic/Loading";
import Error from "./../generic/error/Error";
import { useSelector } from "react-redux";
import useProgress from "./../../hooks/useProgress";

export default function BookPage({ match }) {
  const theme = useSelector((state) => state.theme.value);

  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [scroll] = useProgress();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Bi'Özet: Özet yükleniyor... ";

    axios
      .get(
        process.env.REACT_APP_BIOZET_API +
          process.env.REACT_APP_SUMMARY_ENDPOINT +
          match.params.ozetId,
        { timeout: 5000 }
      )
      .then((response) => {
        console.log(response.data.result);
        setData(response.data.result);
        if (response.data.result.summary_id === null) setFailed(true);
        setLoading(false);
        document.title = response.data.result.book.name + " - Kitap Özeti";
      })
      .catch((ex) => {
        setError(true);
        console.log(ex);
      });
  }, [match.params.ozetId]);

  if (error)
    return (
      <Error
        title="Sayfa yüklenirken hata oldu!"
        desc="Bizden kaynaklı bir hata oldu, bir kapat aç düzelir. "
      />
    );
  if (loading) return <Loading />;
  if (failed) return <Failed />;
  return (
    <div className="BookPage">
      <div id="progressBarContainer">
        <div
          id="progressBar"
          style={{ transform: `scale(${scroll}, 1)`, opacity: `${scroll}` }}
        />
      </div>

      <BookHeader data={data} />

      <div className="BookContainer">
        <article className={"SummaryContainer " + theme}>
          <h3>Konu</h3>
          <div>{data.content.topic}</div>
        </article>

        {data.content.lessons &&
          data.content.lessons.map((lesson, i) => (
            <article className={"SummaryContainer " + theme} key={i}>
              <h3>{lesson.title}</h3>
              <div>{lesson.body}</div>
            </article>
          ))}
        {data.content.questions && (
          <div className={"SummaryContainer " + theme}>
            <h4>Sorular</h4>
            <ul className="LessonList">
              {data.content.questions.map((question, i) => (
                <li className="LessonItem" key={i}>
                  <p>
                    <BsFillQuestionCircleFill
                      style={{ color: "#ADFF45", margin: "0 5px" }}
                    />
                  </p>
                  <p>{question}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.content.structure && (
          <div
            className={"SummaryContainer " + theme}
            style={{ marginRight: 0, marginLeft: 0 }}
          >
            <h4>Yapı</h4>
            {data.content.structure}
          </div>
        )}

        {data.content.quotes && (
          <div
            className={"SummaryContainer  " + theme}
            style={{ marginRight: 0, marginLeft: 0 }}
          >
            <h4>Kitaptan Bir Alıntı</h4>
            {data.content.quotes[0]}
          </div>
        )}
      </div>
    </div>
  );
}

function Failed() {
  const style = {
    position: "absolute",
    width: "100vw",
    height: "calc(100vh - 50px)",
    top: "50px",
    left: 0,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  };
  return <div style={style}> Böyle bir kitap olduğunu hiç sanmıyorum. </div>;
}

/*

 <div className="BookPage">
      <div id="progressBarContainer">
        <div
          id="progressBar"
          style={{ transform: `scale(${scroll}, 1)`, opacity: `${scroll}` }}
        />
      </div>

      <BookHeader data={data} />

      <div className="BookContainer">
        <article className={"SummaryContainer Box " + theme}>
          <h3>Konu</h3>
          <div>{data.content.topic}</div>
        </article>

        {data.content.lessons &&
          data.content.lessons.map((lesson, i) => (
            <article className={"SummaryContainer Box " + theme} key={i}>
              <h3>{lesson.title}</h3>
              <div>{lesson.body}</div>
            </article>
          ))}

        <div className={"SummaryContainer Box " + theme}>
          <h4>Sorular</h4>
          <ul className="LessonList">
            {data.content.questions &&
              data.content.questions.map((question, i) => (
                <li className="LessonItem" key={i}>
                  <p>
                    <BsFillQuestionCircleFill
                      style={{ color: "#ADFF45", margin: "0 5px" }}
                    />
                  </p>
                  <p>{question}</p>
                </li>
              ))}
          </ul>
        </div>

        {data.content.structure && (
          <div
            className={"SummaryContainer Box " + theme}
            style={{ marginRight: 0, marginLeft: 0 }}
          >
            <h4>Yapı</h4>
            {data.content.structure}
          </div>
        )}

        {data.content.quotes && (
          <div
            className={"SummaryContainer Box " + theme}
            style={{ marginRight: 0, marginLeft: 0 }}
          >
            <h4>Kitaptan Bir Alıntı</h4>
            {data.content.quotes[0]}
          </div>
        )}
      </div>
    </div>

*/
