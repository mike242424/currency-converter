import { useEffect, useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [inputCurrency, setInputCurrency] = useState('USD');
  const [outputCurrency, setOutputCurrency] = useState('USD');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchConversion() {
        if (!amount) return;

        setIsLoading(true);

        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${inputCurrency}&to=${outputCurrency}`,
        );

        const data = await res.json();

        setOutput(data.rates[outputCurrency]);
        setIsLoading(false);
      }

      if (inputCurrency === outputCurrency) {
        setOutput(amount);
        return;
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
        disabled={isLoading}
      />
      <select
        value={inputCurrency}
        onChange={(e) => setInputCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={outputCurrency}
        onChange={(e) => setOutputCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{isLoading ? 'Loading' : `${output} ${outputCurrency}`}</p>
    </div>
  );
}

export default App;
