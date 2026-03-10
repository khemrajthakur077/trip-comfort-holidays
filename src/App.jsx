import './App.css'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import './index.css'
import { Routes,Route } from 'react-router-dom'
import Honeymoon from './packages/honeymoon'
import Family from "./packages/family";
import Adventure from "./packages/adventure";

import Himachal from "./packages/himachal";
import Kashmir from "./packages/kashmir";
import Kerala from "./packages/kerala";
import Rajstan from "./packages/rajstan";
import Sikkim from "./packages/sikkim";
import Uttarakhand from "./packages/uttarakhand";
import Spiti from "./packages/spiti";
import LehLadakh from "./packages/LehLadakh";
import GoldenTriangle from "./packages/GoldenTriangle";

import Singapore from "./packages/singapore";
import Dubai from "./packages/dubai";



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
