import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../Context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);

  const recordsPerPage = 10;

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
      setTotalRecord(allCoin.length);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
    setTotalRecord(coins.length);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
    setTotalRecord(allCoin.length);
  }, [allCoin]);

  //pagination

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const totalPage = Math.ceil(totalRecord / recordsPerPage);
  let number = [...Array(totalPage + 1).keys()].slice(1);

  const setPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const setCurrent = (id) => {
    setCurrentPage(id);
  };
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>

        <form onSubmit={searchHandler}>
          <input
            list="coinlist"
            type="text"
            onChange={inputHandler}
            value={input}
            placeholder="Search crypto..."
            required
          />
          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change %</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(firstIndex, lastIndex).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              {" "}
              <img src={item.image} alt="" />
              <p>{item.name + " " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol + "" + item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>

      <div className="page">
        <ul className="pagination">
          <li className="butt">
            <div onClick={setPrev}>prev</div>
          </li>

          {number.map((n, i) => (
            <li className="butt" key={i}>
              <div
                onClick={() => setCurrent(n)}
                className={setCurrentPage == n ? "active" : ""}
              >
                {n}
              </div>
            </li>
          ))}

          <li className="butt">
            <div onClick={setNext}>Next</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
