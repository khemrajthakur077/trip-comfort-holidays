import './App.css'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import './index.css'
import { Routes,Route } from 'react-router-dom'
import Honeymoon from './packages/honeymoon'
import Family from "./packages/Family";
import Adventure from "./packages/Adventure";

import Himachal from "./packages/Himachal";
import Kashmir from "./packages/Kashmir";
import Kerala from "./packages/Kerala";
import Rajstan from "./packages/Rajstan";
import Sikkim from "./packages/Sikkim";
import Uttarakhand from "./packages/Uttarakhand";
import Spiti from "./packages/Spiti";
import LehLadakh from "./packages/LehLadakh";
import GoldenTriangle from "./packages/GoldenTriangle";

import Singapore from "./packages/Singapore";
import Dubai from "./packages/Dubai";



function App() {
 

  return (
    <>
    <Header/>
    <Routes>
       <Route path='/' element={<Home/>}/>
     
        <Route path="/family" element={<Family />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/honeymoon" element={<Honeymoon />} />

        {/* India Destinations */}
        <Route path="/himachal" element={<Himachal />} />
        <Route path="/kashmir" element={<Kashmir />} />
        <Route path="/kerala" element={<Kerala />} />
        <Route path="/rajstan" element={<Rajstan />} />
        <Route path="/sikkim" element={<Sikkim />} />
        <Route path="/uttarakhand" element={<Uttarakhand />} />
        <Route path="/spiti" element={<Spiti />} />
        <Route path="/lehLadakh" element={<LehLadakh />} />
        <Route path="/goldenTriangle" element={<GoldenTriangle />} />

        {/* International */}
        <Route path="/singapore" element={<Singapore />} />
        <Route path="/dubai" element={<Dubai />} />

      

    </Routes>
    <Footer/>
    </>
  )
}

export default App
