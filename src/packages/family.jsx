import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const Family = () => {
  const [familyPackages, setFamilyPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFamilyData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        // Isse woh saare packages milenge jinke category column mein 'family' word hai
        .ilike('category', '%family%') 

      if (error) {
        console.error("Error fetching family packages:", error)
      } else {
        setFamilyPackages(data)
      }
      setLoading(false)
    }

    fetchFamilyData()
  }, [])

  if (loading) return <div className="text-center py-10 font-bold text-xl">Family Packages Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {familyPackages.length > 0 ? (
        familyPackages.map(pkg => (
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
        <p className="text-gray-500">Filhal koi Family package nahi mila.</p>
      )}
    </div>
  )
}

export default Family