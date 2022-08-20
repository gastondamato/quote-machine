import "./styles.css";
import { useState, useEffect } from "react";
import { FaTwitterSquare } from "react-icons/fa";

const Loading = () => {
  return <div>LOADING</div>;
};

const Quote = ({ quote, author }) => {
  return (
    <div>
      <div id="text">
        <h2>{quote}</h2>
      </div>
      <div id="author">-{author}</div>
    </div>
  );
};

const Twitter = ({ quote, author }) => {
  let twitter = encodeURI(
    "?hashtags=quotes&related=freeCodeCamp&text="
      .concat(quote)
      .concat(" ")
      .concat(author)
  );
  return (
    <a
      id="tweet-quote"
      href={"https://www.twitter.com/intent/tweet".concat(twitter)}
      target="_blank"
      rel="noreferrer"
    >
      <FaTwitterSquare />
    </a>
  );
};

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [len, setLen] = useState(0);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [selector, setSelector] = useState(1);

  const getNewQuote = () => {
    setLen(data.quotes.length);
    setSelector(randomQuote(len));
    setQuote(data.quotes[selector].quote);
    setAuthor(data.quotes[selector].author);
  };

  const randomQuote = (amount) => {
    return Math.floor(Math.random() * amount);
  };

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (jdata) {
        setData(jdata);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    try {
      getNewQuote();
    } catch (err) {
      console.log(err);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <div id="quote-box">
        <Quote quote={quote} author={author} />
        <Twitter quote={quote} author={author} />
        <button id="new-quote" onClick={getNewQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
}
