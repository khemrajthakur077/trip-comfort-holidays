import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const Adventure = () => {
  const [adventurePackages, setAdventurePackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdventureData = async () => {
      const { data, error } = await supabase
        .from('packages') // Table ka naam 'packages' hi hai
        .select('*')
        .ilike('category', '%adventure%') 

      if (error) {
        console.error("Error:", error)
      } else {
        setAdventurePackages(data)
      }
      setLoading(false)
    }
    fetchAdventureData()
  }, [])

  if (loading) return <div className="text-center py-10">Adventure Tours Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {adventurePackages.map(pkg => (
        <PackageCard
          key={pkg.id}
          id={pkg.id} 
          image={pkg.image_url} // Screenshot mein image_url column hoga
          title={pkg.title}
          duration={pkg.duration}
          from={pkg.from_location} // SQL ke hisaab se check karein
          to={pkg.to_location}
          hotel={pkg.hotel}
          meal={pkg.meal}
          oldPrice={pkg.old_price}
          price={pkg.price}
        />
      ))}
    </div>
  )
}

export default Adventure