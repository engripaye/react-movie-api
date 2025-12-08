import './App.css'

function App() {

  return (
      <>

        <Text display="hello boy" />
        <Text display="My name is "/>
  </>
  )
}

function Text({display}) {
  return (<div>
    <p>{display}</p>
  </div>
  );
}

export default App
