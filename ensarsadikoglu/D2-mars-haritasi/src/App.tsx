import { useEffect, useState } from 'react'
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js'
import './App.css'

// Trek'in Mars (Viking MDIM21, 232m) katmanının capabilities dosyası (README'deki doğrulanmış kaynak).
const CAPABILITIES_URL =
  'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/WMTSCapabilities.xml'

// Capabilities nesnesinden sadece kullandığımız alanların tipi.
interface TileMatrix {
  Identifier: string
  ScaleDenominator: number
  TopLeftCorner: number[]
  TileWidth: number
  TileHeight: number
}
interface Capabilities {
  Contents: {
    Layer: Array<{
      Identifier: string
      Format: string[]
      BoundingBox: Array<{ crs: string; extent: number[] }>
      Style: Array<{ Identifier: string }>
      TileMatrixSetLink: Array<{ TileMatrixSet: string }>
      ResourceURL: Array<{ template: string }>
    }>
    TileMatrixSet: Array<{
      Identifier: string
      SupportedCRS: string
      TileMatrix: TileMatrix[]
    }>
  }
}

// Adım 2: Capabilities dosyasını okuyup içindeki bilgileri ekranda göster ve
// tek bir karoyu çekerek tarayıcıdan erişimi (CORS) dene. Harita sonraki adımlarda eklenecek.
async function inspectCapabilities(): Promise<string> {
  const response = await fetch(CAPABILITIES_URL)
  if (!response.ok) {
    throw new Error(`Capabilities alınamadı: HTTP ${response.status}`)
  }
  const xml = await response.text()
  const caps = new WMTSCapabilities().read(xml) as Capabilities

  const layer = caps.Contents.Layer[0]
  const setId = layer.TileMatrixSetLink[0].TileMatrixSet
  const matrixSet = caps.Contents.TileMatrixSet.find((s) => s.Identifier === setId)
  if (!matrixSet) {
    throw new Error(`TileMatrixSet bulunamadı: ${setId}`)
  }

  // Karo adresi, dosyadaki şablondan 0/0/0 karosu için doldurulur.
  const style = layer.Style[0].Identifier
  const tileUrl = layer.ResourceURL[0].template
    .replace('{Style}', style)
    .replace('{TileMatrixSet}', setId)
    .replace('{TileMatrix}', '0')
    .replace('{TileRow}', '0')
    .replace('{TileCol}', '0')

  let tileResult: string
  try {
    const tile = await fetch(tileUrl)
    const blob = await tile.blob()
    tileResult = `HTTP ${tile.status}, ${blob.type}, ${blob.size} bayt`
  } catch (error) {
    tileResult = `HATA (CORS olabilir): ${String(error)}`
  }

  const levels = matrixSet.TileMatrix
  const first = levels[0]
  const last = levels[levels.length - 1]

  // OpenLayers ayrıştırıcısı ızgara boyutunu (MatrixWidth/MatrixHeight) döndürmediği için
  // bu iki değeri ham XML'den okuyoruz.
  const xmlDoc = new DOMParser().parseFromString(xml, 'application/xml')
  const widths = xmlDoc.getElementsByTagName('MatrixWidth')
  const heights = xmlDoc.getElementsByTagName('MatrixHeight')
  const gridOf = (index: number) =>
    `${widths[index]?.textContent ?? '?'}x${heights[index]?.textContent ?? '?'}`

  return [
    `Katman: ${layer.Identifier}`,
    `Format: ${layer.Format.join(', ')}`,
    `Stil: ${style}`,
    `Sınırlar (${layer.BoundingBox[0].crs}): ${layer.BoundingBox[0].extent.join(', ')}`,
    `TileMatrixSet: ${matrixSet.Identifier}`,
    `CRS (SupportedCRS): ${matrixSet.SupportedCRS}`,
    `Seviye sayısı: ${levels.length} (${first.Identifier}..${last.Identifier})`,
    `Karo boyutu: ${first.TileWidth}x${first.TileHeight}`,
    `Sol üst köşe: ${first.TopLeftCorner.join(', ')}`,
    `Seviye ${first.Identifier} ızgara: ${gridOf(0)}`,
    `Seviye ${last.Identifier} ızgara: ${gridOf(levels.length - 1)}`,
    `Karo şablonu: ${layer.ResourceURL[0].template}`,
    `Örnek karo (0/0/0): ${tileUrl}`,
    `Örnek karo sonucu: ${tileResult}`,
  ].join('\n')
}

function App() {
  const [report, setReport] = useState('Capabilities okunuyor...')

  useEffect(() => {
    let cancelled = false
    inspectCapabilities()
      .then((text) => {
        if (!cancelled) setReport(text)
      })
      .catch((error) => {
        if (!cancelled) setReport(`HATA: ${String(error)}`)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="app">
      <header className="app-header">
        <h1>Mars Haritası (D2)</h1>
      </header>
      <div id="map" className="map-area">
        <pre id="report">{report}</pre>
      </div>
    </main>
  )
}

export default App
