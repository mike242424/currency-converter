import { useEffect, useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [inputCurrency, setInputCurrency] = useState('USD');
  const [outputCurrency, setOutputCurrency] = useState('USD');
  const [output, setOutput] = useState('');

  useEffect(
    function () {
      async function fetchConversion() {
        if (!amount) return;
        if (inputCurrency === outputCurrency) {
          setOutput(amount);
          return;
        }

        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${inputCurrency}&to=${outputCurrency}`,
        );

        const data = await res.json();

        setOutput(data.rates[outputCurrency]);
        // setOutput(data.rates);
      }

      fetchConversion();
    },
    [amount, inputCurrency, outputCurrency],
  );

  return (
    <div className="App">
      <input
        type="text"
        placeholder="amount"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <select
        value={inputCurrency}
        onChange={(e) => setInputCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={outputCurrency}
        onChange={(e) => setOutputCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {outputCurrency}
      </p>
    </div>
  );
}

export default App;
