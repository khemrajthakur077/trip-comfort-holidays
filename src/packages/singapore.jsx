import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import { supabase } from '../supabaseClient'

const Singapore = () => {
  const [singaporePackages, setSingaporePackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSingaporeData = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .ilike('category', '%singapore%') 

      if (error) {
        console.error("Error fetching Singapore packages:", error)
      } else {
        setSingaporePackages(data)
      }
      setLoading(false)
    }

    fetchSingaporeData()
  }, [])

  if (loading) return <div className="text-center py-10 text-xl font-semibold text-purple-700">Singapore Tours Load ho rahe hain...</div>

  return (
    <div className="package-container flex flex-wrap gap-5 justify-center py-10">
      {singaporePackages.length > 0 ? (
        singaporePackages.map(pkg => (
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
        <p className="text-gray-500">Database mein Singapore ka koi package nahi mila.</p>
      )}
    </div>
  )
}

export default Singapore