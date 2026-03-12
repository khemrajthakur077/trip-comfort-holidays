import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const GoldenTriangle = () => {
  const [goldenPackages, setGoldenPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGoldenData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        // Isse wo saare packages milenge jinme 'golden-triangle' word hai
        .ilike('category', '%golden-triangle%') 

      if (error) {
        console.error("Error fetching Golden Triangle packages:", error)
      } else {
        setGoldenPackages(data)
      }
      setLoading(false)
    }

    fetchGoldenData()
  }, [])

  if (loading) return <div className="text-center py-10 text-xl font-semibold text-gray-700">Golden Triangle Tours Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {goldenPackages.length > 0 ? (
        goldenPackages.map(pkg => (
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
        <p className="text-gray-500">Filhal koi Golden Triangle package nahi mila.</p>
      )}
    </div>
  )
}

export default GoldenTriangle