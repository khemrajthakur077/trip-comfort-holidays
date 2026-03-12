import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const Spiti = () => {
  const [spitiPackages, setSpitiPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSpitiData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .ilike('category', '%spiti%') 

      if (error) {
        console.error("Error fetching Spiti packages:", error)
      } else {
        setSpitiPackages(data)
      }
      setLoading(false)
    }

    fetchSpitiData()
  }, [])

  if (loading) return <div className="text-center py-10 text-xl font-bold text-cyan-700">Spiti Valley Tours Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {spitiPackages.length > 0 ? (
        spitiPackages.map(pkg => (
          <PackageCard
            key={pkg.id}
            id={pkg.id} 
            image={pkg.image_url} 
            title={pkg.title}
            duration={pkg.duration}
            from={pkg.from_location} 
            to={pkg.to_location}
            hotel={pkg.hotel}
            meal={pkg.meal}
            oldPrice={pkg.old_price}
            price={pkg.price}
          />
        ))
      ) : (
        <p className="text-gray-500">Database mein Spiti ka koi package nahi mila.</p>
      )}
    </div>
  )
}

export default Spiti