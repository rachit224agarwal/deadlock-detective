function App() {
  
  const checkDeadlock = async () => {
    
    const graph = {
      P1 : ["R1"],
      R1 : ["P2"],
      P2 : ["R2"],
      R2 : ["P1"]
    };

    const result = await fetch('http://localhost:8080/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({graph})
    });

    const data = await result.json();
    console.log(data);

  }

  return (
    <>
    <div>
       <h1 className="text-3xl font-bold underline">Deadlock Detection</h1>
       <button className="bg-slate-500 rounded-lg p-3" onClick={checkDeadlock}>Check Deadlock</button>
    </div>
    </>
  )
}

export default App
