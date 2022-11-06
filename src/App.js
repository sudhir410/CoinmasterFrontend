import React, { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [fetdata, setfetdata] = useState([])
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  useEffect(() => {
    setInterval(() => {
      setToggle1(!toggle1)
    }, 5000)
    fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      method: "get",
      headers: {
        'X-CMC_PRO_API_KEY': 'a10af4ee-e65c-4abc-8fa8-af8c0c29c326',
      },
    }).then(res => res.json()).then(datas => {
      let arr = []
      datas.data.forEach(result => {

        arr.push({
          Name: result.name, Price: result.quote.USD.price, Percent_change_1H: result.quote.USD.percent_change_1h,
          Percent_change_7d: result.quote.USD.percent_change_7d, Percent_change_24h: result.quote.USD.percent_change_24h, Percent_change_30d: result.quote.USD.percent_change_30d,
          market_cap: result.quote.USD.market_cap, volume_24h: result.quote.USD.volume_24h, Total_supply: result.total_supply, Symbol: result.symbol

        })
      })
      setData(arr)

      fetch('http://localhost:8000/add', {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(arr)
      }).then(res => res.json()).then(data => console.log(data))

    })
  }, [toggle1])

  useEffect(() => {
    setInterval(() => {
      setToggle2(!toggle2)
    }, 8000)
    fetch('http://localhost:8000', {
      method: "get"
    }).then(res => res.json()).then(result => setfetdata(result))
  }, [toggle2])

  return (
    <div className="App">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Percent_change_1H</th>
            <th scope="col">Percent_change_7d</th>
            <th scope="col" >Percent_change_24h</th>
            <th scope="col" >Percent_change_30d</th>
            <th scope="col" >market_cap</th>
            <th scope="col" >volume_24h</th>
            <th scope="col" >Total_supply</th>

          </tr>
        </thead>
        <tbody>
          {
            fetdata.map((res, i) => (
              <tr key={i}>
                <th scope="row">{res.Name}</th>
                <td>{res.Price}</td>
                <td>{res.Percent_change_1H}</td>
                <td>{res.Percent_change_7d}</td>
                <td>{res.Percent_change_24h}</td>
                <td>{res.Percent_change_30d}</td>
                <td>{res.market_cap}</td>
                <td>{res.volume_24h}</td>
                <td>{res.Total_supply}</td>
                <td>{res.Symbol}</td>



              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
