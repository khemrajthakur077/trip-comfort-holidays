import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient' // Aapka updated direct client

const Dubai = () => {
  const [dubaiPackages, setDubaiPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDubaiData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        // Kyunki aapne category mein "family, dubai" likha hai, isliye 'ilike' best hai
        .ilike('category', '%dubai%') 

      if (error) {
        console.error("Error fetching Dubai packages:", error)
      } else {
        setDubaiPackages(data)
      }
      setLoading(false)
    }

    fetchDubaiData()
  }, [])

  if (loading) return <div className="text-center py-10">Dubai Packages Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {dubaiPackages.length > 0 ? (
        dubaiPackages.map(pkg => (
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
        <p className="text-gray-500">No Dubai packages found in Database.</p>
      )}
    </div>
  )
}

export default Dubai