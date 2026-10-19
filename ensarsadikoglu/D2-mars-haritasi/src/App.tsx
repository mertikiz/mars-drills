import './App.css'

// Adım 1: Sadece boş harita alanı. OpenLayers haritası, Mars koordinat sistemi
// (proj4) tanımlandıktan sonra sonraki adımlarda buraya eklenecek.
function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>Mars Haritası (D2)</h1>
      </header>
      <div id="map" className="map-area">
        Harita burada olacak
      </div>
    </main>
  )
}

export default App
