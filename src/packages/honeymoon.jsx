import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const Honeymoon = () => {
  const [honeymoonPackages, setHoneymoonPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHoneymoonData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        // Isse wo saare packages milenge jinme 'honeymoon' keyword hai
        .ilike('category', '%honeymoon%') 

      if (error) {
        console.error("Error fetching Honeymoon packages:", error)
      } else {
        setHoneymoonPackages(data)
      }
      setLoading(false)
    }

    fetchHoneymoonData()
  }, [])

  if (loading) return <div className="text-center py-10 text-xl font-medium text-pink-600">Honeymoon Specials Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {honeymoonPackages.length > 0 ? (
        honeymoonPackages.map(pkg => (
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
        <p className="text-gray-500">Filhal koi Honeymoon package nahi mila.</p>
      )}
    </div>
  )
}

export default Honeymoon